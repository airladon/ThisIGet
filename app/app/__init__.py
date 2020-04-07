from flask import Flask
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
from flask_talisman import Talisman
from app.tools import getContent, getTopicIndex, getBuildTime
import os
import logging
from logging.handlers import SMTPHandler

app = Flask(__name__)
app.config.from_object(Config)
SELF = "'self'"


# Setup logging
logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

if app.config['LOGGING'] == 'heroku':
    # gunicorn_logger = logging.getLogger('gunicorn.error')
    # app.logger.handlers = gunicorn_logger.handlers
    # app.logger.setLevel(gunicorn_logger.level)

    # app.logger.setLevel(logging.INFO)
    # stream_handler = logging.StreamHandler()
    # stream_handler.setLevel(logging.INFO)
    # stream_handler.setFormatter(logging.Formatter('%(levelname)s:%(message)s'))
    # app.logger.addHandler(stream_handler)

    if app.config['MAIL_SERVER']:
        auth = None
        if app.config['MAIL_USERNAME'] or app.config['MAIL_PASSWORD']:
            auth = (app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
        secure = None
        # if app.config['MAIL_USE_TLS']:
        #     secure = ()
        mail_handler = SMTPHandler(
            mailhost=(app.config['MAIL_SERVER'], 25),
            fromaddr=app.config['MAIL_SENDER'],
            toaddrs=app.config['ADMIN'],
            subject='This I Get Production ERROR',
            credentials=auth, secure=())
        mail_handler.setLevel(logging.ERROR)
        app.logger.addHandler(mail_handler)
        mail_handler.setFormatter(logging.Formatter(
            '%(asctime)s %(levelname)s: '
            '%(message)s [in %(pathname)s:%(lineno)d]'
        ))

# logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)

# else:
#     app.logger.setLevel(logging.INFO)
#     stream_handler = logging.StreamHandler()
#     stream_handler.setLevel(logging.INFO)
#     app.logger.addHandler(stream_handler)

# Setup Talisman
if not os.environ.get('LOCAL_PRODUCTION') \
   or os.environ.get('LOCAL_PRODUCTION') != 'DISABLE_SECURITY':
    talisman = Talisman(
        app,
        content_security_policy={
            'default-src': SELF,
            'img-src': [
                SELF,
                # "'unsafe-inline'",
                "data:",
                # 'https://syndication.twitter.com/',
            ],
            'script-src': [
                SELF,
                'https://unpkg.com/',
                'https://cdnjs.cloudflare.com',
                'https://cdn.polyfill.io/v2/',
                # 'https://platform.twitter.com/',
                "'unsafe-inline'",          # this needs to be removed later
                "'unsafe-eval'",    # this needs to be removed as well
            ],
            # 'frame-src': [
            #     SELF,
            #     'https://platform.twitter.com/',
            # ],
            'font-src': [
                SELF,
                'https://cdnjs.cloudflare.com',
                "'unsafe-inline'",          # this needs to be removed later
                'https://fonts.googleapis.com',
                'https://fonts.gstatic.com',
            ],
            'style-src': [
                SELF,
                "'unsafe-inline'",
                "https://fonts.googleapis.com"
            ],
            'style-src-elem': [
                SELF,
                'https://fonts.googleapis.com',
                "'unsafe-inline'",
            ],
            # 'font-src': '*',
        },)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
mail = Mail(app)
static_files = getContent()
build_time = getBuildTime()
topic_index, version_list, link_list = getTopicIndex()

from app import routes, models  # noqa
