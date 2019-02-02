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
import pdb


def prep_password(password):
        return base64.b64encode(
            hashlib.sha512(password.encode('utf-8')).digest())


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    encrypted_email = db.Column(db.LargeBinary(256))
    email_hash = db.Column(db.String(128))
    password_hash = db.Column(db.String(128))
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

    @staticmethod
    def encrypt_email(email):
        key_string = os.environ.get('AES_KEY') or '╘oaí²∞7▒·oDºB@`\x02÷C<\x02╞£╨`\nä\x01<∞VΩM'
        key = key_string.encode('cp437')

        cipher = AES.new(key, AES.MODE_EAX)
        nonce = cipher.nonce
        ciphertext, tag = cipher.encrypt_and_digest(email.encode('utf-8'))
        encypted_email = tag + nonce + ciphertext
        # pdb.set_trace()
        return encypted_email
        # return 'encrypted_email'

    @staticmethod
    def decrypt_email(encrypted_email_in_utf16):
        # pdb.get_trace()
        encrypted_email = encrypted_email_in_utf16
        tag = encrypted_email[0:16]
        nonce = encrypted_email[16:32]
        ciphertext = encrypted_email[32:]

        key_string = os.environ.get('AES_KEY') or '╘oaí²∞7▒·oDºB@`\x02÷C<\x02╞£╨`\nä\x01<∞VΩM'
        key = key_string.encode('cp437')

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
