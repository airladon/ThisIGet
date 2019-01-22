from flask import Flask
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# from app.models import User, Rating, Category, Comment, Lesson

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app import routes, models  # noqa


# @app.shell_context_processor
# def make_shell_context():
#     return {
#         'db': db,
#         'User': User,
#         'Rating': Rating,
#         'Category': Category,
#         'Comment': Comment,
#         'Lesson': Lesson,
#     }
