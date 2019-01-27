# from flask import Flask, render_template
# from app.util import assets

# app = Flask(__name__)


# @app.route('/')
# def hello_world():
#     return render_template('index.html')


from flask import render_template, flash, redirect, url_for
from app import app, db
from app.forms import LoginForm, CreateAccountForm, ResetPasswordRequestForm
from app.forms import ResetPasswordForm, ConfirmAccountMessageForm
from flask_login import current_user, login_user, logout_user
from app.models import User
from app.email import send_password_reset_email, send_confirm_account_email
import sys
import datetime
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
    if user is None or not user.check_password(form.password.data):
        return redirect('/login')
    login_user(user, True)
    return redirect('/')


@app.route('/login', methods=['GET', 'POST'])
@app.route('/login/<username>', methods=['GET', 'POST'])
def login(username=''):
    if (current_user.is_authenticated):
        return redirect(url_for('home'))
    css = '/static/dist/login.css'
    js = '/static/dist/login.js'
    form = LoginForm()
    if username:
        user = User.query.filter_by(username=username).first()
        form = LoginForm(obj=user)
    if form.validate_on_submit():
        # flash('Login requested for user {}, remember_me={}'.format(
        #     form.username.data, form.remember_me.data))
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Username or password is incorrect', 'error')
            return redirect(url_for('login'))
        login_user(user, True)
        return redirect(url_for('home'))
    return render_template(
        'login.html', form=form, css=css, js=js)


# @app.route('/loginDeprecated')
# def login():
#     if current_user.is_authenticated:
#         return redirect('/')
#     return render_template(
#         'login.html',
#         css='/static/dist/login.css',
#         js='/static/dist/login.js')


@app.route('/createAccount', methods=['GET', 'POST'])
def create():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    css = '/static/dist/createAccount.css'
    js = '/static/dist/createAccount.js'
    form = CreateAccountForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
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
    css = '/static/dist/confirmAccountMessage.css'
    js = '/static/dist/confirmAccountMessage.js'
    form = ConfirmAccountMessageForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=username).first()
        if user:
            send_confirm_account_email(user)
            return redirect()

    flash('You need to confirm you email address before you account becomes active.', 'ok')
    flash(f'An email will be sent to {user.email}. Click the link inside it to confirm your email and finish account registration.', 'ok')

    render_template('confirmAccountMessage.html', form=form, js=js, css=css)


@app.route('/confirmAccount/<token>', methods=['GET', 'POST'])
def confirm_account(token):
    user = User.verify_account_confirmation_token(token)
    if not user:
        return redirect(url_for('index'))
    user.confirmed = True
    user.confirmed_on = datetime.datetime.now()
    flash('Thankyou for confirming your email', 'ok')
    flash('You can now login to your account.', 'ok')
    return redirect(f'login/{user.username}')


@app.route('/resetPasswordRequest', methods=['GET', 'POST'])
def reset_password_request():
    css = '/static/dist/resetPasswordRequest.css'
    js = '/static/dist/resetPasswordRequest.js'
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = ResetPasswordRequestForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            send_password_reset_email(user)
        flash(f'An email has been sent to {form.email.data}.', 'ok')
        flash(f'Click the link inside it to reset your password.', 'ok')
        return redirect(url_for('reset_password_request'))
    return render_template(
        'resetPasswordRequest.html', form=form, css=css, js=js,
    )


@app.route('/resetPassword/<token>', methods=['GET', 'POST'])
def reset_password(token):
    css = '/static/dist/resetPassword.css'
    js = '/static/dist/resetPassword.js'
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    user = User.verify_reset_password_token(token)
    if not user:
        return redirect(url_for('index'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        db.session.commit()
        flash('Your password has been reset.', 'ok')
        flash('You can now login with your new password.', 'ok')
        return redirect(f'login/{user.username}')
    return render_template('resetPassword.html', form=form, css=css, js=js)


@app.route('/logout')
def logout():
    logout_user()
    return redirect('/')
