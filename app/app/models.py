from app import db
from app import login
from datetime import datetime
import bcrypt
import hashlib
import base64
from flask_login import UserMixin
from time import time
import jwt
from app import app
import os
from Crypto.Cipher import AES
from tools import bytes_to_b64_str, b64_str_to_bytes
from tools import hex_str_to_bytes, bytes_to_hex_str
from tools import encrypt, decrypt

# Encryption is AES 256 using EAX mode which allows for stream encoding.
# Stream encoding means encoded output length will be proportional to plain
# text length. Therefore, for encrypting emails, pad emails to hide their
# length.
#
# Encryption uses a nonce (once only number) so when checking if an email
# exists in a database, cannot encrypt the email to check and compare it to
# existing encrypted emails - as all have different nonce values.
#
# Therefore, email hash (for quick lookup) and encrypted email is used.
#
# Size of Encrypted Email storage in database:
#   - Emails may have 64 + 1 + 255 characters = 320 characters
#   - Therefore, emails are padded to 320 characters
#   - Encrypted bytes includes encryped email (320 bytes) + tag (16 bytes)
#     + nonce (16 bytes) = 352 bytes
#   - Encoding in Base64: 352 * 8 bits / 6 bits = 469.333 b64 characters
#     - 352 bytes = 2816 bits
#     - 469 b64 chars = 2814 bits, so need 470 b64 chars to cover 352 bytes.
#     - But then it won't split evenly into 8 bits, so need another 2 b64 chars
#     - Therefore total is 472 b64 chars
#   - This is then stored in the database as utf-8, which will be a full 472
#     bytes

# Size of hash: bcrypt output will always be 60 b64 chars.

# Username size will be limited to 32 characters


def prep_password(password):
        return base64.b64encode(
            hashlib.sha512(password.encode('utf-8')).digest())


def bytes_to_str(bytes_to_convert):
    # return base64.b64encode(bytes_to_convert).decode('ascii')
    return base64.b64encode(bytes_to_convert).decode('utf-8')


def str_to_bytes(str_to_convert):
    # return base64.b64decode(b64_ascii.encode('ascii'))
    return base64.b64decode(str_to_convert.encode('utf-8'))


