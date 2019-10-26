import re
import os

# Get colors
colors = {}
color_file = open('./tools/colors_to_update.txt');
lines = color_file.readlines();
for line in lines:
    c = re.search(r'(--color.*): #(.*);', line)
    if c:
        hex_color = c.group(2)
        if hex_color[0] == hex_color[1] \
            and hex_color[2] == hex_color[3] \
            and hex_color[4] == hex_color[5]:
            hex_color = f'{hex_color[0]}{hex_color[2]}{hex_color[4]}'
        colors[c.group(1)] = hex_color
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
    updated = False
    for line in lines:
        color_search = re.search(r'(.*)var\((--color-[^\)]*)\)(.*)', line)
        if color_search:
            color = color_search.group(2)
            if color not in colors:
                print(f'{color} not defined')
                continue
            new_line = f'{color_search.group(1)}#{colors[color]}' \
                       f'{color_search.group(3)}\n'

            compare_prev = re.sub(r'#[0-9abcdefABCDEF]*', '', previous_line)
            compare_new = re.sub(r'#[0-9abcdefABCDEF]*', '', new_line)
            if new_line != previous_line:
                updated = True
                if compare_prev != compare_new:
                    new_lines.append(new_line)
                else:
                    new_lines[-1] = new_line
        new_lines.append(line)
        previous_line = line
    if updated:
        file = open(f, 'w')
        file.writelines(new_lines)
        file.close()

