# from flask import Flask, render_template
# from app.util import assets

# app = Flask(__name__)


# @app.route('/')
# def hello_world():
#     return render_template('index.html')


from flask import render_template, flash, redirect, url_for, jsonify, session
from flask import make_response, request
from app import app, db
from app.forms import LoginForm, CreateAccountForm, ResetPasswordRequestForm
from app.forms import ResetPasswordForm, ConfirmAccountMessageForm
from flask_login import current_user, login_user, logout_user
from app.email import send_password_reset_email, send_confirm_account_email
import datetime
# from sqlalchemy import func
from app.tools import hash_str_with_pepper
from app.models import Users
from app.models import Ratings, AllRatings
from app.models import Lessons, Versions, Topics
# from functools import reduce
from werkzeug.urls import url_parse
from app.tools import format_email
# import pdb

# project/decorators.py
from functools import wraps


def check_confirmed(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if current_user.confirmed is False:
            flash('Please confirm your account!', 'warning')
            return redirect(f'confirmAccountEmailSent/{current_user.username}')
        return func(*args, **kwargs)

    return decorated_function


@app.route('/')
def home():
    res = make_response(render_template('home.html'))
    if current_user.is_authenticated:
        res.set_cookie('username', current_user.username)
    else:
        res.set_cookie('username', '')
    res.set_cookie('page', '0')
    return res


# @app.route('/introduction')
# def introduction():
#     return render_template('introduction.html')


# @app.route('/single')
# def single_page_lesson():
#     return render_template('singlepagelesson.html')


# @app.route('/multi')
# def multi_page_lesson():
#     return render_template('multipagelesson.html')


# @app.route('/about')
# def about():
#     return render_template('about.html')

# @app.route('/Lessons/', defaults={'path': ''})
# @app.route('/Lessons/<path:path>')
# def catch_all(path):
#     return 'You want path: %s' % path


@app.route('/isloggedin')
def is_logged_in():
    result = ""
    if current_user.is_authenticated:
        result = current_user.username
    # print('This is error output', file=sys.stderr)
    return jsonify({'username': result})


@app.route('/Lessons/', defaults={'path': ''})
@app.route('/Lessons/<path:path>')
def get_lesson(path):
    path = f'/static/dist/Lessons/{path}'
    css = f'{path}/lesson.css'
    js = f'{path}/lesson.js'
    lesson_page = request.args.get('page')
    res = make_response(render_template('lesson.html', css=css, js=js))
    if lesson_page:
        res = make_response(redirect(request.path))
        res.set_cookie(
            key='page', value=lesson_page,
            path=request.path, max_age=30 * 60)
        return res

    if current_user.is_authenticated:
        res.set_cookie('username', current_user.username)
    else:
        res.set_cookie('username', '')
    return res


@app.route('/dev/Lessons/', defaults={'path': ''})
@app.route('/dev/Lessons/<path:path>')
def get_lesson_dev(path):
    path = f'/static/dist/Lessons/{path}'
    css = f'{path}/lesson-dev.css'
    js = f'{path}/lesson-dev.js'
    lesson_page = request.args.get('page')
    res = make_response(render_template('lesson.html', css=css, js=js))
    if lesson_page:
        res = make_response(redirect(request.path))
        res.set_cookie(
            key='page', value=lesson_page,
            path=request.path, max_age=30 * 60)
        return res

    if current_user.is_authenticated:
        res.set_cookie('username', current_user.username)
    else:
        res.set_cookie('username', '')
    return res

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
    user = Users.query.filter_by(username=form.username.data).first()
    if user is None or not user.check_password(form.password.data):
        return redirect('/login')
    login_user(user, True)
    return redirect('/')


@app.route('/login', methods=['GET', 'POST'])
@app.route('/login/<username>', methods=['GET', 'POST'])
def login(username=''):
    if (current_user.is_authenticated):
        return redirect(url_for('home'))
    css = '/static/dist/input.css'
    js = '/static/dist/input.js'
    form = LoginForm()
    if username:
        # user = Users.query.filter_by(username=username).first()
        # form = LoginForm(obj=user)
        form.username_or_email.data = username
    if form.validate_on_submit():
        user = Users.query.filter(
            Users.username.ilike(form.username_or_email.data)).first()
        # pdb.set_trace()
        if user is None:
            formatted_email = format_email(form.username_or_email.data)
            user = Users.query.filter_by(
                email_hash=hash_str_with_pepper(
                    formatted_email)).first()
        if user is None or not user.check_password(form.password.data):
            flash('Username or password is incorrect', 'error')
            return redirect(url_for('login'))
        if user.confirmed:
            login_user(user, True)
            user.last_login = datetime.datetime.now()
            db.session.commit()
            # session['username'] = user.username
            # return redirect(url_for('home'))
            # lesson_page = request.args.get('page')
            # if lesson_page is None:
            #     lesson_page = '0'
            next_page = request.args.get('next')
            if not next_page or url_parse(next_page).netloc != '':
                next_page = url_for('home')
            next_page = next_page
            return redirect(next_page)
        else:
            return redirect(f'confirmAccountEmailSent/{user.username}')
    return render_template(
        'login.html', form=form, css=css, js=js)


@app.route('/createAccount', methods=['GET', 'POST'])
def create():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    css = '/static/dist/input.css'
    js = '/static/dist/input.js'
    form = CreateAccountForm()
    if form.validate_on_submit():
        user = Users(username=form.username.data)
        user.set_email(form.email.data)
        user.set_password(form.password.data)
        user.signed_up_on = datetime.datetime.now()
        db.session.add(user)
        db.session.commit()
        send_confirm_account_email(user)
        return redirect(f'confirmAccountEmailSent/{user.username}')
    return render_template('createAccount.html', form=form, css=css, js=js)


@app.route('/confirmAccountEmailSent/<username>', methods=['GET', 'POST'])
def confirm_account_message(username):
    if (current_user.is_authenticated):
        return redirect(url_for('home'))
    css = '/static/dist/input.css'
    js = '/static/dist/input.js'
    form = ConfirmAccountMessageForm()
    user = Users.query.filter_by(username=username).first()
    if user is None:
        flash('User does not exist', 'error')
        return redirect(url_for('create'))
    if form.validate_on_submit():
        send_confirm_account_email(user)
        redirect(f'confirmAccountEmailSent/{user.username}')
    flash('''You need to confirm your email address before your
        account becomes active.''', 'before')
    flash(f''''An email has been sent to {user.get_email()}.
        Click the link inside it to confirm your email and
        finish account registration.''', 'before')

    return render_template(
        'confirmAccountMessage.html', form=form, js=js, css=css
    )


@app.route('/confirmAccount/<token>', methods=['GET', 'POST'])
def confirm_account(token):
    result = Users.verify_account_confirmation_token(token)
    if result['status'] == 'fail':
        return redirect(url_for('home'))
    user = result['user']
    if user is None:
        flash('''User doesn't exist''')
        return redirect(url_for('home'))
    if result['status'] == 'expired':
        flash('Email verification time elapsed.', 'after')
        flash('''You have 30 minutes to verify your account after the email
            has been sent.''', 'after')
        flash('Just now, another email has been sent.', 'after')
        send_confirm_account_email(user)
        return redirect(f'confirmAccountEmailSent/{user.username}')
    if user.confirmed:
        flash(
            'Account has already been confirmed. You can now log in.',
            'before'
        )
        return redirect(f'login/{user.username}')
    user.confirmed = True
    user.confirmed_on = datetime.datetime.now()
    db.session.commit()
    flash('Thankyou for confirming your email', 'before')
    flash('You can now login to your account.', 'before')
    return redirect(f'login/{user.username}')


@app.route('/resetPasswordRequest', methods=['GET', 'POST'])
def reset_password_request():
    css = '/static/dist/input.css'
    js = '/static/dist/input.js'
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = ResetPasswordRequestForm()
    if form.validate_on_submit():
        formatted_email = format_email(form.email.data)
        user = Users.query.filter_by(
            email_hash=hash_str_with_pepper(formatted_email)).first()
        if user:
            send_password_reset_email(user)
        flash(f'An email has been sent to {form.email.data}.', 'after')
        flash(f'Click the link inside it to reset your password.', 'after')
        return redirect(url_for('reset_password_request'))
    return render_template(
        'resetPasswordRequest.html', form=form, css=css, js=js,
    )


@app.route('/resetPassword/<token>', methods=['GET', 'POST'])
def reset_password(token):
    css = '/static/dist/input.css'
    js = '/static/dist/input.js'
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    user = Users.verify_reset_password_token(token)
    if not user:
        return redirect(url_for('home'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        db.session.commit()
        flash('Your password has been reset.', 'after')
        flash('You can now login with your new password.', 'after')
        return redirect(f'login/{user.username}')
    return render_template('resetPassword.html', form=form, css=css, js=js)


@app.route('/logout')
def logout():
    logout_user()
    session.pop('username', None)
    # lesson_page = request.args.get('page')
    # if lesson_page is None:
    #     lesson_page = '0'
    next_page = request.args.get('next')
    if not next_page or url_parse(next_page).netloc != '':
        next_page = url_for('home')
    next_page = next_page
    return redirect(next_page)
    # return redirect(url_for('home'))


def isInt(s):
    try:
        int(s)
        return True
    except ValueError:
        return False


@check_confirmed
@app.route('/rate/<lesson_uid>/<topic_name>/<version_uid>/<rating_value>')
def rate(lesson_uid, topic_name, version_uid, rating_value):
    print(lesson_uid, topic_name, version_uid, rating_value)
    status = 'not logged in'
    if current_user.is_authenticated:
        lesson = Lessons.query.filter_by(uid=lesson_uid).first()
        if lesson is None:
            return jsonify(
                {'status': 'fail', 'message': 'lesson does not exist'})
        topic = Topics.query.filter_by(
            lesson=lesson, name=topic_name).first()
        if topic is None:
            return jsonify(
                {'status': 'fail', 'message': 'topic does not exist'})
        version = Versions.query.filter_by(
            topic_id=topic.id, uid=version_uid).first()
        if version is None:
            return jsonify(
                {'status': 'fail', 'message': 'version does not exist'})

        user_rating = Ratings.query.filter_by(
            version=version, user=current_user).first()
        if user_rating is None:
            user_rating = Ratings(user=current_user, version=version)
            db.session.add(user_rating)
        if rating_value not in ['1', '2', '3', '4', '5']:
            return jsonify(
                {'status': 'fail', 'message': 'invalid rating'})
        if user_rating.rating != rating_value:
            user_rating.rating = rating_value

        generic_rating = AllRatings(user=current_user, version=version)
        generic_rating.timestamp = datetime.datetime.now()
        generic_rating.rating = rating_value

        page = request.args.get('page')
        pages = request.args.get('pages')
        if page is not None and pages is not None \
           and isInt(page) and isInt(pages) \
           and int(page) < int(pages):
            generic_rating.page = page
            generic_rating.pages = pages

        db.session.add(generic_rating)
        db.session.commit()
        status = 'done'
    return jsonify({'status': status})


@check_confirmed
@app.route('/rating/<lesson_uid>/<topic_name>/<version_uid>')
def get_rating(lesson_uid, topic_name, version_uid):
    num_ratings = 0
    ave_rating = 0
    num_high_ratings = 0
    user_rating_value = 'not logged in'

    lesson = Lessons.query.filter_by(uid=lesson_uid).first()
    if lesson is None:
        return jsonify({'status': 'fail', 'message': 'lesson does not exist'})
    topic = Topics.query.filter_by(
        lesson=lesson, name=topic_name).first()
    if topic is None:
        return jsonify({'status': 'fail', 'message': 'topic does not exist'})
    version = Versions.query.filter_by(
        topic_id=topic.id, uid=version_uid).first()
    if version is None:
        return jsonify({'status': 'fail', 'message': 'version does not exist'})

    ratings = Ratings.query.filter_by(version=version).all()
    if ratings is None:
        ratings = []
    num_ratings = len(ratings)
    sum_ratings = 0
    num_high_ratings = 0
    for r in ratings:
        sum_ratings += r.rating
        if r.rating >= 4:
            num_high_ratings += 1
    ave_rating = 0
    if num_ratings > 0:
        ave_rating = round(sum_ratings / num_ratings, 1)

    if current_user.is_authenticated:
        user_rating = Ratings.query.filter_by(
            user=current_user, version=version).first()
        if user_rating is None:
            user_rating_value = 'not rated'
        else:
            user_rating_value = user_rating.rating
    return jsonify({
        'status': 'ok',
        'message': '',
        'userRating': user_rating_value,
        'numRatings': num_ratings,
        'aveRating': ave_rating,
        'numHighRatings': num_high_ratings})
