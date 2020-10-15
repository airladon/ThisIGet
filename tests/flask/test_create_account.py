import pytest  # noqa: F401
import sys
# import pdb
from common import create_account, remove_account, login
sys.path.insert(0, './app/')
from app.models import db, Users  # noqa E402
from app.tools import hash_str_with_pepper, format_email  # noqa E402
# from app import mail
import datetime
from sqlalchemy import or_, desc
import app.email
import re


new_user = 'new_test_user_01'
new_user2 = 'new_test_user_02'
new_email = 'new_test_user_01@thisiget.com'


def always_true_mock():
    return True


def send_email_mock(subject, sender, recipients, text_body, html_body):
    lines = text_body.split('\n')
    global email_token
    global email_username
    email_username = re.sub('Dear ', '', lines[0]).strip(',')
    email_token = re.sub(
        'https://localhost.*/confirmAccount/', '', lines[4])


def create_account_with_confirm(client, username='new_test_user_01',
                                email='new_test_user_01@thisiget.com',
                                password='12345678',
                                signed_up_on=0,
                                confirm=True):
    create_account(
        client=client, username=username, email=email, password=password,
        repeat_password=password)
    formatted_email = format_email(email)
    lower_username = username.lower()
    user = Users.query \
        .filter(Users.username_hash == hash_str_with_pepper(lower_username)) \
        .filter(Users.email_hash == hash_str_with_pepper(formatted_email)) \
        .order_by(desc('signed_up_on')) \
        .first()
    if user is not None:
        if confirm:
            user.confirmed = True
        if signed_up_on != 0:
            user.signed_up_on = signed_up_on
        db.session.commit()


def test_create_new_user(client):
    username = new_user
    remove_account(client, username=username)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('new_test_user_01')).first()
    assert user is None

    res = create_account(
        client, username='new_test_user_01', follow_redirects=False)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()
    assert user is not None
    assert res.headers['Location'] == \
        f'https://localhost/confirmAccountEmailSent/{username}'


# Should Fail
@pytest.mark.parametrize(
    "exists,username,email,password,repeat_password,terms,error", [
        # Password fails
        (False, new_user, new_email, '12345678', '1234567', True,
            'Field must be equal to password.'),
        (False, new_user, new_email, '1234567', '1234567', True,
            'Password must be at least 8 characters'),
        # Username fails
        (False, 'this_is_a_really_really_long_username', new_email,
            '12345678', '12345678', True,
            'Username max length is 32 characters'),
        (True, new_user, new_email, '12345678', '12345678', True,
            'Username already exist'),
        # Email fails
        (True, 'new_test_user_02', 'new_test_user_01@thisiget.com',
            '12345678', '12345678', True,
            'Email address already in use'),
        (True, 'new_test_user_02', 'new_test_user_01@THISiget.com',
            '12345678', '12345678', True,
            'Email address already in use'),
        (False, new_user, 'invalid_email',
            '12345678', '12345678', True,
            'Invalid email address'),
        (False, new_user, new_email,
            '12345678', '12345678', False,
            'You must agree to create an account'),
    ])
def test_create_account_fail(
        client, exists, username, email, password, repeat_password,
        terms, error):
    remove_account(client)
    if exists:
        create_account_with_confirm(client)

    res = create_account(
        client=client, username=username, email=email,
        password=password, repeat_password=repeat_password, terms=terms)
    assert error in str(res.data)


# Should pass, but confirmed flag should be false
@pytest.mark.parametrize(
    "exists,username,email,password,repeat_password", [
        (False, new_user, new_email, '12345678', '12345678'),
        # Email user has different case but same letters
        (True, new_user2, 'new_test_USER_01@thisiget.com',
            '12345678', '12345678'),
    ])
def test_create_account_pass(
        client, exists, username, email, password, repeat_password):
    remove_account(client)
    remove_account(client, username=username)
    if exists:
        create_account(client)
    res = create_account(
        client=client, username=username, email=email,
        password=password, repeat_password=repeat_password,
        follow_redirects=False)
    assert res.headers['Location'] == \
        f'https://localhost/confirmAccountEmailSent/{username}'
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()
    assert user.confirmed is False


# If a previous account exists, but is not confirmed, then its username
# and email can be reused
user1 = 'user1'
user2 = 'user2'
email1 = 'user1@thisiget.com'
email2 = 'user2@thisiget.com'


