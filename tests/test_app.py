import pytest  # noqa: F401
import os
basedir = os.path.abspath(os.path.dirname(__file__))
# import tempfile
import pdb
import sys
sys.path.insert(0, './app/')
from app import app
from app.models import db, Users  # noqa


@pytest.fixture
def client():
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app_test.db')
    app.config['WTF_CSRF_ENABLED'] = False
    ctx = app.app_context()
    ctx.push()

    # def teardown():
    #     ctx.pop()

    # request.addfinalizer(teardown)
    # return app

    client = app.test_client()

    yield client


def test_root_page_cookie(client):
    result = client.get('/')
    assert result.headers['Set-Cookie'] == 'username=; Path=/'


# def login(client, username, password):
#     return client.post('/login', data=dict(
#         username_or_email=username,
#         password=password
#     ), follow_redirects=True)


def test_correct_login_before_redirect(client):
    assert client.get('/login').status_code == 200

    res = client.post('/login', data=dict(
        username_or_email=os.environ.get('TEST_USERNAME'),
        password=os.environ.get('TEST_PASSWORD'),
        submit=True), follow_redirects=False)
    assert res.status_code == 302
    assert res.headers['Location'] == 'https://localhost/'


def test_correct_login_after_redirect(client):
    assert client.get('/login').status_code == 200

    res = client.post('/login', data=dict(
        username_or_email=os.environ.get('TEST_USERNAME'),
        password=os.environ.get('TEST_PASSWORD'),
        submit=True), follow_redirects=True)
    assert res.status_code == 200
    assert 'username=airladon' in res.headers['Set-Cookie']
    assert 'Path=/' in res.headers['Set-Cookie']
    assert 'id="home"' in str(res.data)


def test_incorrect_username_login_before_redirect(client):
    assert client.get('/login').status_code == 200

    res = client.post('/login', data=dict(
        username_or_email='non_user',
        password=os.environ.get('TEST_PASSWORD'),
        submit=True), follow_redirects=False)
    assert res.status_code == 302
    assert res.headers['Location'] == 'https://localhost/login'

# @pytest.fixture
# def client():
#     db, app.app.config['DATABASE'] = tempfile.mkstemp()
#     # app.app.config['TESTING'] = True
#     client = app.app.test_client()

#     with flaskr.app.app_context():
#         flaskr.init_db()

#     yield client

#     os.close(db_fd)
#     os.unlink(flaskr.app.config['DATABASE'])

