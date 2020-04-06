import sys
import datetime
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users # noqa

# User is the name of table that has a column name
users = Users.query.filter(Users.username_hash!='deleted account').all()
deleted_accounts = Users.query.filter(Users.username_hash=='deleted account').all()

for user in users:
    if user.username_hash != 'deleted account':
      print('{:<10}{:<30}{:<40}{:<40}{:<5}'.format(user.id, user.get_username(), user.get_email(), str(user.signed_up_on), str(user.confirmed)))

print(f'Number of users: {len(users)}')
print(f'Number of deleted accounts: {len(deleted_accounts)}')