def hex_str_to_bytes(hex_str):
    byte_array = []
    for i in range(0, len(hex_str), 2):
        byte_array.append(int(hex_str[i:i + 2], 16))
    return bytes(byte_array)


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True, unique=True)
    encrypted_email = db.Column(db.String(472))
    email_hash = db.Column(db.String(60))
    password_hash = db.Column(db.String(60))
    signed_up_on = db.Column(db.DateTime)
    confirmed = db.Column(db.Boolean, default=False)
    confirmed_on = db.Column(db.DateTime)
    ratings = db.relationship('Rating', backref='user', lazy='dynamic')
    last_login = db.Column(db.DateTime)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_email(self, email):
        self.encrypted_email = self.encrypt_email(email)
        self.email_hash = self.hash_email(email)

    def get_email(self):
        return self.decrypt_email(self.encrypted_email)

    @staticmethod
    def hash_email(email):
        pepper_string = os.environ.get('PEPPER') or b'$2b$10$BnJqVgOFqLemn6hfp6CAPO'.decode('cp437')
        pepper = pepper_string.encode('cp437')
        return bcrypt.hashpw(prep_password(email), pepper).decode('utf-8')

    def get_key(self):
        key_hex_string = os.environ.get('AES_KEY') or 'c0f04ab9d3b1939589072cd6ca0bf40539d8bf0a8b823adb09ccc855eee48b40'
        byte_array=[]
        for i in range(0, len(key_hex_string), 2):
            byte_array.append( int (key_hex_string[i:i+2], 16 ) )

        key = bytes(byte_array)
        return key

    def encrypt_email(self, email):
        # key_string = os.environ.get('AES_KEY') or 'c0f04ab9d3b1939589072cd6ca0bf40539d8bf0a8b823adb09ccc855eee48b40'
        key = self.get_key()

        cipher = AES.new(key, AES.MODE_EAX)
        nonce = cipher.nonce
        ciphertext, tag = cipher.encrypt_and_digest(email.encode('utf-8'))
        encypted_email = tag + nonce + ciphertext
        # pdb.set_trace()
        return encypted_email
        # return 'encrypted_email'

    def decrypt_email(self, encrypted_email):
        # pdb.get_trace()
        tag = encrypted_email[0:16]
        nonce = encrypted_email[16:32]
        ciphertext = encrypted_email[32:]

        # key_string = os.environ.get('AES_KEY') or b'2P\xe9\xad\xa5m3\xa8\x8b\xc2\xd9\x0c\xf8\x8ba\xfa\x13\xbf^h\xa8\xe5\xa8\x1f\xc6\xfe\xeb\x8d\x8eM\xbf\x12'
        # key = key_string.encode('cp437')
        key = self.get_key()

        cipher = AES.new(key, AES.MODE_EAX, nonce=nonce)
        email = cipher.decrypt(ciphertext).decode('utf-8')
        return email
        # return 'airladon@gmail.com'

    # See https://github.com/pyca/bcrypt/ for more information on bcrypt
    # and recommendation for pre-hashing password to make it a consistent
    # length.
    # See https://blogs.dropbox.com/
    #   tech/2016/09/how-dropbox-securely-stores-your-passwords/
    # for their recommendation on how to store passwords
    # See https://www.compose.com/articles/
    #   you-may-get-pwned-at-least-protect-passwords-with-bcrypt/
    # for explanation on bcrypt hash and how it also stores the salt
    def set_password(self, password):
        a = bcrypt.hashpw(
            prep_password(password),
            bcrypt.gensalt(10))
        self.password_hash = a.decode('utf-8')

    def check_password(self, password):
        password_hash = self.password_hash.encode('utf-8')
        # pdb.set_trace()
        # if password_hash.startswith('\\x'):
        #     password_hash = bytearray.fromhex(password_hash[2:]).decode()
        return bcrypt.checkpw(
            prep_password(password),
            password_hash)

    # def prep_password(self, password):
    #     return base64.b64encode(
    #         hashlib.sha512(password.encode('utf-8')).digest())

    def get_reset_password_token(self, expires_in=1800):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except Exception:
            return
        return Users.query.get(id)

    def get_account_confirmation_token(self, expires_in=1800):
        return jwt.encode(
            {'account_confirmation': self.id, 'exp': time() + expires_in},
            app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_account_confirmation_token(token):
        try:
            id = jwt.decode(token, app.config['SECRET_KEY'],
                            algorithms=['HS256'])['account_confirmation']
        except jwt.ExpiredSignatureError:
            id = jwt.decode(
                token,
                app.config['SECRET_KEY'],
                algorithms=['HS256'],
                options={'verify_exp': False}
            )['account_confirmation']
            return {
                'status': 'expired',
                'user': Users.query.get(id),
            }
        except Exception:
            return {
                'status': 'fail'
            }
        return {
            'status': 'ok',
            'user': Users.query.get(id),
        }


@login.user_loader
def load_user(id):
    return Users.query.get(int(id))


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(64), index=True, unique=True)
    path = db.Column(db.String(128))

    def __repr__(self):
        return '<Category {}>'.format(self.category)


class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lesson_name = db.Column(db.String(128), index=True, unique=True)
    lesson_uid = db.Column(db.String(128), index=True, unique=True)
    category = db.Column(db.Integer, db.ForeignKey('category.id'))
    dependencies = db.Column(db.String(1024), index=True)
    path = db.Column(db.String(128))
    ratings = db.relationship('Rating', backref='lesson', lazy='dynamic')

    def __repr__(self):
        return '<Lesson {}>'.format(self.lesson_name)


class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    lesson_id = db.Column(db.Integer, db.ForeignKey('lesson.id'))
    rating = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Rating {}>'.format(self.rating)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating_id = db.Column(db.Integer, db.ForeignKey('rating.id'))
    comment = db.Column(db.String(2048))

    def __repr__(self):
        return '<Comment {}>'.format(self.comment)
