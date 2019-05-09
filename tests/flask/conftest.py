import pytest  # noqa: F401
import os
import sys
basedir = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users, Ratings  # noqa

# Remember, if database changes have happened, need to copy the new
# app.db to tests/flask/test_app.db


def remove_account(username):
    user = Users.query.filter_by(username=username).first()
    if user is not None:
        db.session.delete(user)
        db.session.commit()


def create_user(username, email=''):
    user = Users(username=username)
    if email == '':
        user.set_email(f'{username}@thisiget.com')
    else:
        user.set_email(email)
    user.set_password('12345678')
    user.confirmed = True
    db.session.add(user)


@pytest.fixture(scope="module")
def client(request):
    app.config['SQLALCHEMY_DATABASE_URI'] = \
        'sqlite:///' + os.path.join(basedir, 'app_test.db')
    app.config['WTF_CSRF_ENABLED'] = False
    app.config['MAIL_USERNAME'] = ''
    # ctx = app.app_context()
    # ctx.push()

    # def teardown():
    #     ctx.pop()

    Users.query.delete()
    Ratings.query.delete()
    create_user('test_User_01', 'test_user_01@thisiget.com')
    create_user('test_user_02')

    unconfirmed_user = Users(username='unconfirmed_user_01')
    unconfirmed_user.set_email('unconfirmed_user_01@thisiget.com')
    unconfirmed_user.set_password('12345678')
    db.session.add(unconfirmed_user)
    db.session.commit()

    client = app.test_client()

    yield client

    def fin():
        Users.query.delete()
        Ratings.query.delete()
    request.addfinalizer(fin)
