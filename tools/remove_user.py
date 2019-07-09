# import pathlib
# import json
import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users, LinkRatings, Ratings  # noqa
from app.models import AllRatings, AllLinkRatings, Comment  # noqa

# print(sys.argv[1])
username = sys.argv[1]
user = Users.query.filter_by(username=username).first()

# # Remove link ratings
# user.all_link_ratings.delete()

# print(user.all_link_ratings.all()[1].id)

# user.delete()
db.session.delete(user)
db.session.commit()