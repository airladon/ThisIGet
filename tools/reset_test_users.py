import sys
import datetime
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users, VersionRatings # noqa
from app.tools import hash_str_with_pepper  # noqa
from app.routes import update_version_rating_cache  # noqa


def resetUser(username, email, password):
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()
    if user is None:
        user = Users()
        user.set_username(username)
        user.set_email(email)
        user.set_password(password)
        user.signed_up_on = datetime.datetime.now()
        user.confirmed = True
        user.confirmed_on = datetime.datetime.now()
        db.session.add(user)
        print(f'User {username} created.')
        return
    user.set_email(email)
    user.set_password(password)
    user.confirmed = True


for i in range(10):
    username = f'test_user_{i:03}'
    email = f'{username}@thisiget.com'
    password = '12345678'
    print(f'Resetting {username}')
    resetUser(username, email, password)

user = Users.query.filter_by(
    username_hash=hash_str_with_pepper('test_user_002aofkspeD3fif'.lower())) \
    .first()
if user is not None:
    db.session.delete(user)
    print('Removed test_user_002aofkspeD3fif')


db.session.commit()
