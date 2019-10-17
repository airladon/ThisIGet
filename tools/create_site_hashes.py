import os
import hashlib
import json
from pathlib import Path

static_path = Path(__file__).resolve().parent.parent/'app'/'app'/'static'

def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


file_list = {}
for root, dirs, files in os.walk(static_path):
    for file in files:
        if os.path.isdir(file):
            continue
        if file == '.DS_Store':
            continue
        full_file_path = \
            os.path.join(root, file)
        md5_str = md5(full_file_path)
        file_list[full_file_path.replace(static_path.as_posix(), '')] = md5_str

with open(static_path/'hashes.json', 'w') as outfile:
    json.dump(file_list, outfile)
