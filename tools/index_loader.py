import re
import json
import sys
from check_row import check_row
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Versions, Lessons, Categories, Topics, Links, LinkVersions  # noqa


def check(show, write, row, key, valueDict, valueKey):
    if (valueKey in valueDict):
        return check_row(show, write, row, key, valueDict[valueKey])
    return False


def index_loader(file):
    f = open(file.as_posix())
    details_str = f.read()
    start = re.search(r'\n  const *lessonIndex *= *', details_str)
    stop = re.search(r'\n  };\n', details_str)
    details_str = details_str[start.span()[1]:stop.span()[0] + 4]
    modified_str = re.sub(r"new LessonDescription\(", '', details_str)
    modified_str = re.sub(r"} *\) *,", '},', modified_str)
    modified_str = re.sub("'", '"', modified_str)
    modified_str = re.sub(r"\n *([^' ]*):", r'"\1":', modified_str)
    modified_str = re.sub("\n", "", modified_str)
    modified_str = re.sub(
        "([^'])false([^'])", r'\1"False"\2', modified_str)
    modified_str = re.sub("([^'])true([^'])", r'\1"True"\2', modified_str)
    modified_str = re.sub(", *} *$", "}", modified_str)
    modified_str = re.sub(", *}", "}", modified_str)
    modified_str = re.sub(", *]", "]", modified_str)
    return json.loads(modified_str)
