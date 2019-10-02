import subprocess
import re
from shutil import copyfile
import os

if not os.path.isdir('./temp'):
    os.mkdir('./temp')

status = subprocess.run(
    ['git', 'status'],
    stdout=subprocess.PIPE).stdout.decode('utf-8').strip().split('\n')

png_files = []
for line in status:
    if not line.endswith('png'):
        continue
    f = re.sub('modified: *', '', line).strip()
    file_name = re.sub('/', '-', f)
    copyfile(f, f'./temp/{file_name}')
    png_files.append(f)
