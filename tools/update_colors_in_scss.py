import re
import os

# Get colors
colors = {}
color_file = open('./tools/colors_to_update.txt');
lines = color_file.readlines();
for line in lines:
    c = re.search(r'(--color.*): #(.*);', line)
    if c:
        colors[c.group(1)] = c.group(2)
color_file.close()

files = []

# r=root, d=directories, f = files
for r, d, f in os.walk('./src'):
    for file in f:
        if file.endswith('scss'):
            files.append(os.path.join(r, file))

for f in files:
    file = open(f, 'r')
    lines = file.readlines()
    file.close()
    new_lines = []
    previous_line = ''
    for line in lines:
        color_search = re.search(r'(.*)var\((--color-[^\)]*)\)(.*)', line)
        if color_search:
            color = color_search.group(2)
            if color not in colors:
                print(f'{color} not defined')
                continue
            new_line = f'{color_search.group(1)}#{colors[color]}' \
                       f'{color_search.group(3)}'

            compare_previous = re.sub(r'#[0-9abcdefABCDEF]*', '', previous_line)
            compare_new_line = re.sub(r'#[0-9abcdefABCDEF]*', '', new_line)
            if compare_previous_line != compare_new_line:
                new_lines.append(new_line)
            else:
                new_lines[-1] = new_line
            new_lines.append(line)
        previous_line = line;


