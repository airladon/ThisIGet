import pathlib
import re
import json
import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Versions, Lessons, Categories, Topics  # noqa

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

for key, value in index.items():            # noqa
    # Update or create category row
    category_name = value['path'].split('/')[3]
    category = Categories.query.filter_by(category=category_name).first()
    if category is None:
        category_path = '/'.join(value['path'].split('/')[0:3])
        category = Categories(category=category_name, path=category_path)
        db.session.add(category)

    # Update or Create lesson row
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
    dependencies = ','.join(value['dependencies'])
    if lesson.dependencies != dependencies:
        lesson.dependencies = dependencies
    if (lesson.category) != category.id:
        lesson.category = category.id

    # Update or Create Topic Versions
    for version_name, version_info in value['versions'].items():
        topics = version_info['topics']
        for topic_name in topics:
            topic = Topics.query.filter_by(
                lesson_id=lesson.id, name=topic_name).first()
            if topic is None:
                topic = Topics(lesson_id=lesson.id, name=topic_name)
                db.session.add(topic)
            version = Versions.query.filter_by(
                topic_id=topic.id, uid=version_name).first()
            if version is None:
                version = Versions(topic_id=topic.id, uid=version_name)
                db.session.add(version)

        # if version is None:
        #     version = Versions(lesson_id=lesson.id, uid=version_name)
        #     db.session.add(version)
            if version.title != version_info['title']:
                version.title = version_info['title']
            if version.description != version_info['description']:
                version.description = version_info['description']
            if version.path != version_info['path']:
                version.path = version_info['path']
            if version.onPath != bool(version_info['onPath']):
                version.onPath = bool(version_info['onPath'])

        # # Update or Create Topics
        # # print(version_info['topics'])
        # for topic_name in version_info['topics']:
        #     topic = Topics.query.filter_by(
        #         lesson_id=lesson.id, version_id=version.id, name=topic_name).first()
        #     if topic is None:
        #         topic = Topics(
        #             lesson_id=lesson.id, version_id=version.id, name=topic_name)
        #         db.session.add(topic)

db.session.commit()
# print(value['name'], value['uid'])
