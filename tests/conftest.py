import pytest  # noqa: F401
import os
import sys
basedir = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users  # noqa


def remove_account(username):
    user = Users.query.filter_by(username=username).first()
    if user is not None:
        db.session.delete(user)
        db.session.commit()


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

    remove_account('test_User_01')
    remove_account('unconfirmed_user_01')
    remove_account('new_test_user_01')
    remove_account('new_test_user_02')

    test_user = Users(username='test_User_01')
    test_user.set_email('test_user_01@thisiget.com')
    test_user.set_password('12345678')
    test_user.confirmed = True
    db.session.add(test_user)

    unconfirmed_user = Users(username='unconfirmed_user_01')
    unconfirmed_user.set_email('unconfirmed_user_01@thisiget.com')
    unconfirmed_user.set_password('12345678')
    db.session.add(unconfirmed_user)
    db.session.commit()

    client = app.test_client()

    yield client

    def fin():
        remove_account('test_User_01')
        remove_account('unconfirmed_user_01')
        remove_account('new_test_user_01')
        remove_account('new_test_user_02')
    request.addfinalizer(fin)
    # db.session.delete(test_user)
