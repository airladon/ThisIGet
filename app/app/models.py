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

# Size of password:
#   - Password hash is 60 bytes + tag (16) + nonce (16) = 92 bytes = 736 bits
#   - 124 b64 chars = 744 bits = 93 bytes
#   - Therefore saved string will be 124 chars
# Size of hash: bcrypt output will always be 60 b64 chars.

# Size of email hash will be 60-29 = 31 as don't want to store the pepper

# Username size will be limited to 32 characters


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), index=True, unique=True)
    email = db.Column(db.String(472))
    email_hash = db.Column(db.String(31))
    password = db.Column(db.String(124))
    signed_up_on = db.Column(db.DateTime)
    confirmed = db.Column(db.Boolean, default=False)
    confirmed_on = db.Column(db.DateTime)
    ratings = db.relationship('Ratings', backref='user', lazy='dynamic')
    last_login = db.Column(db.DateTime)

    def __repr__(self):
        return '<User {}>'.format(self.username)

    def set_email(self, email):
        formatted_email = format_email(email)
        self.email = encrypt(formatted_email, min_length_for_padding=320)
        self.email_hash = hash_str_with_pepper(formatted_email)

    def get_email(self):
        return decrypt(self.email)

    def set_password(self, password):
        self.password = encrypt(hash_str(password))

    def check_password(self, password):
        return check_hash(password, decrypt(self.password))

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


class Categories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(64), index=True, unique=True)
    path = db.Column(db.String(128))

    def __repr__(self):
        return '<Category {}>'.format(self.category)


class Lessons(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True, unique=True)
    uid = db.Column(db.String(128), index=True, unique=True)
    category = db.Column(db.Integer, db.ForeignKey('categories.id'))
    dependencies = db.Column(db.String(1024), index=True)
    enabled = db.Column(db.Boolean, index=True)
    path = db.Column(db.String(128))
    versions = db.relationship('Versions', backref='lesson', lazy='dynamic')
    topics = db.relationship('Topics', backref='lesson', lazy='dynamic')

    def __repr__(self):
        return '<Lessons {}>'.format(self.name)


class Versions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    uid = db.Column(db.String(128), index=True)
    title = db.Column(db.String(128), index=True)
    description = db.Column(db.String(256), index=True)
    path = db.Column(db.String(128), index=True)
    onPath = db.Column(db.Boolean, index=True)
    # topics = db.Column(db.String(512), index=True)
    qr = db.Column(db.String(1024), index=True)
    ratings = db.relationship('Topics', backref='version', lazy='dynamic')

    def __repr__(self):
        return '<Versions {}>'.format(self.title)


class Topics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), index=True)
    lesson_id = db.Column(db.Integer, db.ForeignKey('lessons.id'))
    version_id = db.Column(db.Integer, db.ForeignKey('versions.id'))
    ratings = db.relationship('Ratings', backref='topic', lazy='dynamic')

    def __repr__(self):
        return '<Topics {}>'.format(self.name)


class Ratings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'))
    rating = db.Column(db.Integer, index=True)

    def __repr__(self):
        return '<Rating {} {} {} {}>'.format(
            self.topic.lesson, self.topic.version, self.topic.name,
            self.rating, self.rating)


class AllRatings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'))
    page = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating_id = db.Column(db.Integer, db.ForeignKey('ratings.id'))
    comment = db.Column(db.String(2048))

    def __repr__(self):
        return '<Comment {}>'.format(self.comment)


@login.user_loader
def load_user(id):
    return Users.query.get(int(id))
