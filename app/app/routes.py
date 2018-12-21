# from flask import Flask, render_template
# from app.util import assets

# app = Flask(__name__)


# @app.route('/')
# def hello_world():
#     return render_template('index.html')


from flask import render_template
from app import app


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