@pytest.mark.parametrize(
    "username, email", [
        # Both username and email exist in same row
        (user1, email1),
        # Both username and email exist but in different rows
        (user1, email2),
        # Only username exists
        (user1, 'user3@thisiget.com'),
        # Only email exists
        ('user3', email1),
    ])
def test_create_account_existing_unconfirmed(
        client, monkeypatch, username, email):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''

    remove_account(client, username=user1)
    remove_account(client, username=user2)
    remove_account(client, username=username)

    create_account_with_confirm(
        client, username=user1, email=email1, confirm=False,
        signed_up_on=datetime.datetime.now() - datetime.timedelta(seconds=10))
    create_account_with_confirm(
        client, username=user2, email=email2, confirm=False,
        signed_up_on=datetime.datetime.now() - datetime.timedelta(seconds=10))

    res = create_account(
        client=client, username=username, email=email,
        password='12345678', repeat_password='12345678',
        follow_redirects=False)

    assert res.headers['Location'] == \
        f'https://localhost/confirmAccountEmailSent/{username}'
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()

    assert user is not None
    assert user.confirmed is False

    # confirm it is a new signed up on time
    if user is not None:
        assert (datetime.datetime.now() - user.signed_up_on).seconds < 5

    # Confirm the account
    res = client.get(
        f'/confirmAccount/{email_token}', follow_redirects=True)
    html = str(res.data)
    assert 'Thankyou for confirming your email' in html

    # confirm only one account with the desired username or email exists
    formatted_email = format_email(email)
    users = Users.query \
        .filter(or_(
            Users.username_hash == hash_str_with_pepper(username.lower()),
            Users.email_hash == hash_str_with_pepper(formatted_email),
        )) \
        .all()
    assert len(users) == 1


# Test the case where you create two accounts before confirming either
def test_create_account_twice_same_user_email(client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''

    remove_account(client, username=user1)

    create_account_with_confirm(
        client, username=user1, email=email1, confirm=False)
    token1 = email_token

    create_account_with_confirm(
        client, username=user1, email=email1, confirm=False)
    token2 = email_token

    formatted_email = format_email(email1)
    users = Users.query \
        .filter(or_(
            Users.username_hash == hash_str_with_pepper(user1),
            Users.email_hash == hash_str_with_pepper(formatted_email),
        )) \
        .all()

    assert len(users) == 1
    assert token1 != token2


# Test the case where you create two accounts before confirming either
def test_create_account_thrice_different_user_email(
        client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''
    remove_account(client, username=user1)

    create_account_with_confirm(
        client, username=user1, email=email2, confirm=False)
    # token1 = email_token

    create_account_with_confirm(
        client, username=user2, email=email1, confirm=False)
    # token2 = email_token

    create_account_with_confirm(
        client, username=user1, email=email1, confirm=False)
    token3 = email_token

    formatted_email = format_email(email1)
    users = Users.query \
        .filter(or_(
            Users.username_hash == hash_str_with_pepper(user1),
            Users.email_hash == hash_str_with_pepper(formatted_email),
        )) \
        .all()

    assert len(users) == 1

    res = client.get(
        f'/confirmAccount/{token3}', follow_redirects=True)
    html = str(res.data)
    assert 'Thankyou for confirming your email' in html


# Create two accounts without confirming, then confirm both
def test_create_account_twice_and_confirm_both(
        client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''

    remove_account(client, username=user1)

    create_account_with_confirm(
        client, username=user1, email=email1, confirm=False)
    token1 = email_token

    create_account_with_confirm(
        client, username=user1, email=email1, confirm=False)
    token2 = email_token

    # Confirm the account
    res = client.get(
        f'/confirmAccount/{token1}', follow_redirects=True)
    html = str(res.data)
    assert 'A more recent account with the same username or email has since been created' in html  # noqa

    res = client.get(
        f'/confirmAccount/{token2}', follow_redirects=True)
    html = str(res.data)
    assert 'Thankyou for confirming your email' in html


# Create two accounts without confirming, then confirm both
def test_create_account_confirm_after_delete(
        client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''

    remove_account(client, username=user1)
    create_account(client, username=user1)
    res = client.get(
        f'/confirmAccount/{email_token}', follow_redirects=True)
    html = str(res.data)
    assert 'Thankyou for confirming your email' in html

    login(client, username=user1)
    client.post('/confirmDelete', data={'form-submit_delete': "Delete NOW"})

    res = client.get(
        f'/confirmAccount/{email_token}', follow_redirects=True)
    html = str(res.data)
    assert 'The token points to an account that has been deleted.' in html
