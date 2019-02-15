import datetime
import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users, Ratings, Lessons, Topics, Versions  # noqa
from app.models import AllRatings  # noqa


def addUser(username, email, password):
    user = Users.query.filter_by(username=username).first()
    if user is None:
        print(f'Adding {username}')
        user = Users(username=username)
        user.set_email(email)
        user.set_password(password)
        user.signed_up_on = datetime.datetime.now()
        user.confirmed = True
        user.confirmed_on = datetime.datetime.now()
        db.session.add(user)
        db.session.commit()


def addRating(lesson_uid, topic_name, version_uid, rating_value, username):
    print(f'''Adding Rating {lesson_uid} {topic_name} {version_uid} {rating_value} {username}''')
    lesson = Lessons.query.filter_by(uid=lesson_uid).first()
    if lesson is None:
        return
    topic = Topics.query.filter_by(
        lesson=lesson, name=topic_name).first()
    if topic is None:
        return
    version = Versions.query.filter_by(
        topic_id=topic.id, uid=version_uid).first()
    if version is None:
        return
    user = Users.query.filter_by(username=username).first()
    if user is None:
        return
    rating = Ratings.query.filter_by(user=user, version=version).first()
    if rating is None:
        rating = Ratings(user=user, version=version, rating=rating_value)
        db.session.add(rating)

    generic_rating = AllRatings(
        user=user, version=version, rating=rating_value)
    generic_rating.timestampe = datetime.datetime.now()
    db.session.add(generic_rating)
    db.session.commit()


addUser('airladon', 'airladon@gmail.com', 'asdfasdf')
for i in range(10):
    username = f'test_user_{i:03}'
    email = f'{username}@thisiget.com'
    password = '12345678'
    addUser(username, email, password)

addRating('equilateral_triangles', 'explanation', 'base', 1, 'test_user_000')
addRating('equilateral_triangles', 'explanation', 'base', 2, 'test_user_001')
addRating('equilateral_triangles', 'explanation', 'base', 3, 'test_user_002')
addRating('equilateral_triangles', 'explanation', 'base', 4, 'test_user_003')
addRating('equilateral_triangles', 'explanation', 'base', 5, 'test_user_004')
addRating('equilateral_triangles', 'explanation', 'base', 1, 'test_user_005')
addRating('equilateral_triangles', 'explanation', 'base', 1, 'test_user_006')
addRating('equilateral_triangles', 'explanation', 'base', 3, 'test_user_007')
addRating('equilateral_triangles', 'explanation', 'base', 4, 'test_user_008')
addRating('equilateral_triangles', 'explanation', 'base', 5, 'test_user_009')
