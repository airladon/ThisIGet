from flask import Flask
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_mail import Mail
import os

app = Flask(__name__)
app.config.from_object(Config)
# app.config.update({
#     # "MAIL_SERVER": 'smtp.gmail.com',
#     "MAIL_PORT": 465,
#     "MAIL_USE_TLS": False,
#     "MAIL_USE_SSL": True,
#     "MAIL_SERVER": os.environ['MAIL_SERVER'],
#     # "MAIL_PORT": os.environ['MAIL_PORT'],
#     # "MAIL_USE_TLS": os.environ['MAIL_USE_TLS'],
#     # "MAIL_USE_SSL": os.environ['MAIL_USE_SSL'],
#     "MAIL_USERNAME": os.environ['MAIL_USERNAME'],
#     # "MAIL_PASSWORD": 'oiru0Aavlapokj3r20u89HOVS'
#     "MAIL_PASSWORD": os.environ['MAIL_PASSWORD'],
# })
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)
mail = Mail(app)

from app import routes, models  # noqa
from app import initdb
