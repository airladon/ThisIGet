import pytest  # noqa: F401
import sys
# import pdb
sys.path.insert(0, './app/')
from app.models import db, Users, Ratings  # noqa E402

lesson1 = 'why_study_shapes/explanation/base'
lesson2 = 'circles/explanation/base'


def login(
        client,
        username='test_User_01',
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
    Ratings.query.delete()
    yield
    logout(client)
    Ratings.query.delete()


def test_set_rating(client):
    # Initially there should be no ratings for this user
    user = Users.query.filter_by(username='test_User_01').first()
    assert user.ratings.all() == []
    user_id = user.id

    # Create the rating
    res = client.get(f'/rate/{lesson1}/4').get_json()
    assert res['status'] == 'done'

    # Check the rating is 4
    rating = Ratings.query.filter_by(user_id=user_id).first()
    assert rating.rating == 4
    # time = rating.timestamp

    # Overwrite the rating to 3
    res = client.get(f'/rate/{lesson1}/3').get_json()
    assert res['status'] == 'done'
    rating = Ratings.query.filter_by(user_id=user_id).first()
    assert rating.rating == 3
    # assert rating.timestamp > time


def test_set_rating_not_logged_in(client):
    logout(client)
    res = client.get(f'/rate/{lesson1}/4').get_json()
    assert res['status'] == 'not logged in'


def test_set_rating_wrong_input(client):
    res = client.get(f'/rate/invalid/explanation/base/4').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'lesson does not exist'

    res = client.get(f'/rate/circles/invalid/base/4').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'topic does not exist'

    res = client.get(f'/rate/circles/explanation/invalid/4').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'version does not exist'

    res = client.get(f'/rate/{lesson1}/6)').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'invalid rating'

    res = client.get(f'/rate/{lesson1}/0)').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'invalid rating'

    res = client.get(f'/rate/{lesson1}/a)').get_json()
    assert res['status'] == 'fail'
    assert res['message'] == 'invalid rating'


def test_get_rating(client):
    # Check default values
    res = client.get(f'/rating/{lesson1}').get_json()
    assert res['status'] == 'ok'
    assert res['userRating'] == 'not rated'
    assert res['numRatings'] == 0
    assert res['aveRating'] == 0
    assert res['numHighRatings'] == 0

    # Create the rating
    res = client.get(f'/rate/{lesson1}/5').get_json()
    assert res['status'] == 'done'

    res = client.get(f'/rating/{lesson1}').get_json()
    assert res['status'] == 'ok'
    assert res['userRating'] == 5
    assert res['numRatings'] == 1
    assert res['aveRating'] == 5
    assert res['numHighRatings'] == 1

    # Create a second rating for a different lesson
    logout(client)
    login(client, 'test_User_02')
    res = client.get(f'/rate/{lesson1}/3').get_json()
    assert res['status'] == 'done'

    res = client.get(f'/rating/{lesson1}').get_json()
    assert res['status'] == 'ok'
    assert res['userRating'] == 3
    assert res['numRatings'] == 2
    assert res['aveRating'] == 4
    assert res['numHighRatings'] == 1
