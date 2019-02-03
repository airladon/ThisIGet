import sys
sys.path.insert(0, './app/app')
from tools import generate_pepper    # noqa

iterations = 12
if len(sys.argv) > 1:
    iterations = sys.argv[1]

print(generate_pepper(iterations))
