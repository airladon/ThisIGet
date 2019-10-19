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

