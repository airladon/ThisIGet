import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Users, Versions, Lessons
import pathlib
import re
import json
import pdb

# user = Users.query.filter_by(username='airladon').first()
# print(user.username)


# def json_loader(file):
#     f = open(file.as_posix())
#     details_str = f.read()
#     start = re.search(r'\nvar details *=', details_str)
#     stop = re.search(r'\n};', details_str)
#     details_str = details_str[start.span()[1]:stop.span()[0] + 2]
#     modified_str = re.sub(r"new LessonDescription\(", '', details_str)
#     modified_str = re.sub(r"} *\) *,", '|,', modified_str)
#     modified_str = re.sub("'", '"', modified_str)
#     modified_str = re.sub(r"([^' ]*):", r'"\1":', modified_str)
#     modified_str = re.sub("\n", "", modified_str)
#     modified_str = re.sub("([^'])false([^'])", r'\1"false"\2', modified_str)
#     modified_str = re.sub("([^'])true([^'])", r'\1"true"\2', modified_str)
#     modified_str = re.sub(", *} *$", "}", modified_str)
#     modified_str = re.sub(", *}", "}", modified_str)
#     modified_str = re.sub(", *]", "]", modified_str)
#     return json.loads(modified_str)


# keep_out = ['boilerplate', 'LessonsCommon']


# def iter_path(path):
#     p = pathlib.Path(path)
#     for x in p.iterdir():
#         if x.is_dir() and x.name not in keep_out:
#             iter_path('./' + x.as_posix())
#         else:
#             if x.name == 'details.js':
#                 details = json_loader(x)
#                 lesson = Lesson(lesson_name=details['title'], lesson_uid=details['uid'])
#                 print(lesson)
#                 db.session.add(lesson)

#             # if x.name == 'version.js':
#             #     details = json_loader(x)
#             #     print(details)


# Lesson.query.delete()
# iter_path('./src/Lessons')
# db.session.commit()


def index_loader(file):
    f = open(file.as_posix())
    details_str = f.read()
    start = re.search(r'\n  const *lessonIndex *= *', details_str)
    stop = re.search(r'\n  };\n', details_str)
    details_str = details_str[start.span()[1]:stop.span()[0] + 4]
    modified_str = re.sub(r"new LessonDescription\(", '', details_str)
    modified_str = re.sub(r"} *\) *,", '},', modified_str)
    modified_str = re.sub("'", '"', modified_str)
    modified_str = re.sub(r"([^' ]*):", r'"\1":', modified_str)
    modified_str = re.sub("\n", "", modified_str)
    modified_str = re.sub("([^'])false([^'])", r'\1"False"\2', modified_str)
    modified_str = re.sub("([^'])true([^'])", r'\1"True"\2', modified_str)
    modified_str = re.sub(", *} *$", "}", modified_str)
    modified_str = re.sub(", *}", "}", modified_str)
    modified_str = re.sub(", *]", "]", modified_str)
    return json.loads(modified_str)

index = index_loader(pathlib.Path('./src/Lessons/index.js'))

for key, value in index.items():
    lesson = Lessons.query.filter_by(uid=value['uid']).first()
    if lesson is None:
        lesson = Lessons(uid=value['uid'])
        db.session.add(lesson)
    if lesson.name != value['name']:
        lesson.name = value['name']
    if lesson.path != value['path']:
        lesson.path = value['path']
    if lesson.enabled != bool(value['enabled']):
        lesson.enabled = bool(value['enabled'])
db.session.commit()
    # print(value['name'], value['uid'])
