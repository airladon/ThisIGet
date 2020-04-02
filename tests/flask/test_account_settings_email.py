import pytest  # noqa: F401
from common import login, logout
import sys
sys.path.insert(0, './app/')
from app.models import db, Users  # noqa E402
import app.models
from app.tools import hash_str_with_pepper  # noqa E402
# from app.email import can_send_email
import app.email
import re
import time


email_token = ''
email_username = ''


def always_true_mock():
    return True


def send_email_mock(subject, sender, recipients, text_body, html_body):
    lines = text_body.split('\n')
    global email_token
    global email_username
    email_username = re.sub('Dear ', '', lines[0]).strip(',')
    email_token = re.sub(
        'https://localhost/confirmEmailChange/', '', lines[4])


def test_account_settings_email(client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''
    # Login and check initial email is correct
    login(client)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    # Change email post
    res = client.post(
        '/account',
        data={
            'email_form-email': "noreply@thisiget.com",
            'email_form-submit_email': 'Verify & Change',
        },
        follow_redirects=True)

    # Status should be shown as email sent
    html = str(res.data)
    assert '<span class="input_form__submit_ok_message_text">Confirmation email sent</span>' in html  # noqa

    # email should not have changed yet
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    # Confirm email change with token
    res = client.get(
        f'/confirmEmailChange/{email_token}', follow_redirects=True)

    # Now should be back to account page, new email should be shown, and
    # database should be updated
    html = str(res.data)
    assert '<title>This I Get - Account Settings</title>' in html
    assert 'value="noreply@thisiget.com"' in html
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'noreply@thisiget.com'


def test_account_settings_email_signout(client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''
    login(client)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    res = client.post(
        '/account',
        data={
            'email_form-email': "noreply@thisiget.com",
            'email_form-submit_email': 'Verify & Change',
        },
        follow_redirects=True)

    # Status should be shown as email sent
    html = str(res.data)
    print(html)
    assert '<span class="input_form__submit_ok_message_text">Confirmation email sent</span>' in html  # noqa
    logout(client)

    # email should not have changed yet
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    # Confirm email change with token
    res = client.get(
        f'/confirmEmailChange/{email_token}', follow_redirects=True)

    # Now should be at email changed confirmation page which you only get
    # to if you are logged out
    html = str(res.data)
    assert '<title>This I Get - Email Changed</title>' in html
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'noreply@thisiget.com'


def test_account_settings_email_wrong_token(client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''

    # Login and check initial email is correct
    login(client)

    # Change email post
    res = client.post(
        '/account',
        data={
            'email_form-email': "noreply@thisiget.com",
            'email_form-submit_email': 'Verify & Change',
        },
        follow_redirects=True)

    # Status should be shown as email sent
    html = str(res.data)
    assert '<span class="input_form__submit_ok_message_text">Confirmation email sent</span>' in html  # noqa

    # email should not have changed yet
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    # Confirm email change with token
    res = client.get(
        f'/confirmEmailChange/{email_token}wrong', follow_redirects=True)

    # Should see token error page, and
    # database should NOT be updated
    html = str(res.data)
    print(html)
    assert 'The change to your account email address has failed as either the verification token is invalid or corrupt' in html  # noqa
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'


def test_account_settings_email_used_email(client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''

    # Login and check initial email is correct
    login(client)
    # Change email post
    res = client.post(
        '/account',
        data={
            'email_form-email': "test_user_02@thisiget.com",
            'email_form-submit_email': 'Verify & Change',
        },
        follow_redirects=True)

    # Status should be shown as email already in use
    html = str(res.data)
    assert 'Email address already in use' in html
    assert email_token == ''

    # email should not have changed yet
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'


def test_account_settings_email_invalid_email(client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    global email_token
    email_token = ''

    # Login and check initial email is correct
    login(client)
    # Change email post
    res = client.post(
        '/account',
        data={
            'email_form-email': "asdf",
            'email_form-submit_email': 'Verify & Change',
        },
        follow_redirects=True)

    # Status should be shown as email sent
    html = str(res.data)
    assert 'Invalid email address' in html
    assert email_token == ''

    # email should not have changed yet
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'


def expiration_mock():
    return 1


def test_account_settings_email_expired_token(client, monkeypatch):
    monkeypatch.setattr(app.email, 'can_send_email', always_true_mock)
    monkeypatch.setattr(app.email, 'send_email', send_email_mock)
    monkeypatch.setattr(app.models, 'expiration', expiration_mock)
    global email_token
    email_token = ''

    # Login and check initial email is correct
    login(client)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    # Change email post
    res = client.post(
        '/account',
        data={
            'email_form-email': "noreply@thisiget.com",
            'email_form-submit_email': 'Verify & Change',
        },
        follow_redirects=True)
    # assert True is False
    # Status should be shown as email sent
    html = str(res.data)
    assert '<span class="input_form__submit_ok_message_text">Confirmation email sent</span>' in html  # noqa

    # email should not have changed yet
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    time.sleep(2)
    # Confirm email change with token
    res = client.get(
        f'/confirmEmailChange/{email_token}', follow_redirects=True)

    # Now should be back to account page, new email should be shown, and
    # database should be updated
    html = str(res.data)
    print(html)
    assert 'You need to verify any email change within 30 minutes' in html
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'
