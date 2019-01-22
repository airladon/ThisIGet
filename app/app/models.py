from app import db
from datetime import datetime
import bcrypt
import hashlib
import base64


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    ratings = db.relationship('Rating', backref='user', lazy='dynamic')

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
        self.password_hash = bcrypt.hashpw(
            self.prep_password(password),
            bcrypt.gensalt(14))

    def check_password(self, password):
        return bcrypt.checkpw(
            self.prep_password(password),
            self.password_hash)

    def prep_password(self, password):
        return base64.b64encode(
            hashlib.sha512(password.encode('utf-8')).digest())


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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
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
