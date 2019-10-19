from app import db
from app import login
from datetime import datetime
# import bcrypt
# import hashlib
# import base64
from flask_login import UserMixin
from time import time
import jwt
from app import app
# import os
# from Crypto.Cipher import AES
from app.tools import encrypt, decrypt, hash_str, check_hash
from app.tools import hash_str_with_pepper, format_email

# Database entries have three tiers of security
#   1. Plain Text
#       - Entries that cannot be used to identify someone
#       - Entries that might be valudes and might need to be queried en masse
#       - Example: Time stamps, rating values
#
#   2. Encrypted with Nonce and Peppered Hash
#       - Original characters need to be accessible
#       - Needs to be unique, and thus compared at a population level when an
#         account is created
#       - Pepper is used instead of a salt so a new possible entry can be
#         hashed in the same way as all other hashes in the database column
#         and thus compared
#       - Example: Email, username
#
#   3. Hashed with unique salt and encrypted
#       - Original characters to not need to be accessible
#       - Encryption means attacker needs access to database and server
#         managing database to get encryption keys
#       - Example: Password
#
# Encryption is AES 256 using EAX mode which allows for stream encoding.
# Stream encoding means encoded output length will be proportional to plain
# text length. Therefore, for encrypting emails, pad emails to hide their
# length.
#
# Encryption uses a nonce (once only number) so when checking if a value
# exists in a database, the value cannot be encrypted and compared to existing
# encrypted values - as all have different nonces.
#
# Therefore, for values that need to be stored with encryption, and compared
# over a population the value must be stored in two ways:
#  1. Encrypted with nonce
#  2. Hashed with pepper
#
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
#
# Size of Encrypted username storage in database:
#   - Usernames may have 32 characters
#   - Therefore, emails are padded to 32 characters
#   - Encrypted bytes includes encryped username (32 bytes) + tag (16 bytes)
#     + nonce (16 bytes) = 64 bytes
#   - Encoding in Base64: 64 * 8 bits / 6 bits = 85.333 b64 characters
#     - 64 bytes = 512 bits
#     - 85 b64 chars = 510 bits, so need 86 b64 chars to cover 64 bytes.
#     - But then it won't split evenly into 8 bits, so need another 2 b64 chars
#     - Therefore total is 88 b64 chars
#   - This is then stored in the database as utf-8, which will be a full 88
#     bytes
#
# Size of password:
#   - Password hash is 60 bytes + tag (16) + nonce (16) = 92 bytes = 736 bits
#   - 124 b64 chars = 744 bits = 93 bytes
#   - Therefore saved string will be 124 chars
# Size of hash: bcrypt output will always be 60 b64 chars.

# Size of email hash will be 60-29 = 31 as don't want to store the pepper

# Username size will be limited to 32 characters


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(88), index=True, unique=True)
    username_hash = db.Column(db.String(31))
    email = db.Column(db.String(472))
    email_hash = db.Column(db.String(31))
    password = db.Column(db.String(124))
    signed_up_on = db.Column(db.DateTime)
    confirmed = db.Column(db.Boolean, default=False)
    confirmed_on = db.Column(db.DateTime)
    last_login = db.Column(db.DateTime)
    version_ratings = db.relationship(
        'VersionRatings', cascade="all,delete", backref='user', lazy='dynamic')
    link_ratings = db.relationship(
        'LinkRatings', cascade="all,delete", backref='user', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_email(self, email):
        formatted_email = format_email(email)
        self.email = encrypt(formatted_email, min_length_for_padding=320)
        self.email_hash = hash_str_with_pepper(formatted_email)

    def get_email(self):
        return decrypt(self.email)

    def set_username(self, username):
        self.username = encrypt(username, min_length_for_padding=32)
        self.username_hash = hash_str_with_pepper(username.lower())

    def get_username(self):
        return decrypt(self.username)

    def set_password(self, password):
        self.password = encrypt(hash_str(password))

    def check_password(self, password):
        return check_hash(password, decrypt(self.password))

    def get_reset_password_token(self, expires_in=1800):
        return jwt.encode(
            {'reset_password': self.id, 'exp': time() + expires_in},
            app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')
    
    def delete_account(self):
        self.username = hash_str_with_pepper(
            f'{self.get_username()} {str(datetime.now())}')
        self.username_hash = 'deleted account'
        self.email = ''
        self.email_hash = ''
        self.password = ''

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except Exception:
            return
        return Users.query.get(id)

    def get_change_email_token(self, email_address, expires_in=1800):
        return jwt.encode(
            {
                'change_email': self.id,
                'exp': time() + expires_in,
                'email': email_address,
            },
            app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

    @staticmethod
    def verify_change_email_token(token):
        try:
            id = jwt.decode(token, app.config['SECRET_KEY'],
                            algorithms=['HS256'])['change_email']
            email = jwt.decode(token, app.config['SECRET_KEY'],
                               algorithms=['HS256'])['email']
        except jwt.ExpiredSignatureError:
            id = jwt.decode(
                token,
                app.config['SECRET_KEY'],
                algorithms=['HS256'],
                options={'verify_exp': False}
            )['change_email']
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
            'email': email,
        }

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


class VersionRatings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    version_uid = db.Column(db.String(256))
    rating = db.Column(db.Integer, index=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    # viewed = db.Column(db.String(256))

    def __repr__(self):
        return '<Rating {} {} {}>'.format(
            self.user_id, self.version_uid, self.rating)


class VersionRatingsCache(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    topic_uid = db.Column(db.String(256))
    approach_version = db.Column(db.String(256))
    num_ratings = db.Column(db.Integer, index=True)
    ave_rating = db.Column(db.Float, index=True)
    high_ratings = db.Column(db.Integer, index=True)

    def __repr__(self):
        return '<Rating {} {} {} {}>'.format(
            self.topic_uid, self.approach_version, self.num_ratings,
            self.high_ratings)


class LinkRatings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    version_uid = db.Column(db.String(256))
    link_hash = db.Column(db.String(32))
    rating = db.Column(db.Integer, index=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Link Rating {} {} {} {}>'.format(
            self.user_id, self.version_uid, self.link_hash, self.rating)


class LinkRatingsCache(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    version_uid = db.Column(db.String(256))
    link_hash = db.Column(db.String(32))
    num_ratings = db.Column(db.Integer, index=True)
    ave_rating = db.Column(db.Float, index=True)
    high_ratings = db.Column(db.Integer, index=True)

    def __repr__(self):
        return '<Link Rating {} {} {} {}>'.format(
            self.version_uid, self.approach_version, self.num_ratings,
            self.high_ratings)


@login.user_loader
def load_user(id):
    return Users.query.get(int(id))
