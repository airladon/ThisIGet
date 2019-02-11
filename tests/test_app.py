import pytest  # noqa: F401
# import os
# import tempfile
import pdb
import sys
sys.path.insert(0, './app/')
from app import app
from app.models import db, Users  # noqa

# @pytest.mark.filterwarnings("DeprecationWarning")
def test1():
    client = app.test_client()

    result = client.get('/')
    # pdb.set_trace()

    # print(result)
    assert result.headers['Set-Cookie'] == 'username=; Path=/'

    assert result.data == b'''<!doctype html>\n\n<html lang="en">\n  <head>\n    <!-- Required meta tags -->\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n    \n    \n  <link rel="stylesheet" type="text/css" href="/static/dist/main.css">\n\n\n    <link rel="stylesheet" href="/static/vendors/bootstrap-reboot.min.css">\n\n    \n    <script src="/static/index.js"></script>\n  </head>\n\n<body>\n  <!--  -->\n  \n    <div id="home"></div>\n\n<script type="text/javascript" src="/static/dist/vendors.js"></script>\n<script type="text/javascript" src="/static/dist/tools.js"></script>\n<script type="text/javascript" src="/static/dist/commonlessons.js"></script>\n\n  <script type="text/javascript" src="/static/dist/main.js"></script>\n\n</body>\n</html>'''


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

