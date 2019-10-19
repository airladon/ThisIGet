import pytest  # noqa: F401
import os
from common import login, logout, create_account, remove_account
import sys
sys.path.insert(0, './app/')
from app.models import db, Users  # noqa E402
from app.tools import hash_str_with_pepper  # noqa E402


def test_account_settings_not_logged_in(client):
    logout(client)
    res = client.get('/account')
    assert res.headers['Location'] == 'https://localhost/'


def test_account_settings_default_values(client):
    login(client)
    res = client.get('/account')
    html = str(res.data)
    assert '<input autocomplete="username" class="input_form__field_entry" id="username_form-username" name="username_form-username" required size="32" type="text" value="test_User_01">' in html  # noqa
    assert '<input autocomplete="email" class="input_form__field_entry" id="email_form-email" name="email_form-email" required size="64" type="text" value="test_user_01@thisiget.com">' in html  # noqa
    assert '<input autocomplete="new-password" class="input_form__field_entry" id="password_form-password" name="password_form-password" required size="256" type="password" value="">' in html  # noqa
    assert '<input autocomplete="new-password" class="input_form__field_entry" id="password_form-repeat_password" name="password_form-repeat_password" required size="256" type="password" value="">' in html  # noqa


def test_account_settings_username(client):
    login(client)
    # First test the default username (note the username hash is generated
    # from a lowercase version of the username)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_username() == 'test_User_01'

    # Change username to "new_user_name"
    res = client.post(
        '/account',
        data={
            'username_form-username': "new_user_name",
            'username_form-submit_username': 'Change',
        },
        follow_redirects=True)

    # Confirm the new user name and success message appears in the form
    html = str(res.data)
    assert '<input autocomplete="username" class="input_form__field_entry" id="username_form-username" name="username_form-username" required size="32" type="text" value="new_user_name">' in html  # noqa
    assert '<span class="input_form__submit_ok_message_text">Username updated</span>' in html  # noqa

    # Confirm the database is updated with the username
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('new_user_name')).first()
    assert user is not None
    assert user.get_username() == 'new_user_name'


def test_account_settings_username_same_user(client):
    login(client)

    # Change username to "new_user_name"
    res = client.post(
        '/account',
        data={
            'username_form-username': "test_User_01",
            'username_form-submit_username': 'Change',
        },
        follow_redirects=True)

    # Confirm the new user name and success message appears in the form
    html = str(res.data)
    assert '<input autocomplete="username" class="input_form__field_entry" id="username_form-username" name="username_form-username" required size="32" type="text" value="test_User_01">' in html  # noqa
    assert '<span class="input_form__submit_ok_message_text">Username updated</span>' not in html  # noqa


def test_account_settings_username_existing_user(client):
    login(client)

    # Change username to "new_user_name"
    res = client.post(
        '/account',
        data={
            'username_form-username': "test_user_02",
            'username_form-submit_username': 'Change',
        },
        follow_redirects=True)

    # Confirm the new user name is unchanged and an error message appears
    html = str(res.data)
    assert '<input autocomplete="username" class="input_form__field_entry" id="username_form-username" name="username_form-username" required size="32" type="text" value="test_User_01">' in html  # noqa
    assert '<span class="input_form__field_error_message">Username already exists.</span>' in html  # noqa

