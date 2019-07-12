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
       or path == 'src/Lessons/LessonsCommon/lessonIndex.js' \
       or path == 'app/app/app.db':
        continue
    # These files will trigger browser tests
    if parent.startswith('src/Lessons/') and \
       not parent.startswith('src/Lessons/LessonsCommon'):
        jest_string = parent
        if len(parent.split('/')) > max_depth:
            jest_string = '/'.join(parent.split('/')[0:max_depth - 1])
        jest_string += '.*full'
        paths.add(jest_string)
    else:
        print(f'All: {path}')
        test_all = True

# Next get all files in the static folder and check if they exist in
current = {}
subprocess.run(['python', 'create_site_hashes.py'])
with open('./app/app/static/hashes.json', 'r') as current_file:
    current = json.loads(current_file.read())

r = requests.get('https://www.thisiget.com/static/hashes.json')
existing = json.loads(r.content)


for file_name in current.keys():
    md5 = current[file_name]
    if file_name == '/sitemap.xml' \
       or file_name == '/hashes.json':
        continue
    if file_name not in existing or existing[file_name] != md5:
        if not file_name.startswith('/dist/Lessons'):
            test_all = True
            print(f'All: {file_name}')
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
