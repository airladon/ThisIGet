import sys
sys.path.insert(0, './app/app')
from tools import check_peppered_hash    # noqa

if len(sys.argv) == 3:
    print(check_peppered_hash(sys.argv[1], sys.argv[2]))
else:
    print('usage:\n      check_peppered_hash <PLAIN_TEXT> <HASH_TO_CHECK>')
