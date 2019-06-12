import re


def convert_file(file_name, color):
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
    with open(file_name, "r") as f:
        svg = f.read()

    new_svg = re.sub(r'rgb\([^\)]*\)',
                     f'rgb({color[0]},{color[1]},{color[2]})', svg)

    with open(f'{file_name[:-4]}_{color_hex[1:]}.svg', 'w') as f:
        f.write(new_svg)


file_name = './assets/icons/presentation.svg'
color = (255, 255, 255)

convert_file(file_name, color)
