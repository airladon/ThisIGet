import pathlib
import re
import json
import os
import sys
from set_app_env import set_app_env

app = sys.argv[-1]

# if 'DATABASE_URL' in os.environ:
#     print(os.environ['DATABASE_URL'])
# else:
#     print('DATABASE_URL not set')
# print()
set_app_env(app)
# print()
# print(os.environ['DATABASE_URL'])

sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Versions, Lessons, Categories, Topics  # noqa

print(db.engine.url)
