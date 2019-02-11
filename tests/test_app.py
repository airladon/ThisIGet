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


def login(client, username, password):
    return client.post('/login', data=dict(
        username_or_email=username,
        password=password
    ), follow_redirects=True)


def test_login(client):
    # result = client.get('/login')
    assert client.get('/login').status_code == 200
    pdb.set_trace()
    res = client.post('/login', data=dict(
        username_or_email=os.environ.get('TEST_USERNAME'),
        password=os.environ.get('TEST_PASSWORD'),
        submit=True), follow_redirects=True)

    # res = login(client, 'airladon', 'asdfasdf')
    # result = client.get('/')
    # pdb.set_trace()

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

