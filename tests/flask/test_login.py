import pytest  # noqa: F401
import os


def login(
        client,
        username='valid',
        password='valid',
        follow_redirects=True,
        next_page=None,
        prepopulate=False):
    if username == 'valid':
        username = os.environ.get('TEST_USERNAME') or 'test_User_01'
    if password == 'valid':
        password = os.environ.get('TEST_PASSWORD') or '12345678'
    login_path = '/login'
    if prepopulate:
        login_path = f'{login_path}/{username}'
    if next_page is not None:
        login_path = f'{login_path}?next={next_page}'
    return client.post(login_path, data=dict(
        username_or_email=username,
        password=password
    ), follow_redirects=follow_redirects)


def logout(client):
    return client.get('/logout')


@pytest.fixture(autouse=True)
def run_around_tests(client):
    logout(client)
    yield
    logout(client)


def test_root_page_cookie(client):
    result = client.get('/')
    assert result.headers['Set-Cookie'] == 'username=; Path=/'


def test_correct_login_after_redirect(client):
    # assert client.get('/login').status_code == 200
    res = login(client)
    assert res.status_code == 200
    print(res.headers['Set-Cookie'])
    assert 'username=test_User_01' in res.headers['Set-Cookie']
    assert 'Path=/' in res.headers['Set-Cookie']
    assert 'id="home"' in str(res.data)
    logout(client)


home_path = 'https://localhost/'
login_path = 'https://localhost/login'
unconfirmed_path = \
    'https://localhost/confirmAccountEmailSent/unconfirmed_user_01'


@pytest.mark.parametrize("username,password,location", [
    # Valid cases
    ('test_User_01', '12345678', home_path),
    ('test_user_01', '12345678', home_path),  # Different case username
    ('TEST_USER_01', '12345678', home_path),  # Different case username
    ('test_user_01@thisiget.com', '12345678', home_path),  # Diff domain case
    ('test_user_01@THISIGET.com', '12345678', home_path),  # Diff domain case
    #
    # Invalid cases
    ('invalid', '12345678', login_path),                    # invalid user
    ('test_User_01', 'invalid', login_path),                # invalid pass
    ('test_user_01@thisiget.com', 'invalid', login_path),   # invalid pass
    ('invalid', 'invalid', login_path),                     # invalid both
    ('test_User_01@thisiget.com', '12345678', login_path),  # Diff user case
    #
    # Unconfirmed user
    ('unconfirmed_user_01', '12345678', unconfirmed_path),
    ('unconfirmed_user_01@thisiget.com', '12345678', unconfirmed_path),
])
def test_login(client, username, password, location):
    # logout(client)
    res = login(client, username, password, follow_redirects=False)
    # pdb.set_trace()
    assert res.status_code == 302
    assert res.headers['Location'] == location
    logout(client)


def test_login_page_forwarding(client):
    path = '/Lessons/Math/Geometry_1/Circle/base/explanation'
    res = login(client, follow_redirects=False, next_page=path)
    assert res.headers['Location'] == f'https://localhost{path}'
    logout(client)


def test_login_username_prepopulation(client):
    res = client.get('/login/test_username')
    assert 'value="test_username"' in str(res.data)
