import sys
sys.path.insert(0, './app/')
from app import app  # noqa
from app.models import db, Versions, Lessons, Categories, Topics  # noqa


def check_row(show, write, row, key, value):
    if key not in row.__dict__:
        if show:
            print(f'Create {row} - {key}: {value}')
        if write:
            return True
        return False

    if row.__dict__[key] != value:
        if show:
            print(
                f'Change {row} - {key}:  {row.__dict__[key]}   =>  {value}'
            )
        if write:
            return True
        return False
    return False
