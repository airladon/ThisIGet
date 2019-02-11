import pytest  # noqa: F401
import os
basedir = os.path.abspath(os.path.dirname(__file__))
import pdb
import sys
sys.path.insert(0, './app/')
from app import app
from app.models import db, Users  # noqa

new_user = 'new_test_user_01'
new_email = 'new_test_user_01@thisiget.com'


def create_account(
        client,
        username=new_user,
        email='new_test_user_01@thisiget.com',
        password='12345678',
        repeat_password='12345678',
        follow_redirects=True):
    return client.post('/createAccount', data=dict(
        username=username,
        email=email,
        password=password,
        repeat_password=repeat_password), follow_redirects=follow_redirects)


def remove_account(client, username=new_user):
    user = Users.query.filter_by(username=username).first()
    if user is not None:
        db.session.delete(user)
        db.session.commit()


def test_create_new_user(client):
    username = new_user
    remove_account(client, username=username)
    user = Users.query.filter_by(username='new_test_user_01').first()
    assert user is None

    res = create_account(
        client, username='new_test_user_01', follow_redirects=False)
    user = Users.query.filter_by(username=username).first()
    assert user is not None
    assert res.headers['Location'] == \
        f'https://localhost/confirmAccountEmailSent/{username}'


@pytest.mark.parametrize(
    "exists,username,email,password,repeat_password, error", [
        # Password fails
        (False, new_user, new_email, '12345678', '1234567',
            'Field must be equal to password.'),
        (False, new_user, new_email, '1234567', '1234567',
            'Password must be at least 8 characters'),
        # Username fails
        (False, 'this_is_a_really_really_long_username', new_email,
            '12345678', '12345678', 'Username max length is 32 characters'),
        (True, new_user, new_email, '12345678', '12345678',
            'Username already exist'),
        (True, 'new_test_user_02', 'new_test_user_01@thisiget.com',
            '12345678', '12345678', 'Email address already in use'),
        (True, 'new_test_user_02', 'new_test_user_01@THISiget.com',
            '12345678', '12345678', 'Email address already in use'),
    ])
def test_create_account_fail(
        client, exists, username, email, password, repeat_password, error):
    remove_account(client)
    if exists:
        create_account(client)
    res = create_account(
        client=client, username=username, email=email,
        password=password, repeat_password=repeat_password)
    # pdb.set_trace()
    assert error in str(res.data)
