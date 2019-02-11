import pytest  # noqa: F401
import os
import tempfile
import sys
sys.path.insert(0, './app/')
from app import app
from app.models import db, Users  # noqa

def test1():
    app.

# @pytest.fixture
# def client():
#     db, app.app.config['DATABASE'] = tempfile.mkstemp()
#     # app.app.config['TESTING'] = True
#     client = app.app.test_client()

#     with flaskr.app.app_context():
#         flaskr.init_db()

#     yield client

#     os.close(db_fd)
#     os.unlink(flaskr.app.config['DATABASE'])

