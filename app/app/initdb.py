# from app import db
from app.models import User


def init_db():
    print(User.query.filter_by(username='airladon').first())
