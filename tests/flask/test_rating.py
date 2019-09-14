import pytest  # noqa: F401
import sys
# import pdb
sys.path.insert(0, './app/')
from app.models import db, Users
from app.models import VersionRatings, VersionRatingsCache
from app.models import LinkRatings, LinkRatingsCache
# from app.models import AllRatings, AllLinkRatings # noqa E402
from app.tools import hash_str_with_pepper  # noqa E402

topic1 = 'Math/Geometry_1/Introduction/explanation/base'
topic2 = 'Math/Geometry_1/Circle/explanation/base'
link1 = 'Math/Geometry_1/RightAngleTriangles/links/base/0d0bf3df02ca4f1cae21e8ee0fc2f2c5'


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

# def test_set_link_rating(client):
#     # Initially there should be no ratings for this user
#     # user = Users.query.filter_by(username='test_User_01').first()
#     user = Users.query.filter_by(
#         username_hash=hash_str_with_pepper('test_User_01'.lower())).first()
#     assert user.ratings.all() == []
#     user_id = user.id

#     # Create the rating
#     res = client.get(f'/ratelink/{lesson3}/4').get_json()
#     assert res['status'] == 'done'

#     # Check the rating is 4
#     rating = LinkRatings.query.filter_by(user_id=user_id).first()
#     assert rating.rating == 4
#     # time = rating.timestamp

#     # Overwrite the rating to 3
#     res = client.get(f'/ratelink/{lesson3}/3').get_json()
#     assert res['status'] == 'done'
#     rating = LinkRatings.query.filter_by(user_id=user_id).first()
#     assert rating.rating == 3

#     # Test all Link Ratings
#     all_ratings = AllLinkRatings.query.all()
#     assert len(all_ratings) == 2


# def test_set_rating_not_logged_in(client):
#     logout(client)
#     res = client.get(f'/rate/{lesson1}/4').get_json()
#     assert res['status'] == 'not logged in'


# def test_set_link_rating_not_logged_in(client):
#     logout(client)
#     res = client.get(f'/ratelink/{lesson3}/4').get_json()
#     assert res['status'] == 'not logged in'


# def test_set_rating_wrong_input(client):
#     res = client.get(f'/rate/invalid/explanation/base/4').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'lesson/topic/version does not exist'

#     res = client.get(f'/rate/Circle/invalid/base/4').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'lesson/topic/version does not exist'

#     res = client.get(f'/rate/Circle/explanation/invalid/4').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'lesson/topic/version does not exist'

#     res = client.get(f'/rate/{lesson1}/6)').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'invalid rating'

#     res = client.get(f'/rate/{lesson1}/0)').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'invalid rating'

#     res = client.get(f'/rate/{lesson1}/a)').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'invalid rating'


# def test_set_link_rating_wrong_input(client):
#     # 'RightAngleTriangles/links/base/0d0bf3df02ca4f1cae21e8ee0fc2f2c5'
#     lesson = lesson3.split('/')[0]
#     topic = lesson3.split('/')[1]
#     version = lesson3.split('/')[2]
#     link = lesson3.split('/')[3]
#     res = client.get(
#         f'/ratelink/invalid/{topic}/{version}/{link}/4'
#     ).get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'lesson/topic/version does not exist'

#     res = client.get(
#         f'/ratelink/{lesson}/invalid/{version}/{link}/4').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'lesson/topic/version does not exist'

#     res = client.get(
#         f'/ratelink/{lesson}/{topic}/invalid/{link}/4').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'lesson/topic/version does not exist'

#     res = client.get(
#         f'/ratelink/{lesson}/{topic}/{version}/invalid/4').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'link/version does not exist'

#     res = client.get(f'/ratelink/{lesson3}/6)').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'invalid rating'

#     res = client.get(f'/ratelink/{lesson3}/0)').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'invalid rating'

#     res = client.get(f'/ratelink/{lesson3}/a)').get_json()
#     assert res['status'] == 'fail'
#     assert res['message'] == 'invalid rating'


# def test_get_rating(client):
#     # Check default values
#     res = client.get(f'/rating/{lesson1}').get_json()
#     assert res['status'] == 'ok'
#     assert res['userRating'] == 'not rated'
#     assert res['numRatings'] == 0
#     assert res['aveRating'] == 0
#     assert res['numHighRatings'] == 0

#     # Create the rating
#     res = client.get(f'/rate/{lesson1}/5').get_json()
#     assert res['status'] == 'done'

#     res = client.get(f'/rating/{lesson1}').get_json()
#     assert res['status'] == 'ok'
#     assert res['userRating'] == 5
#     assert res['numRatings'] == 1
#     assert res['aveRating'] == 5
#     assert res['numHighRatings'] == 1

#     # Create a second rating for a different lesson
#     logout(client)
#     login(client, 'test_User_02')
#     res = client.get(f'/rate/{lesson1}/3').get_json()
#     assert res['status'] == 'done'

#     res = client.get(f'/rating/{lesson1}').get_json()
#     assert res['status'] == 'ok'
#     assert res['userRating'] == 3
#     assert res['numRatings'] == 2
#     assert res['aveRating'] == 4
#     assert res['numHighRatings'] == 1


# def test_get_link_rating(client):
#     LinkRatings.query.delete()
#     # Check default values
#     res = client.get(f'/linkrating/{lesson3}').get_json()
#     assert res['status'] == 'ok'
#     assert res['userRating'] == 'not rated'
#     assert res['numRatings'] == 0
#     assert res['aveRating'] == 0
#     assert res['numHighRatings'] == 0

#     # Create the rating
#     res = client.get(f'/ratelink/{lesson3}/5').get_json()
#     assert res['status'] == 'done'

#     res = client.get(f'/linkrating/{lesson3}').get_json()
#     assert res['status'] == 'ok'
#     assert res['userRating'] == 5
#     assert res['numRatings'] == 1
#     assert res['aveRating'] == 5
#     assert res['numHighRatings'] == 1

#     # Create a second rating for a different lesson
#     logout(client)
#     login(client, 'test_User_02')
#     res = client.get(f'/ratelink/{lesson3}/3').get_json()
#     assert res['status'] == 'done'

#     res = client.get(f'/linkrating/{lesson3}').get_json()
#     assert res['status'] == 'ok'
#     assert res['userRating'] == 3
#     assert res['numRatings'] == 2
#     assert res['aveRating'] == 4
#     assert res['numHighRatings'] == 1
