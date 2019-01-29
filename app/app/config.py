import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or \
        'LHKiusdfuhiDkjhsdf7834897h8y7923'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # ADMINS = os.environ.get('MAIL_SENDER')

    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'smtp.gmail.com'
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME') or 'noreply@thisiget.com'
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_SENDER = os.environ.get('MAIL_SENDER') or 'noreply@thisiget.com'
