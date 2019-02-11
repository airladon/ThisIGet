import pytest  # noqa: F401
import os
import sys
basedir = os.path.abspath(os.path.dirname(__file__))
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users  # noqa


@pytest.fixture(scope="module")
def client(request):
    app.config['SQLALCHEMY_DATABASE_URI'] = \
        'sqlite:///' + os.path.join(basedir, 'app_test.db')
    app.config['WTF_CSRF_ENABLED'] = False
    # ctx = app.app_context()
    # ctx.push()

    # def teardown():
    #     ctx.pop()

    # request.addfinalizer(teardown)
    # return app
    test_user = Users.query.filter_by(username='test_User_01').first()
    # pdb.set_trace()
    if test_user is not None:
        db.session.delete(test_user)
        db.session.commit()
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
        test_user = Users.query.filter_by(username='test_User_01').first()
        if test_user is not None:
            db.session.delete(test_user)
            db.session.commit()
        unconfirmed_user = Users.query.filter_by(
            username='unconfirmed_user_01').first()
        if unconfirmed_user is not None:
            db.session.delete(unconfirmed_user)
            db.session.commit()
    request.addfinalizer(fin)
    # db.session.delete(test_user)
