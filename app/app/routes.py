# from flask import Flask, render_template
# from app.util import assets

# app = Flask(__name__)


# @app.route('/')
# def hello_world():
#     return render_template('index.html')


from flask import render_template, flash, redirect, request
from app import app
from app.forms import LoginForm
from flask_login import current_user, login_user, logout_user
from app.models import User
import sys
# import pdb


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/introduction')
def introduction():
    return render_template('introduction.html')


@app.route('/single')
def single_page_lesson():
    return render_template('singlepagelesson.html')


@app.route('/multi')
def multi_page_lesson():
    return render_template('multipagelesson.html')


@app.route('/about')
def about():
    return render_template('about.html')

# @app.route('/Lessons/', defaults={'path': ''})
# @app.route('/Lessons/<path:path>')
# def catch_all(path):
#     return 'You want path: %s' % path


@app.route('/isloggedin')
def is_logged_in():
    result = "0"
    if current_user.is_authenticated:
        result = "1"
    # print('This is error output', file=sys.stderr)
    print(f'Will respond: {result, current_user}', file=sys.stdout)
    return result


@app.route('/Lessons/', defaults={'path': ''})
@app.route('/Lessons/<path:path>')
def get_lesson(path):
    path = f'/static/dist/Lessons/{path}'
    css = f'{path}/lesson.css'
    js = f'{path}/lesson.js'
    return render_template('lesson.html', css=css, js=js)

# @app.route('/Lessons/<subject>/<lesson_id>')
# def get_lesson(subject, lesson_id):
#     print(lesson_id)
#     path = f'/static/dist/Lessons/{subject}/{lesson_id}'
#     css = f'{path}/lesson.css'
#     js = f'{path}/lesson.js'
#     return render_template('lesson.html', css=css, js=js)


@app.route('/favicon.ico')
def icon():
    return app.send_static_file('favicon.ico')


@app.route('/apple-touch-icon-precomposed.png')
@app.route('/apple-touch-icon.png')
def apple_touch_icon():
    return app.send_static_file('icon.png')


@app.route('/lessons/chapter1')
def chapter1():
    return "Chapter 1 Content"


@app.route('/loginuser', methods=['POST'])
def loginuser():
    form = LoginForm()
    user = User.query.filter_by(username=form.username.data).first()
    # print(f'user: {user}, {user.check_password(form.password.data)}')
    if user is None or not user.check_password(form.password.data):
        print('login failed')
        return redirect('/login')
    print('login succeeded')
    # login_user(user, remember=form.remember_me.data)
    login_user(user, True)
    return redirect('/')


@app.route('/login')
def login():
    if current_user.is_authenticated:
        return redirect('/')
    return render_template(
        'login.html',
        css='/static/dist/login.css',
        js='/static/dist/login.js')


@app.route('/create')
def create():
    if current_user.is_authenticated:
        return redirect('/')
    return render_template(
        'login.html',
        css='/static/dist/create.css',
        js='/static/dist/create.js')


@app.route('/reset')
def reset():
    if current_user.is_authenticated:
        return redirect('/')
    return render_template('login.html')


@app.route('/logout')
def logout():
    logout_user()
    return redirect('/')
