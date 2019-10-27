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
        if r.endswith('__replacements__') and file.endswith('png'):
            files.append(pathlib.Path(r) / file)

for f in files:
    name = re.sub('-snap', '', f.stem)
    diff_file = f.parent / f'{name}-diff.png'
    to_replace_file = f.parent / f'{name}.png'
    if diff_file.exists() and to_replace_file.exists():
        copyfile(f, to_replace_file)
        os.remove(f)
        os.remove(diff_file)
    else:
        print(f'Error replacing {f}')
    # print(f) 
    # file_name = re.sub('^./', '', f)
    # file_name = re.sub('/', '--', file_name)
    # copyfile(f, f'{copy_path}/{file_name}')
    # print(f)
