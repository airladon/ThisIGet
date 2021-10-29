import pytest  # noqa: F401
import os
import sys
basedir = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users  # noqa
from app.models import VersionRatings, VersionRatingsCache  # noqa
from app.models import LinkRatings, LinkRatingsCache  # noqa
from app.tools import hash_str_with_pepper  # noqa E402

# Remember, if database changes have happened, need to copy the new
# app.db to tests/flask/test_app.db


def remove_account(username):
    # user = Users.query.filter_by(username=username).first()
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()
    if user is not None:
        db.session.delete(user)
        db.session.commit()


def create_user(username, email=''):
    user = Users()
    user.set_username(username)
    if email == '':
        user.set_email(f'{username}@thisiget.com')
    else:
        user.set_email(email)
    user.set_password('12345678')
    user.confirmed = True
    db.session.add(user)


@pytest.fixture(scope="function")
def client(request):
    app.config['SQLALCHEMY_DATABASE_URI'] = \
        'sqlite:///' + os.path.join(basedir, 'app_test.db')
    app.config['WTF_CSRF_ENABLED'] = False
    app.config['MAIL_USERNAME'] = 'test'
    app.config['MAIL_PASSWORD'] = 'test'
    app.config['MAIL_SERVER'] = 'test'
    app.config['MAIL_SENDER'] = 'test'
    # app.config['MAIL_SUPPRESS_SEND'] = True
    # app.config['TESTING'] = True
    # ctx = app.app_context()
    # ctx.push()

    # def teardown():
    #     ctx.pop()

    Users.query.delete()
    VersionRatings.query.delete()
    VersionRatingsCache.query.delete()
    LinkRatings.query.delete()
    LinkRatingsCache.query.delete()
    create_user('test_User_01', 'test_user_01@thisiget.com')
    create_user('test_user_02')

    unconfirmed_user = Users()
    unconfirmed_user.set_username('unconfirmed_user_01')
    unconfirmed_user.set_email('unconfirmed_user_01@thisiget.com')
    unconfirmed_user.set_password('12345678')
    db.session.add(unconfirmed_user)
    db.session.commit()

    client = app.test_client()

    yield client

    def fin():
        Users.query.delete()
        VersionRatings.query.delete()
        VersionRatingsCache.query.delete()
        LinkRatings.query.delete()
        LinkRatingsCache.query.delete()
    request.addfinalizer(fin)
