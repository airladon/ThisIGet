import sys
sys.path.insert(0, './app/app')
from tools import encrypt    # noqa

print(encrypt(sys.argv[1]))
