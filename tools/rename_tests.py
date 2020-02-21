# import subprocess
import re
from shutil import copyfile
import os
from itertools import chain
import pathlib
import sys

files = []
versions = {}

for r, d, f in os.walk('./src/content'):
    for file in f:
      if file.endswith('btest.js'):
        version_path = pathlib.Path(r).parents[0].as_posix()
        if version_path not in versions:
          versions[version_path] = {}
        if 'tests' not in versions[version_path]:
          versions[version_path]["tests"] = []
        versions[version_path]["tests"].append(pathlib.Path(r) / file)
      if (file == 'version.js'):
        if r not in versions:
          versions[pathlib.Path(r).as_posix()] = {}
        version = open(pathlib.Path(r) / file, "r")
        topic_type = 'generic'
        for line in version:
          if re.match("  type: (.*)", line):
            topic_type = re.sub("  type: *'", "", line)
            topic_type = re.sub(" *' *,", "", topic_type)
        versions[pathlib.Path(r).as_posix()]["version"] = topic_type.strip()

for value in versions.values():
  if 'tests' in value:
    print(value['version'])
    print(value['tests'])
    print('\n')
# errors = []
# for p, f in files:
#   print(p, f)
#   version = open(f, "r")
#   topic_type = 'generic'
#   for line in version:
#     if re.match("  type: (.*)", line):
#       topic_type = re.sub("  type: *'", "", line)
#       topic_type = re.sub(" *' *,", "", topic_type)
#   print(topic_type)
#     # name = re.sub('-snap', '', f.stem)
#     # diff_file = f.parent.parent / '__diff_output__' / f'{name}-diff.png'
#     # to_replace_file = f.parent.parent / f'{name}-snap.png'
#     # # print(diff_file.exists(), diff_file)
#     # if diff_file.exists() and to_replace_file.exists():
#     #     copyfile(f, to_replace_file)
#     #     os.remove(f)
#     #     os.remove(diff_file)
#     #     print(f'{f}')
#     # else:
#     #     errors.append(f)

# for error in errors:
#     print(f'Error replacing {error}')
