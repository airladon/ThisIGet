import pytest  # noqa: F401
import sys
# import pdb
sys.path.insert(0, './app/')
from app.models import db, Users  # noqa E402
from app.models import VersionRatings, VersionRatingsCache  # noqa E402
from app.models import LinkRatings, LinkRatingsCache  # noqa E402
# from app.models import AllRatings, AllLinkRatings # noqa E402
from app.tools import hash_str_with_pepper  # noqa E402

topic1 = 'Math/Geometry_1/Introduction/explanation/base'
topic2 = 'Math/Geometry_1/Circle'
version2a = f'{topic2}/explanation/base'
version2b = f'{topic2}/summary/base'
link_1_path = 'Math/Geometry_1/RightAngleTriangles/links/base'
link_1_hash = '0d0bf3df02ca4f1cae21e8ee0fc2f2c5'


def login(
        client,
        username='test_user_01',
        password='12345678'):
    return client.post('/login', data=dict(
        username_or_email=username,
        password=password
    ))


def logout(client):
    return client.get('/logout')


@pytest.fixture(autouse=True)
def run_around_tests(client):
    logout(client)
    login(client)
    VersionRatings.query.delete()
    yield
    logout(client)
    VersionRatings.query.delete()


def test_set_rating(client):
    # Initially there should be no ratings for this user
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_User_01'.lower())).first()
    assert user.version_ratings.all() == []
    # user_id = user.id

    # Create the rating
    res = client.get(f'/setVersionRating/{topic1}?rating=4').get_json()
    assert res['status'] == 'ok'

    # Check the rating is 4
    rating = VersionRatings.query.filter_by(user=user).first()
    assert rating.rating == 4
    # time = rating.timestamp

    # Overwrite the rating to 3
    res = client.get(f'/setVersionRating/{topic1}?rating=3').get_json()
    assert res['status'] == 'ok'
    rating = VersionRatings.query.filter_by(user=user).first()
    assert rating.rating == 3

    # Test Cache
    ratings = VersionRatingsCache.query.first()
    assert ratings.num_ratings == 1
    assert ratings.ave_rating == 3
    assert ratings.high_ratings == 0


def test_get_rating(client):
    res = client.get(f'/setVersionRating/{topic1}?rating=4').get_json()
    assert res['status'] == 'ok'
    res = client.get(f'/getVersionRating/{topic1}').get_json()
    assert res['status'] == 'ok'
    assert res['rating'] == {
        'num': 1,
        'high': 1,
        'ave': 4,
        'user': 4,
    }


def test_get_rating_logged_out(client):
    res = client.get(f'/setVersionRating/{topic1}?rating=4').get_json()
    assert res['status'] == 'ok'
    logout(client)
    res = client.get(f'/getVersionRating/{topic1}').get_json()
    assert res['status'] == 'ok'
    assert res['rating'] == {
        'num': 1,
        'high': 1,
        'ave': 4,
        'user': 'not logged in',
    }


def test_get_topic_ratings(client):
    client.get(f'/setVersionRating/{version2a}?rating=4').get_json()
    client.get(f'/setVersionRating/{version2b}?rating=3').get_json()
    res = client.get(f'getTopicRatings/{topic2}').get_json()
    assert len(res['ratings']) == 2
    assert res['ratings']['explanation']['base']['user'] == 4
    assert res['ratings']['summary']['base']['user'] == 3


def test_ratings_cache(client):
    # Initially there should be no ratings for this user
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_User_01'.lower())).first()
    assert user.version_ratings.all() == []

    res = client.get(f'/setVersionRating/{topic1}?rating=4').get_json()
    assert res['status'] == 'ok'

    logout(client)

    login(client, 'test_User_02')
    res = client.get(f'/setVersionRating/{topic1}?rating=2').get_json()
    assert res['status'] == 'ok'

    # Test Cache
    ratings = VersionRatingsCache.query.first()
    assert ratings.num_ratings == 2
    assert ratings.ave_rating == 3
    assert ratings.high_ratings == 1


def test_set_link_rating(client):
    # Initially there should be no ratings for this user
    # user = Users.query.filter_by(username='test_User_01').first()
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper('test_User_01'.lower())).first()
    assert user.link_ratings.all() == []

    # Create the rating
    res = client.get(
        f'/setLinkRating/{link_1_path}?hash={link_1_hash}&rating=4').get_json()
    assert res['status'] == 'ok'

    # Check the rating is 4
    rating = LinkRatings.query.filter_by(user=user).first()
    assert rating.rating == 4
    # time = rating.timestamp

    # Overwrite the rating to 3
    res = client.get(
        f'/setLinkRating/{link_1_path}?hash={link_1_hash}&rating=3').get_json()
    rating = LinkRatings.query.filter_by(user=user).first()
    assert rating.rating == 3

    # Test Cache
    ratings = LinkRatingsCache.query.first()
    assert ratings.num_ratings == 1
    assert ratings.ave_rating == 3
    assert ratings.high_ratings == 0


def test_link_ratings_cache(client):
    client.get(
        f'/setLinkRating/{link_1_path}?hash={link_1_hash}&rating=4').get_json()
    logout(client)
    login(client, 'test_User_02')
    client.get(
        f'/setLinkRating/{link_1_path}?hash={link_1_hash}&rating=2').get_json()

    ratings = VersionRatingsCache.query.first()
    assert ratings.num_ratings == 2
    assert ratings.ave_rating == 3
    assert ratings.high_ratings == 1


def test_set_rating_not_logged_in(client):
    logout(client)
    res = client.get(f'/setVersionRating/{topic1}?rating=4').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'not logged in'


def test_set_link_rating_not_logged_in(client):
    logout(client)
    res = client.get(
        f'/setLinkRating/{link_1_path}?hash={link_1_hash}&rating=3').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'not logged in'


def test_set_rating_wrong_input(client):
    res = client \
        .get(f'/setVersionRating/invalid/explanation/base?&rating=3') \
        .get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'path does not exist'

    res = client.get(f'/setVersionRating/{topic1}?rating=a').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'invalid rating'

    res = client.get(f'/setVersionRating/{topic1}?rating1=3').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'no rating'

    res = client.get(f'/setVersionRating/{topic1}').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'no rating'


def test_set_link_rating_wrong_input(client):
    res = client \
        .get(f'/setLinkRating/{link_1_path}a?hash={link_1_hash}&rating=4') \
        .get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'path does not exist'

    res = client \
        .get(f'/setLinkRating/{link_1_path}?hash={link_1_hash}a&rating=4') \
        .get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'invalid link hash'

    res = client \
        .get(f'/setLinkRating/{link_1_path}?hash={link_1_hash}') \
        .get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'no rating'

    res = client \
        .get(f'/setLinkRating/{link_1_path}?hash={link_1_hash}a&rating=6') \
        .get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'invalid rating'
