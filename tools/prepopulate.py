import datetime
import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users  # noqa


def addUser(username, email, password):
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
addUser('test_user01', 'test_user01@thisiget.com', 'asdfasdf')
addUser('test_user02', 'test_user02@thisiget.com', 'asdfasdf')
addUser('test_user03', 'test_user03@thisiget.com', 'asdfasdf')
