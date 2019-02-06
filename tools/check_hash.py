import sys
sys.path.insert(0, './app/app')
from tools import check_hash    # noqa

print(check_hash(sys.argv[1], sys.argv[2]))
