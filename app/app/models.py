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


class Users(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.Binary(128))
    signed_up_on = db.Column(db.DateTime)
    confirmed = db.Column(db.Boolean, default=False)
    confirmed_on = db.Column(db.DateTime)
    ratings = db.relationship('Rating', backref='user', lazy='dynamic')
    last_login = db.Column(db.DateTime)

    def __repr__(self):
        return '<User {}>'.format(self.username)

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
            self.prep_password(password),
            bcrypt.gensalt(14))
        self.password_hash = a

    def check_password(self, password):
        password_hash = self.password_hash
        # pdb.set_trace()
        # if password_hash.startswith('\\x'):
        #     password_hash = bytearray.fromhex(password_hash[2:]).decode()
        return bcrypt.checkpw(
            self.prep_password(password),
            password_hash)

    def prep_password(self, password):
        return base64.b64encode(
            hashlib.sha512(password.encode('utf-8')).digest())

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
