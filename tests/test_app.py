import pytest  # noqa: F401
import os
basedir = os.path.abspath(os.path.dirname(__file__))
# import tempfile
import pdb
import sys
sys.path.insert(0, './app/')
from app import app
from app.models import db, Users  # noqa


# @pytest.fixture
# def client():
#     app.config['SQLALCHEMY_DATABASE_URI'] = \
#         'sqlite:///' + os.path.join(basedir, 'app_test.db')
#     app.config['WTF_CSRF_ENABLED'] = False
#     # ctx = app.app_context()
#     # ctx.push()

#     # def teardown():
#     #     ctx.pop()

#     # request.addfinalizer(teardown)
#     # return app

#     client = app.test_client()

#     yield client

def login(client, username='valid', password='valid', follow_redirects=True):
    if username == 'valid':
        username = os.environ.get('TEST_USERNAME') or 'test_User_01'
    if password == 'valid':
        password = os.environ.get('TEST_PASSWORD') or '12345678'
    return client.post('/login', data=dict(
        username_or_email=username,
        password=password
    ), follow_redirects=follow_redirects)


def logout(client):
    return client.get('/logout')

def test_root_page_cookie(client):
    result = client.get('/')
    assert result.headers['Set-Cookie'] == 'username=; Path=/'


def test_correct_login_after_redirect(client):
    # assert client.get('/login').status_code == 200
    res = login(client)
    assert res.status_code == 200
    assert 'username=test_User_01' in res.headers['Set-Cookie']
    assert 'Path=/' in res.headers['Set-Cookie']
    assert 'id="home"' in str(res.data)


@pytest.mark.parametrize("username,password,location", [
    ('valid', 'valid', 'https://localhost/'),
    ('invalid', 'valid', 'https://localhost/login'),
    ('valid', 'invalid', 'https://localhost/login'),
    ('invalid', 'invalid', 'https://localhost/login'),
])
def test_login(client, username, password, location):
    res = login(client, username, password, follow_redirects=False)
    assert res.status_code == 302
    assert res.headers['Location'] == location
    res = logout(client)
