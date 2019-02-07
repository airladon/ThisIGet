import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users, Rating, Category, Comment, Lesson
import pathlib
import re
import json

user = Users.query.filter_by(username='airladon').first()
print(user.username)

def jsonLoader(file_name):


keep_out = ['boilerplate', 'LessonsCommon']
def iter_path(path):
    p = pathlib.Path(path)
    for x in p.iterdir():
        if x.is_dir() and x.name not in keep_out:
            # print(x.as_posix())
            iter_path('./' + x.as_posix())
        else:
            if x.name == 'details.js':
                f = open(x.as_posix())
                details = f.read()
                start = re.search(r'\nvar details *=', details)
                stop = re.search(r'\n};', details)
                print(details[start.span()[1]:stop.span()[0] + 2])
                print(x.as_posix())
            if x.name == 'version.js':
                print(x.as_posix())
iter_path('./src/Lessons')


# p = pathlib.Path('./src/Lessons')
# for x in p.iterdir():
#     if x.is_dir() and x.name not in keep_out:
#         print(x)

# [print(x) for x in p.iterdir() if x.is_dir()]
# # print(p)
