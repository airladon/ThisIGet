import re
import os


# color = (101, 0, 0)
color = '#f00'
input_path = './assets/originals'
output_path = './assets/converted'


def convert_file(file_path, color, output_path=None):
    file_root, file_name = os.path.split(file_path)
    if output_path is None:
        output_path = file_root
    color_hex = '#000'
    if type(color) == str:
        if color[0] == '#':
            if len(color) == 4:
                color_hex = (f'#{color[1]}{color[1]}{color[2]}{color[2]}'
                             f'{color[3]}{color[3]}')
            else:
                color_hex = color
    else:
        color_hex = '#%02x%02x%02x' % color

    svg = ''
    with open(file_path, "r") as f:
        svg = f.read()

    new_svg = re.sub(r'rgb\([^\)]*\)',
                     f'rgb({int(color_hex[1:3], 16)}, '
                     f'{int(color_hex[3:5], 16)}, '
                     f'{int(color_hex[5:], 16)}) ', svg)

    output_file = os.path.join(
        output_path, f'{file_name[:-4]}_{color_hex[1:]}')

    with open(f'{output_file}.svg', 'w') as f:
        f.write(new_svg)


if os.path.isfile(input_path):
    convert_file(input_path, color, output_path)
    exit()

# Otherwise, its a directory
for root, dirs, files in os.walk(input_path):
    for file in files:
        if os.path.isdir(file):
            continue
        # print(file, os.path.splitext(file))
        if os.path.splitext(file)[1] != '.svg':
            continue

        convert_file(os.path.join(root, file), color, output_path)
