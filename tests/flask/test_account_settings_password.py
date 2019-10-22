import pytest  # noqa: F401
from common import login
import sys
sys.path.insert(0, './app/')
from app.models import db, Users  # noqa E402
from app.tools import hash_str_with_pepper  # noqa E402


def test_account_settings_password(client):
    login(client)
    # First test the default username (note the username hash is generated
    # from a lowercase version of the username)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.check_password('12345678')

    res = client.post(
        '/account',
        data={
            'password_form-password': "asdfasdf",
            'password_form-repeat_password': "asdfasdf",
            'password_form-submit_password': 'Change',
        },
        follow_redirects=True)

    html = str(res.data)

    # Confirm password fields are still blank
    assert '<input autocomplete="new-password" class="input_form__field_entry" id="password_form-password" name="password_form-password" required size="256" type="password" value="">' in html  # noqa
    assert '<input autocomplete="new-password" class="input_form__field_entry" id="password_form-repeat_password" name="password_form-repeat_password" required size="256" type="password" value="">' in html  # noqa

    # Confirm success message appeared
    assert '<span class="input_form__submit_ok_message_text">Password updated</span>' in html  # noqa

    # Confirm password is updated
    assert user.check_password('12345678') is False
    assert user.check_password('asdfasdf')


def test_account_settings_password_different(client):
    login(client)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.check_password('12345678')

    res = client.post(
        '/account',
        data={
            'password_form-password': "asdfasdf",
            'password_form-repeat_password': "asdfasdf1",
            'password_form-submit_password': 'Change',
        },
        follow_redirects=True)

    html = str(res.data)
    # Confirm password fields are still blank
    assert '<input autocomplete="new-password" class="input_form__field_entry" id="password_form-password" name="password_form-password" required size="256" type="password" value="">' in html  # noqa
    assert '<input autocomplete="new-password" class="input_form__field_entry" id="password_form-repeat_password" name="password_form-repeat_password" required size="256" type="password" value="">' in html  # noqa

    # Confirm error message appeared
    assert '<span class="input_form__field_error_message">Field must be equal to password.</span>' in html  # noqa

    # Confirm password did not change
    assert user.check_password('12345678')


def test_account_settings_password_too_short(client):
    login(client)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.check_password('12345678')

    res = client.post(
        '/account',
        data={
            'password_form-password': "asdf",
            'password_form-repeat_password': "asdf",
            'password_form-submit_password': 'Change',
        },
        follow_redirects=True)

    html = str(res.data)
    # Confirm password fields are still blank
    assert '<input autocomplete="new-password" class="input_form__field_entry" id="password_form-password" name="password_form-password" required size="256" type="password" value="">' in html  # noqa
    assert '<input autocomplete="new-password" class="input_form__field_entry" id="password_form-repeat_password" name="password_form-repeat_password" required size="256" type="password" value="">' in html  # noqa

    # Confirm error message appeared
    assert '<span class="input_form__field_error_message">Password must be at least 8 characters</span>' in html  # noqa

    # Confirm password did not change
    assert user.check_password('12345678')
