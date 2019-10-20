import pytest  # noqa: F401
from common import login, logout
import sys
sys.path.insert(0, './app/')
from app.models import db, Users  # noqa E402
from app.tools import hash_str_with_pepper  # noqa E402


def test_account_settings_delete_routing(client):
    login(client)
    # First test the default username (note the username hash is generated
    # from a lowercase version of the username)
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_user_01')).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    res = client.post(
        '/account', data={'delete_form-submit': "Delete"},
        follow_redirects=False)

    assert res.headers['Location'] == 'https://localhost/confirmDelete'


def test_account_settings_delete_delete(client):
    login(client)
    user = Users.query.filter_by(id=1).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    res = client.post(
        '/account', data={'delete_form-submit': "Delete"},
        follow_redirects=True)

    html = str(res.data)
    assert '<title>This I Get - Delete Account</title>' in html  # noqa
    assert res.headers['Set-Cookie'] == 'username=test_User_01; Path=/'

    # Confirm nothing has changed yet
    user = Users.query.filter_by(id=1).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    res = client.post(
        '/confirmDelete', data={'form-submit_delete': "Delete NOW"},
        follow_redirects=True)

    html = str(res.data)
    assert 'We hope to see you again soon' in html
    assert res.headers['Set-Cookie'] == 'username=; Path=/'
    user = Users.query.filter_by(id=1).first()
    assert user.email == ''
    assert user.username_hash == 'deleted account'
    assert user.email_hash == ''
    assert user.password == ''
    assert len(user.username) == 31


def test_account_settings_delete_cancel(client):
    login(client)
    user = Users.query.filter_by(id=1).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    res = client.post(
        '/account', data={'delete_form-submit': "Delete"},
        follow_redirects=True)

    html = str(res.data)
    assert '<title>This I Get - Delete Account</title>' in html  # noqa
    assert res.headers['Set-Cookie'] == 'username=test_User_01; Path=/'

    # Confirm nothing has changed yet
    user = Users.query.filter_by(id=1).first()
    assert user.get_email() == 'test_user_01@thisiget.com'

    res = client.post(
        '/confirmDelete', data={'form-submit_save': "DO NOT delete my account"},
        follow_redirects=True)

    html = str(res.data)
    assert '<title>This I Get - Account Settings</title>' in html  # noqa

    user = Users.query.filter_by(id=1).first()
    assert user.get_email() == 'test_user_01@thisiget.com'
