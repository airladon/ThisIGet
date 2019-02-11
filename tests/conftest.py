import pytest  # noqa: F401
import os
import sys
basedir = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users  # noqa


@pytest.fixture
def client():
    app.config['SQLALCHEMY_DATABASE_URI'] = \
        'sqlite:///' + os.path.join(basedir, 'app_test.db')
    app.config['WTF_CSRF_ENABLED'] = False
    # ctx = app.app_context()
    # ctx.push()

    # def teardown():
    #     ctx.pop()

    # request.addfinalizer(teardown)
    # return app

    # test_user = Users(username='test_user_01')
    # test_user.set_email('test_user_01@thisiget.com')
    # test_user.set_password('12345678')
    # db.session.add(test_user)

    client = app.test_client()

    yield client

    # db.session.delete(test_user)
