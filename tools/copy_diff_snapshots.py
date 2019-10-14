# import subprocess
import re
from shutil import copyfile
import os
from itertools import chain
import pathlib
import sys

copy_path = './temp'
if len(sys.argv) > 1:
    copy_path = sys.argv[1]

pathlib.Path(copy_path).mkdir(parents=True, exist_ok=True)


if not os.path.isdir('./temp'):
    os.mkdir('./temp')
files = []

# r=root, d=directories, f = files
for r, d, f in chain.from_iterable(
        os.walk(path) for path in ['./src', './tests']):
    for file in f:
        if r.endswith('__diff_output__') and file.endswith('png'):
            files.append(os.path.join(r, file))

for f in files:
    # print(f)
    file_name = re.sub('^./', '', f)
    file_name = re.sub('/', '--', file_name)
    copyfile(f, f'{copy_path}/{file_name}')
    print(f)
