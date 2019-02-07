import datetime
import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users  # noqa


def addUser(username, password, email):
    user = Users.query.filter_by(username=username).first()
    if user is None:
        user = Users(username=username)
        user.set_email(email)
        user.set_password(password)
        user.signed_up_on = datetime.datetime.now()
        user.confirmed = True
        user.confirmed_on = datetime.datetime.now()
        db.session.add(user)
        db.session.commit()


addUser('airladon', 'airladon@gmail.com', 'asdfasdf')
addUser('test_user1', 'test_user1@thisiget.com', 'asdfasdf')
addUser('test_user2', 'test_user1@thisiget.com', 'asdfasdf')
addUser('test_user3', 'test_user1@thisiget.com', 'asdfasdf')
