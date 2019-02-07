import datetime
import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users  # noqa

user = Users.query.filter_by(username='airladon').first()
if user is None:
    user = Users(username='airladon')
    user.set_email('airladon@gmail.com')
    user.set_password('asdfasdf')
    user.signed_up_on = datetime.datetime.now()
    user.confirmed = True
    user.confirmed_on = datetime.datetime.now()
    db.session.add(user)
    db.session.commit()
