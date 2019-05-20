# import pathlib
# import re
import json
# import os
import sys
import subprocess
from set_app_env import set_app_env
from check_row import check_row
import pdb
app = sys.argv[-1]
set_app_env(app)

sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Versions, Lessons, Categories, Topics, Links, LinkVersions  # noqa

print(f'Using database: ${db.engine.url}\n')
print('Creating links index\n')

all_links = subprocess.run(['node', './tools/getAllLinks.js'])

if all_links.returncode != 0:
    print(all_links.stderr)
    raise Exception(f'Error creating links file')

links = []
with open('./tools/link_index.json') as f:
    links = json.load(f)

# lessons = Lessons.query.all()
# print(lessons[0])

show = True
write = False


def check(row, key, value):
    return check_row(show, write, row, key, value)


for link in links:
    db_link = Links.query.filter_by(url=link['url']).first()
    if db_link is None:
        if show:
            print(f'Create link: {link["url"]}')
        db_link = Links(url=link['url'])
        db.session.add(db_link)
    if 'type' in link and check(db_link, 'pageType', link['type']):
        db_link.pageType = link['pageType']
    if 'publisher' in link and check(db_link, 'publisher', link['publisher']):
        db_link.type = link['publisher']
    if 'author' in link and check(db_link, 'author', link['author']):
        db_link.type = link['author']

    lesson = Lessons.query.filter_by(uid=link.lessonUID)
    db_link_version = LinkVersions.query.filter_by(link_id=db_link.id, )
