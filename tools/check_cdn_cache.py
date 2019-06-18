import os
import hashlib
import json
import requests


def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


file_list = {}
for root, dirs, files in os.walk('./app/app/static'):
    for file in files:
        if os.path.isdir(file):
            continue
        if file == '.DS_Store':
            continue
        full_file_path = \
            os.path.join(root, file)
        md5_str = md5(full_file_path)
        file_list[full_file_path.replace('./app/app/static', '')] = md5_str


with open('./app/app/static/hashes.json', 'w') as outfile:
    json.dump(file_list, outfile)


r = requests.get('https://www.thisiget.com/static/hashes.json')

if r.status_code != 200:
    print('hashes do not exist at www.thisiget.com')
    exit()

cdn_hashes = json.loads(r.content)

for file in file_list.keys():
    if file not in cdn_hashes:
        continue

    if file_list[file] != cdn_hashes[file]:
        print(file)
