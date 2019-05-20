import pathlib
import re
import json
import os
import sys
import subprocess
from set_app_env import set_app_env

app = sys.argv[-1]
set_app_env(app)

sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Versions, Lessons, Categories, Topics  # noqa

print(f'Using database: ${db.engine.url}\n')
print('Creating links index\n')

all_links = subprocess.run(['node', './tools/getAllLinks.js'])

if all_links.returncode != 0:
    print(all_links.stderr)
    raise Exception(f'Error creating links file')

links = []
with open('./tools/link_index.json') as f:
    links = json.load(f)

print(links)
