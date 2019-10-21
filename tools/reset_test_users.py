import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users, VersionRatings # noqa
from app.tools import hash_str_with_pepper  # noqa
from app.routes import update_version_rating_cache  # noqa


def resetUser(username, email, password):
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()
    if user is None:
        print(f'Resetting user {username} failed.')
        return
    user.set_email(email)
    user.set_password(password)


for i in range(10):
    username = f'test_user_{i:03}'
    email = f'{username}@thisiget.com'
    password = '12345678'
    print(f'Resetting {username}')
    resetUser(username, email, password)

db.session.commit()
