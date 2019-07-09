import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users

username = sys.argv[1]
user = Users.query.filter_by(username=username).first()
if user is not None:
    print()
    confirm = input(f'Are you sure you want to delete user {username} and all their ratings from database <{app.config["SQLALCHEMY_DATABASE_URI"]}>? (y/n): ')
    print()
    if confirm == 'y' or confirm == 'Y':
        db.session.delete(user)
        db.session.commit()
        print(f'User {username} deleted.')
    else:
        print(f'User {username} not deleted.')
else:
    print(f'No user {username} found.')

print()
