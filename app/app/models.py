from app import db
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    salt = db.Column(db.String(128))
    password_hash = db.Column(db.String(128))
    ratings = db.relationship('Rating', backref='user', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(64), index=True, unique=True)
    path = db.Column(db.String(128))


class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lesson_name = db.Column(db.String(128), index=True, unique=True)
    lesson_uid = db.Column(db.String(128), index=True, unique=True)
    category = db.Column(db.Integer, db.ForeignKey('cateory.id'))
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
        return '<Rating {}>'.format(self.body)


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating_id = db.Column(db.Integer, db.ForeignKey('rating.id'))
    comment = db.Column(db.String(2048))

    def __repr__(self):
        return '<Comment {}>'.format(self.body)
