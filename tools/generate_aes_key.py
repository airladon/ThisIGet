import sys
sys.path.insert(0, './app/app')
from tools import generate_aes_key    # noqa

print(generate_aes_key())
