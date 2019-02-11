import pytest  # noqa: F401
import os
basedir = os.path.abspath(os.path.dirname(__file__))
import pdb
import sys
sys.path.insert(0, './app/')
from app import app
from app.models import db, Users  # noqa


def create_account(
        client,
        username='new_test_user_01',
        email='new_test_user_01@thisiget.com',
        password='12345678',
        repeat_password='12345678',
        follow_redirects=True):
    return client.post('/createAccount', data=dict(
        username=username,
        email=email,
        password=password,
        repeat_password=repeat_password), follow_redirects=follow_redirects)


def remove_account(client, username):
    user = Users.query.filter_by(username=username).first()
    if user is not None:
        db.session.delete(user)
        db.session.commit()


def test_create_new_user(client):
    username = 'new_test_user_01'
    remove_account(client, username=username)
    user = Users.query.filter_by(username='new_test_user_01').first()
    assert user is None

    res = create_account(
        client, username='new_test_user_01', follow_redirects=False)
    user = Users.query.filter_by(username=username).first()
    assert user is not None
    assert res.headers['Location'] == \
        f'https://localhost/confirmAccountEmailSent/{username}'

    # assert result.headers['Set-Cookie'] == 'username=; Path=/'


# def test_correct_login_after_redirect(client):
#     # assert client.get('/login').status_code == 200
#     res = login(client)
#     assert res.status_code == 200
#     assert 'username=test_User_01' in res.headers['Set-Cookie']
#     assert 'Path=/' in res.headers['Set-Cookie']
#     assert 'id="home"' in str(res.data)
#     logout(client)


# home_path = 'https://localhost/'
# login_path = 'https://localhost/login'
# unconfirmed_path = \
#     'https://localhost/confirmAccountEmailSent/unconfirmed_user_01'


# @pytest.mark.parametrize("username,password,location", [
#     # Valid cases
#     ('test_User_01', '12345678', home_path),
#     ('test_user_01', '12345678', home_path),  # Different case username
#     ('TEST_USER_01', '12345678', home_path),  # Different case username
#     ('test_user_01@thisiget.com', '12345678', home_path),  # Diff domain case
#     ('test_user_01@THISIGET.com', '12345678', home_path),  # Diff domain case
#     #
#     # Invalid cases
#     ('invalid', '12345678', login_path),                    # invalid user
#     ('test_User_01', 'invalid', login_path),                # invalid pass
#     ('test_user_01@thisiget.com', 'invalid', login_path),   # invalid pass
#     ('invalid', 'invalid', login_path),                     # invalid both
#     ('test_User_01@thisiget.com', '12345678', login_path),  # Diff user case
#     #
#     # Unconfirmed user
#     ('unconfirmed_user_01', '12345678', unconfirmed_path),
#     ('unconfirmed_user_01@thisiget.com', '12345678', unconfirmed_path),
# ])
# def test_login(client, username, password, location):
#     res = login(client, username, password, follow_redirects=False)
#     assert res.status_code == 302
#     assert res.headers['Location'] == location
#     logout(client)
