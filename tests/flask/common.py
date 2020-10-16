
import pytest  # noqa: F401
import sys
sys.path.insert(0, './app/')
from app.models import db, Users  # noqa E402
from app.tools import hash_str_with_pepper  # noqa E402

new_user = 'new_test_user_01'


def create_account(
        client,
        username=new_user,
        email='new_test_user_01@thisiget.com',
        password='12345678',
        repeat_password='12345678',
        terms=True,
        follow_redirects=True):
    if terms:
        return client.post('/createAccount', data=dict(
            username=username,
            email=email,
            password=password,
            terms=True,
            repeat_password=repeat_password),
            follow_redirects=follow_redirects)
    else:
        return client.post('/createAccount', data=dict(
            username=username,
            email=email,
            password=password,
            repeat_password=repeat_password),
            follow_redirects=follow_redirects)


def remove_account(client, username=new_user):
    # user = Users.query.filter_by(username=username).first()
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()
    if user is not None:
        db.session.delete(user)
        db.session.commit()


def login(
        client,
        username='test_user_01',
        password='12345678'):
    return client.post('/login', data=dict(
        username_or_email=username,
        password=password
    ))


def logout(client):
    return client.get('/logout')
