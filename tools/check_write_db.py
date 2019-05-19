import pathlib
import re
import json
import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Versions, Lessons, Categories, Topics  # noqa


def check_write_db(show=True, write=False):
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
        modified_str = re.sub(
            "([^'])false([^'])", r'\1"False"\2', modified_str)
        modified_str = re.sub("([^'])true([^'])", r'\1"True"\2', modified_str)
        modified_str = re.sub(", *} *$", "}", modified_str)
        modified_str = re.sub(", *}", "}", modified_str)
        modified_str = re.sub(", *]", "]", modified_str)
        return json.loads(modified_str)

    index = index_loader(
        pathlib.Path('./src/Lessons/LessonsCommon/lessonindex.js'))

    def toBool(str):
        if (str.lower() == 'false'):
            return False
        return True

    def check(table, key, value):
        if key not in table.__dict__:
            if show:
                if 'name' in table.__dict__:
                    topic = table
                    lesson = Lessons.query.filter_by(
                        id=topic.lesson_id).first()
                    print(
                        f'Create: {lesson.uid}->{topic.name} - {key}: {value}')
                elif 'topic_id' in table.__dict__:
                    topic = Topics.query.filter_by(id=table.topic_id).first()
                    lesson = Lessons.query.filter_by(
                        id=topic.lesson_id).first()
                    version = table
                    print(
                        f'Create: {lesson.uid}->{topic.name}->'
                        f'{version.uid} - {key}: {value}')
                else:
                    print(f'Create: {table.uid} - {key}: {value}')
            if write:
                # table.__dict__[key] = value
                return True
                # print(table.__dict__[key], value)
            return False

        if table.__dict__[key] != value:
            if show:
                if 'name' in table.__dict__:
                    topic = table
                    lesson = Lessons.query.filter_by(
                        id=topic.lesson_id).first()
                    print(
                        f'Change: {lesson.uid} {topic.name} - '
                        f'{key}: {table.__dict__[key]}   =>  {value}')
                elif 'topic_id' in table.__dict__:
                    topic = Topics.query.filter_by(id=table.topic_id).first()
                    lesson = Lessons.query.filter_by(
                        id=topic.lesson_id).first()
                    version = table
                    print(
                        f'Change: {lesson.uid} {topic.name} {version.uid} - '
                        f'{key}: {table.__dict__[key]}   =>  {value}')
                else:
                    print(
                        f'Change: {table.uid} - '
                        f'{key}: {table.__dict__[key]}   =>  {value}')
            if write:
                return True
            return False
        return False
        # if (key == 'pageType'):
        #     print(table.__dict__[key], value)
        # table.__dict__[key] = value

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

        if check(lesson, 'title', value['title']):
            lesson.title = value['title']
        if check(lesson, 'path', value['path']):
            lesson.path = value['path']
        if check(lesson, 'enabled', toBool(value['enabled'])):
            lesson.enabled = toBool(value['enabled'])
        dependencies = ','.join(value['dependencies'])
        if check(lesson, 'dependencies', dependencies):
            lesson.dependencies = dependencies
        if check(lesson, 'category', category.id):
            lesson.category = category.id

        # Update or Create Topics
        for topic_name, topic_object in value['topics'].items():
            if topic_name == 'dev':
                continue

            topic = Topics.query.filter_by(
                lesson_id=lesson.id, name=topic_name).first()
            if topic is None:
                topic = Topics(lesson_id=lesson.id, name=topic_name)
                db.session.add(topic)

            # Update or Create Versions
            for version_name, version_object in topic_object.items():
                version = db.session.query(Versions).filter_by(
                    topic_id=topic.id, uid=version_name).first()
                if version is None:
                    version = Versions(topic_id=topic.id, uid=version_name)
                    db.session.add(version)
                if 'title' in version_object:
                    if check(version, 'title', version_object['title']):
                        version.title = version_object['title']

                if 'description' in version_object:
                    if check(version,
                             'description', version_object['description']):
                        version.description = version_object['description']

                if 'fullLesson' in version_object:
                    if check(version,
                             'fullLesson',
                             toBool(version_object['fullLesson'])):
                        version.fullLesson = toBool(
                            version_object['fullLesson'])
                if check(version, 'pageType', version_object['type']):
                    version.pageType = version_object['type']
                if write:
                    db.session.commit()

    if write:
        db.session.commit()
