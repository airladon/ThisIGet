import sys
sys.path.insert(0, './app/app')
from tools import decrypt    # noqa

print(decrypt(sys.argv[1]))
