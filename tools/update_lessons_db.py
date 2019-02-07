import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users, Rating, Category, Comment, Lesson
import pathlib
import re
import json

user = Users.query.filter_by(username='airladon').first()
# print(user.username)

def json_loader(file):
    f = open(file.as_posix())
    details_str = f.read()
    start = re.search(r'\nvar details *=', details_str)
    stop = re.search(r'\n};', details_str)
    details_str = details_str[start.span()[1]:stop.span()[0] + 2]
    modified_str = re.sub("'", '"', details_str)
    modified_str = re.sub(r"([^' ]*):", r'"\1":', modified_str)
    modified_str = re.sub("\n", "", modified_str)
    modified_str = re.sub("([^'])false([^'])", r'\1"false"\2', modified_str)
    modified_str = re.sub(", *} *$", "}", modified_str)
    modified_str = re.sub(", *}", "}", modified_str)
    modified_str = re.sub(", *]", "]", modified_str)
    # print(modified_str)
    return json.loads(modified_str)


keep_out = ['boilerplate', 'LessonsCommon']
def iter_path(path):
    p = pathlib.Path(path)
    for x in p.iterdir():
        if x.is_dir() and x.name not in keep_out:
            # print(x.as_posix())
            iter_path('./' + x.as_posix())
        else:
            if x.name == 'details.js':
                details = json_loader(x)
                lesson = Lesson(lesson_name=details['title'], lesson_uid=details['uid'])
                print(lesson)
                db.session.add(lesson)
                # print(details)

            # if x.name == 'version.js':
            #     details = json_loader(x)
            #     print(details)
Lesson.query.delete()
iter_path('./src/Lessons')
db.session.commit()


# p = pathlib.Path('./src/Lessons')
# for x in p.iterdir():
#     if x.is_dir() and x.name not in keep_out:
#         print(x)

# [print(x) for x in p.iterdir() if x.is_dir()]
# # print(p)
