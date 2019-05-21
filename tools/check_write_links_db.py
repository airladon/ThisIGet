import pathlib
import re
import json
import sys
import subprocess
from check_row import check_row
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Versions, Lessons, Categories, Topics, Links, LinkVersions  # noqa
import pdb
def check(show, write, row, key, valueDict, valueKey):
    if (valueKey in valueDict):
        return check_row(show, write, row, key, valueDict[valueKey])
    return False


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


def toBool(str):
    if (str.lower() == 'false'):
        return False
    return True

# #######################################################################
# Initialize
# #######################################################################
print()
print(f'Using database: ${db.engine.url}\n')
show = False
write = False
for arg in sys.argv:
    if (arg == 'show'):
        show = True
    if (arg == 'write'):
        write = True


# #######################################################################
# Lesson Index
# #######################################################################
# Create Index File
# print('Creating lesson index')
index = subprocess.run(['node', './tools/generateLessonIndex.js'])
if index.returncode != 0:
    print(index.stderr)
    raise Exception(f'Error creating index')

# Load index file
index = index_loader(
    pathlib.Path('./src/Lessons/LessonsCommon/lessonindex.js'))

# print('Checking lesson index in database\n')
# Process Index
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

    if check(show, write, lesson, 'title', value, 'title'):
        lesson.title = value['title']
    if check(show, write, lesson, 'path', value, 'path'):
        lesson.path = value['path']
    if 'enabled' in value:
        if check_row(show, write, lesson, 'enabled', toBool(value['enabled'])):
            lesson.enabled = toBool(value['enabled'])
    dependencies = ','.join(value['dependencies'])
    if check_row(show, write, lesson, 'dependencies', dependencies):
        lesson.dependencies = dependencies
    if check_row(show, write, lesson, 'category', category.id):
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
            version = db.session.query(Versions).filter_by(
                topic_id=topic.id, uid=version_name).first()
            if check(show, write, version, 'title', version_object, 'title'):
                    version.title = version_object['title']

            if check(show, write, version,
                     'description', version_object, 'description'):
                version.description = version_object['description']

            if 'fullLesson' in version_object:
                if check_row(show, write, version, 'fullLesson',
                             toBool(version_object['fullLesson'])):
                    version.fullLesson = toBool(
                        version_object['fullLesson'])
            if check(show, write, version, 'pageType', version_object, 'type'):
                version.pageType = version_object['type']
            # if write:
            #     db.session.commit()

# #######################################################################
# Links
# #######################################################################
# Create Links File
print()
# print('Creating link index')
all_links = subprocess.run(['node', './tools/generateLinkIndex.js'])
if all_links.returncode != 0:
    print(all_links.stderr)
    raise Exception(f'Error creating links file')
# print('Checking link index\n')
links = []
with open('./tools/link_index.json') as f:
    links = json.load(f)

for link in links:
    db_link = Links.query.filter_by(url=link['url']).first()
    if db_link is None:
        if show:
            print(f'Create link: {link["url"]}')
        db_link = Links(url=link['url'])
        db.session.add(db_link)
    if check(show, write, db_link, 'pageType', link, 'type'):
        db_link.pageType = link['type']
    if check(show, write, db_link, 'publisher', link, 'publisher'):
        db_link.publisher = link['publisher']
    if check(show, write, db_link, 'author', link, 'author'):
        db_link.author = link['author']

    lesson = Lessons.query.filter_by(
        uid=link['lessonUID'], path=link['lessonPath']).first()
    topic = Topics.query.filter_by(
        lesson_id=lesson.id, name=link['topic']).first()
    version = Versions.query.filter_by(
        topic_id=topic.id, uid=link['versionUID']).first()
    db_link_version = LinkVersions.query.filter_by(
        version_id=version.id, link_id=db_link.id).first()
    if db_link_version is None:
        if show:
            print(f'Create link: {link["url"]}')
        db_link_version = LinkVersions(
            version_id=version.id, link_id=db_link.id)
        db.session.add(db_link_version)

if show:
    print()

if write:
    db.session.commit()
