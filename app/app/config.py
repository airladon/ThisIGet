import os


class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or \
        'LHKiusdfuhiDkjhsdf7834897h8y7923'
