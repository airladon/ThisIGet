# This file determines which Lessons need to be browser tested and returns
# the string that will be input into the './browser_test.sh' script.
#
# If only a lesson is modified, then only that lesson will be tested.
# If something more generic has been modified, then all lessons will be tested.
import subprocess
from pathlib import Path
import requests
import json
# import pdb

# first check git logs for changed files
master_sha = subprocess.run(
    ['git', 'rev-parse', 'master'],
    stdout=subprocess.PIPE).stdout.decode('utf-8').strip()
current_sha = subprocess.run(
    ['git', 'rev-parse', 'HEAD'],
    stdout=subprocess.PIPE).stdout.decode('utf-8').strip()

diff = subprocess.run(
    ['git', 'diff', '--name-only', master_sha, current_sha],
    stdout=subprocess.PIPE).stdout.decode('utf-8').strip().split('\n')

paths = set()
test_all = False
max_depth = 7

for path in diff:
    p = Path(path)
    parent = str(p.parent)
    # These files are will not trigger browser tests
    if parent.startswith('tools') \
       or parent.startswith('containers') \
       or parent == '.' \
       or path == 'app/app/static/hashes.json' \
       or path == 'tests/flask/app_test.db' \
       or path == 'app/app/templates/base.html' \
       or path == 'app/app/templates/base-dev.html' \
       or path == 'app/app/templates/base-stage.html' \
       or path == 'src/content/common/lessonindex.js' \
       or path == 'src/content/index.js' \
       or path.startswith == 'src/content/boilerplate' \
       or path == 'app/app/app.db':
        continue
    # These files will trigger browser tests
    if parent.startswith('src/content/') and \
       not parent.startswith('src/content/common'):
        jest_string = parent
        if len(parent.split('/')) > max_depth:
            jest_string = '/'.join(parent.split('/')[0:max_depth - 1])
        jest_string += '.*full'
        paths.add(jest_string)
    else:
        # print(f'All: {path}')
        test_all = True

# Next get all files in the static folder and check if they exist in
# the released version of the app
# Skip over commonlessons as the lessonindex will change it, and if
# anything else was changed it will be caught in the git checks
current = {}
subprocess.run(['python', 'create_site_hashes.py'])
with open('./app/app/static/hashes.json', 'r') as current_file:
    current = json.loads(current_file.read())

r = requests.get('https://www.thisiget.com/static/hashes.json')
existing = json.loads(r.content)

for file_name in current.keys():
    md5 = current[file_name]
    if file_name == '/sitemap.xml' \
       or file_name == '/hashes.json' \
       or file_name.startswith('/dist/lessonIndex') \
       or file_name.startswith('/dist/tools') \
       or file_name.startswith('/dist/main') \
       or file_name.startswith('/dist/polyfill') \
       or file_name.startswith('/dist/vendors') \
       or file_name.startswith('/dist/input') \
       or file_name.startswith('/dist/content') \
       or file_name.startswith('/index.js') \
       or file_name.startswith('/index.js.map') \
       or file_name.startswith('/dist/commonlessons'):
        continue
    if file_name not in existing or existing[file_name] != md5:
        if not file_name.startswith('/dist/content'):
            test_all = True
            # print(file_name, file_name not in existing)
            # print(f'All: {file_name}')
            continue
        p = Path(file_name.replace('/dist/', 'src/'))
        parent = str(p.parent)
        jest_string = parent
        if len(parent.split('/')) > max_depth + 1:
            jest_string = '/'.join(parent.split('/')[1:max_depth - 1])
        jest_string += '.*full'
        paths.add(jest_string)

if test_all:
    print('stage.btest.js')
    exit(1)

print(' '.join(paths))

# def exists(path):
#     r = requests.head(path)
#     return r.status_code == requests.codes.ok


# p = Path('app/app/static/dist').glob('**/*')
# files = [x for x in p if x.is_file()]
# i = 0
# for file in files:
#     pathname = str(file.parent).replace(r'app/app', '') + '/' + file.name
#     url = f'https://www.thisiget.com{pathname}'
#     print(url)
#     print(exists(url))
#     i += 1
#     if (i > 5):
#         exit(1)
# # print(files)
# print(len(files))
