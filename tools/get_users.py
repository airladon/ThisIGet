import sys
import datetime
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users # noqa

# User is the name of table that has a column name
users = Users.query.all()

print(f'Number of users: {len(users)}')
for user in users:
    print (user.username[0:10], user.signed_up_on, user.confirmed)
