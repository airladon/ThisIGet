import datetime
import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users, VersionRatings # noqa
from app.tools import hash_str_with_pepper  # noqa
from app.routes import update_version_rating_cache  # noqa


def addUser(username, email, password):
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()
    if user is None:
        print(f'Adding {username}')
        user = Users()
        user.set_username(username)
        user.set_email(email)
        user.set_password(password)
        user.signed_up_on = datetime.datetime.now()
        user.confirmed = True
        user.confirmed_on = datetime.datetime.now()
        db.session.add(user)


def addRating(version_uid, rating_value, username):
    print(f'''Adding Rating {version_uid} {rating_value} {username}''')
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()
    if user is None:
        return
    rating = VersionRatings(
        user=user, version_uid=version_uid, rating=rating_value)
    db.session.add(rating)


for i in range(10):
    username = f'test_user_{i:03}'
    email = f'{username}@thisiget.com'
    if (i == 2):
        email = 'noreply@thisiget.com'
    password = '12345678'
    addUser(username, email, password)

addRating('Math/Geometry_1/Equilateral/explanation/base', 1, 'test_user_001')
addRating('Math/Geometry_1/Equilateral/explanation/base', 2, 'test_user_002')
addRating('Math/Geometry_1/Equilateral/explanation/base', 3, 'test_user_003')
addRating('Math/Geometry_1/Equilateral/explanation/base', 4, 'test_user_004')
addRating('Math/Geometry_1/Equilateral/explanation/base', 5, 'test_user_005')
addRating('Math/Geometry_1/Equilateral/explanation/base', 1, 'test_user_006')
addRating('Math/Geometry_1/Equilateral/explanation/base', 2, 'test_user_007')
addRating('Math/Geometry_1/Equilateral/explanation/base', 3, 'test_user_008')
addRating('Math/Geometry_1/Equilateral/explanation/base', 4, 'test_user_009')
addRating('Math/Geometry_1/Equilateral/explanation/base', 5, 'test_user_009')
update_version_rating_cache('Math/Geometry_1/Equilateral/explanation/base')
db.session.commit()
