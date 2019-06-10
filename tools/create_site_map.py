import subprocess
import datetime
import os
import re
# import pdb


versions = [];
for root, dirs, files in os.walk("./src/Lessons"):
    for file in files:
        if ('quickReference' in root):
            continue
        if ('boilerplate' in root):
            continue
        if file == 'version.js':
            versions.append(root)

def get_last_edit(file):
    output = subprocess.run(
        ["git", "log", "-1", '--pretty="format:%ci"', file],
        capture_output=True)
    if output.returncode == 0:
        results = output.stdout.decode("utf-8").strip().replace(
            "format:", "").replace('"', '')
        return datetime.datetime.strptime(results, '%Y-%m-%d %H:%M:%S %z')
    return None

pages = [];
for version in versions:
    files = os.listdir(version)
    valid_files = []
    valid_dates = []
    for file in files:
        if file.endswith('scss') \
           or file.endswith('css') \
           or file == 'version.js' \
           or file == 'lesson.js' \
           or file == '.DS_Store' \
           or os.path.isdir(os.path.join(version, file)):
            continue;

        valid_files.append(file)
        valid_dates.append(get_last_edit(os.path.join(version, file)))

    if len(valid_files) == 0:
        continue

    most_recent = (sorted(valid_dates))[-1].strftime("%Y-%m-%dT%H:%M:%S%z")
    lesson = re.sub(r".*\/src\/", '', version)
    pages.append([f'https://www.thisiget.com/{lesson}', most_recent])


def writeURL(f, link, last_mod, changeFreq):
    f.write('  <url>\n')
    f.write(f'   <loc>{link}/</loc>\n')
    f.write(f'   <lastmod>{last_mod}</lastmod>\n')
    f.write(f'   <changefreq>{changeFreq}</changefreq>\n')
    f.write('  </url>\n`;')

with open(os.path.join(os.getcwd(), 'app', 'app', 'static', 'sitemap.xml'), 'w') as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    writeURL(f, 'https://www.thisiget.com', '2019-06-10', 'weekly')

    for page in pages:
        writeURL(f, page[0], page[1], 'weekly')

    f.write('</urlset>\n')

