import pathlib
import re
import json
import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Versions, Lessons, Categories, Topics  # noqa


# def check_write_links_db(show=True, write=False):
def get_all_links():
    