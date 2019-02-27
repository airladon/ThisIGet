from flask import Flask
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
from flask_talisman import Talisman
import os

app = Flask(__name__)
app.config.from_object(Config)
SELF = "'self'"
if not os.environ.get('LOCAL_PRODUCTION') \
   or os.environ.get('LOCAL_PRODUCTION') != 'DISABLE_SECURITY':
    talisman = Talisman(
        app,
        content_security_policy={
            'default-src': SELF,
            'img-src': '*',
            'script-src': [
                SELF,
                'https://unpkg.com/',
            ],
            'style-src': [
                SELF,
                "'unsafe-inline'",
            ],
        },)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
mail = Mail(app)

from app import routes, models  # noqa
