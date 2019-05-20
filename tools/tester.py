import pathlib
import re
import json
import os
import sys
import subprocess
from set_app_env import set_app_env
from check_row import check_row
import pdb
app = sys.argv[-1]
set_app_env(app)
# print(os.environ['DATABASE_URL'])
sys.path.insert(0, './app/')

subprocess.run(['python', 'tools/check_write_links_db.py', 'dev'])