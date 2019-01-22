from app import app  # noqa
from app.models import db, User, Rating, Category, Comment, Lesson

# from app.util import assets  # noqa


@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Rating': Rating,
        'Category': Category,
        'Comment': Comment,
        'Lesson': Lesson,
    }
