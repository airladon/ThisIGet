# This file determines which Lessons need to be browser tested and returns
# the string that will be input into the './browser_test.sh' script.
#
# If only a lesson is modified, then only that lesson will be tested.
# If something more generic has been modified, then all lessons will be tested.
import subprocess
from pathlib import Path

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
       or parent == '.':
        continue
    # These files will trigger browser tests
    if parent.startswith('src/Lessons/') and \
       not parent.startswith('src/Lessons/LessonsCommon'):
        jest_string = parent
        if len(parent.split('/')) > max_depth:
            jest_string = '/'.join(parent.split('/')[0:max_depth - 1])
        jest_string += '.*stage'
        paths.add(jest_string)
    else:
        test_all = True


if test_all:
    print('stage.btest.js')
else:
    print(' '.join(paths))
