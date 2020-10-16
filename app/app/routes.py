# from flask import Flask, render_template
# from app.util import assets

# app = Flask(__name__)


# @app.route('/')
# def hello_world():
#     return render_template('index.html')


from flask import render_template, flash, redirect, url_for, jsonify, session
from flask import make_response, request, abort
from app import app, db, static_files, version_list, topic_index, link_list
from app import build_time
from app.forms import LoginForm, CreateAccountForm, ResetPasswordRequestForm
from app.forms import ResetPasswordForm, ConfirmAccountMessageForm
from app.forms import AccountSettingsEmailForm, AccountSettingsUsernameForm
from app.forms import AccountSettingsPasswordForm, AccountSettingsDelete
from app.forms import ConfirmDeleteAccount
from flask_login import current_user, login_user, logout_user
from app.email import send_password_reset_email, send_confirm_account_email
from app.email import send_change_email_email
import datetime
from sqlalchemy import or_
# import pdb

# from sqlalchemy import func
from app.tools import hash_str_with_pepper
from app.models import Users, VersionRatings, LinkRatings, LinkRatingsCache
from app.models import VersionRatingsCache
# from app.models import Ratings, AllRatings
# from app.models import Lessons, Versions, Topics
# from functools import reduce
from werkzeug.urls import url_parse
from app.tools import format_email
import re

# project/decorators.py
from functools import wraps
# import logging


def make_response_with_files(*args, **kwargs):
    vendors_js = ''
    main_css = ''
    main_js = ''
    tools_js = ''
    common_content_js = ''
    figure_one_js = ''
    polyfill_js = ''
    topic_index_js = ''
    about_js = ''
    about_css = ''
    learning_paths_js = ''
    learning_paths_css = ''
    account_js = ''
    account_css = ''
    message_js = ''
    message_css = ''
    # The checks for keys in static_files is for pytest in deployment pipeline.
    # In deployment pipeline on travis, the statis/dist directory doesn't
    # exist.
    if 'static/dist' in static_files:
        dist = static_files['static/dist']
        static = static_files['static']
        vendors_js = f"/{'static/dist'}/{dist['vendors.js']}"
        common_content_js = f"/{'static/dist'}/{dist['commoncontent.js']}"
        main_css = f"/{'static/dist'}/{dist['home.css']}"
        main_js = f"/{'static/dist'}/{dist['home.js']}"
        tools_js = f"/{'static/dist'}/{dist['tools.js']}"
        figure_one_js = f"/{'static'}/{static['figureone.min.js']}"
        polyfill_js = f"/{'static/dist'}/{dist['polyfill.js']}"
        topic_index_js = f"/{'static/dist'}/{dist['topicIndex.js']}"
        about_js = f"/{'static/dist'}/{dist['about.js']}"
        about_css = f"/{'static/dist'}/{dist['about.css']}"
        account_js = f"/{'static/dist'}/{dist['account.js']}"
        account_css = f"/{'static/dist'}/{dist['account.css']}"
        message_js = f"/{'static/dist'}/{dist['message.js']}"
        message_css = f"/{'static/dist'}/{dist['message.css']}"
        learning_paths_js = f"/{'static/dist'}/{dist['learningPaths.js']}"
        learning_paths_css = f"/{'static/dist'}/{dist['learningPaths.css']}"

    if 'message_js' in kwargs and 'message_css' in kwargs:
        res = make_response(render_template(
            *args, **kwargs,
            tools_js=tools_js, polyfill_js=polyfill_js,
            common_content_js=common_content_js, vendors_js=vendors_js,
            figure_one_js=figure_one_js, topic_index_js=topic_index_js,
            about_js=about_js, main_css=main_css, main_js=main_js,
            about_css=about_css, learning_paths_js=learning_paths_js,
            learning_paths_css=learning_paths_css,
            account_js=account_js, account_css=account_css,
        ))
    else:
        res = make_response(render_template(
            *args, **kwargs,
            tools_js=tools_js, polyfill_js=polyfill_js,
            common_content_js=common_content_js, vendors_js=vendors_js,
            figure_one_js=figure_one_js, topic_index_js=topic_index_js,
            about_js=about_js, main_css=main_css, main_js=main_js,
            about_css=about_css, learning_paths_js=learning_paths_js,
            learning_paths_css=learning_paths_css,
            account_js=account_js, account_css=account_css,
            message_js=message_js, message_css=message_css,
        ))
    if current_user.is_authenticated:
        res.set_cookie('username', current_user.get_username())
    else:
        res.set_cookie('username', '')
    return res


def check_confirmed(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        if current_user.confirmed is False:
            flash('Please confirm your account!', 'warning')
            return redirect(url_for(
                'confirm_account_message',
                username=current_user.get_username()))
        return func(*args, **kwargs)

    return decorated_function


def get_full_path(root, file):
    return f'/{root}/{static_files[root][file]}'


# @app.route('/errorTester')
# def raiseError():
#     raise Exception
#     return


def log_data(rquest):
    log_data = {
        'User-Agent': rquest.headers.get('User-Agent'),
        'Accept-Language': rquest.headers.get('Accept-Language'),
        'Referer': rquest.headers.get('Referer'),
        'Endpoint': rquest.full_path,
        'Route': ','.join([address for address in rquest.access_route]),
    }
    app.logger.info(f"{rquest.remote_addr} - {log_data}")


@app.route('/') # noqa
def home():
    res = make_response_with_files('home.html')
    res.set_cookie('page', '0')
    log_data(request)
    return res


@app.route('/paths', strict_slashes=False)
def paths():
    res = make_response_with_files('learning_paths.html')
    res.set_cookie('page', '0')
    log_data(request)
    return res


@app.route('/sitemap.xml')
def sitemap():
    return app.send_static_file('sitemap.xml')


@app.route('/robots.txt')
def robots():
    return app.send_static_file('robots.txt')


@app.route('/hashes')
def hashes():
    return app.send_static_file('hashes.json')


@app.route('/BingSiteAuth.xml')
def bingsitemap():
    return app.send_static_file('BingSiteAuth.xml')


def information_response(name):
    information_js = ''
    information_css = ''
    if 'static/dist' in static_files:
        info = static_files['static/dist']
        information_js = \
            f"/{'static/dist'}/{info[f'{name}.js']}"
        information_css = \
            f"/{'static/dist'}/{info[f'{name}.css']}"
    res = make_response_with_files(
        'information.html', information_js=information_js,
        information_css=information_css)
    res.set_cookie('page', '0')
    return res


@app.route('/about', strict_slashes=False)
def about():
    return information_response('about')

# Uncomment for Privacy
@app.route('/copyright', strict_slashes=False)
def copyright():
    return information_response('copyright')

# Uncomment for Privacy
@app.route('/privacy', strict_slashes=False)
def privacy():
    return information_response('privacy')

# Uncomment for Privacy
@app.route('/terms', strict_slashes=False)
def terms():
    return information_response('terms')


# @app.route('/disclaimer', strict_slashes=False)
# def disclaimer():
#     return information_response('disclaimer')


# @app.route('/contribute', strict_slashes=False)
# def contribute():
#     return information_response('contribute')


@app.route('/introduction', strict_slashes=False)
def introduction():
    return information_response('introduction')


@app.route('/contact', strict_slashes=False)
def contact():
    return information_response('contact')


@app.errorhandler(404)
def not_found_error(error):
    app.logger.info(request.referrer)
    if request.referrer and \
       (request.referrer.startswith('https://thisiget')
            or request.referrer.startswith('https://www.thisiget')
            or request.referrer.startswith('http://localhost')):
        route = ','.join([address for address in request.access_route])
        try:
            short_date = build_time['shortDate']
        except:  # noqa
            short_date = 'none'

        app.logger.error(
            'Internal link broken. '
            f'Referrer: {request.referrer}, '
            f'Route: {route}, '
            f'User Agent: {request.headers.get("User-Agent")}, '
            f'Url: {request.url}, '
            f'Build Date: {short_date}'
        )
        return render_template('404_internal.html'), 404
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return render_template('500.html'), 500


# @app.route('/content/', defaults={'path': ''})
# @app.route('/content/<path:path>')
# def catch_all(path):
#     return 'You want path: %s' % path


@app.route('/isloggedin')
def is_logged_in():
    result = ""
    if current_user.is_authenticated:
        result = current_user.get_username()
    # print('This is error output', file=sys.stderr)
    return jsonify({'username': result})


@app.route('/Lessons/', defaults={'path': ''}, strict_slashes=False)  # noqa
@app.route('/Lessons/<path:path>')
def get_lesson(path):
    return redirect(f'/content/{path}')

@app.route('/content/', defaults={'path': ''}, strict_slashes=False)  # noqa
@app.route('/content/<path:path>')
def get_content(path):
    log_data(request)
    path = path.strip('/')
    content_path = f'static/dist/content/{path}'
    js = ''
    css = ''

    if content_path not in static_files:
        abort(404)
    if 'content.js' not in static_files[content_path]:
        abort(404)
    if 'content.css' not in static_files[content_path]:
        abort(404)
    js = f'/static/dist/content/' \
        f'{path}/{static_files[content_path]["content.js"]}'
    css = f'/static/dist/content/{path}/' \
        f'{static_files[content_path]["content.css"]}'

    *p, content_path, topic_name, version_uid = path.split('/')

    end_point = f"{path}"

    title = ''
    description = ''
    if end_point in version_list:
        version = version_list[end_point]
        if version['title'] is None:
            title = version['default_title']
        else:
            title = version['title']
        description = version['description']

    topic_page = request.args.get('page')

    res = make_response_with_files(
        'content.html', css=css, js=js, title=title, description=description)
    if topic_page:
        # res = make_response(redirect(request.path))
        res.set_cookie(
            key='page', value=topic_page,
            path=request.path, max_age=30 * 60)
        return res
    return res
    # if current_user.is_authenticated:
    #     res.set_cookie('username', current_user.get_username())
    # else:
    #     res.set_cookie('username', '')
    # return res


@app.route('/qr/content/', defaults={'path': ''})
@app.route('/qr/content/<path:path>')
def get_qr_file_location(path):
    qr_path = f'static/dist/content/{path}'.strip('/')
    js = ''
    css = ''
    if qr_path not in static_files:
        abort(404)
    if 'quickReference.js' not in static_files[qr_path]:
        abort(404)
    if 'quickReference.css' not in static_files[qr_path]:
        abort(404)
    js = static_files[qr_path]["quickReference.js"]
    css = static_files[qr_path]["quickReference.css"]
    return jsonify({
        'status': 'ok',
        'js': js,
        'css': css,
    })


@app.route('/dev/content/', defaults={'path': ''})
@app.route('/dev/content/<path:path>')
def get_content_dev(path):
    content_path = f'static/dist/content/{path}'.strip('/')
    js = ''
    css = ''
    if (content_path in static_files):
        js = f'/static/dist/content/{path}/' \
             f'{static_files[content_path]["content-dev.js"]}'
        css = f'/static/dist/content/{path}/' \
              f'{static_files[content_path]["content-dev.css"]}'
    topic_page = request.args.get('page')

    res = make_response_with_files('content.html', css=css, js=js)
    if topic_page:
        # res = make_response(redirect(request.path))
        res.set_cookie(
            key='page', value=topic_page,
            path=request.path, max_age=30 * 60)
        return res
    return res


@app.route('/favicon.ico')
def icon():
    return app.send_static_file('assets/favicon.ico')


@app.route('/apple-touch-icon-precomposed.png')
@app.route('/apple-touch-icon.png')
def apple_touch_icon():
    return app.send_static_file('assets/icon.png')


# @app.route('/static_files/chapter1')
# def chapter1():
#     return "Chapter 1 Content"


@app.route('/loginuser', methods=['POST'])
def loginuser():
    form = LoginForm()
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(form.username.data.lower())).first()
    if user is None or not user.check_password(form.password.data):
        return redirect('/login')
    login_user(user, True)
    return redirect('/')


@app.route('/login', methods=['GET', 'POST'])
@app.route('/login/<username>', methods=['GET', 'POST'])
def login(username=''):
    if (current_user.is_authenticated):
        return redirect(url_for('home'))
    js = ''
    css = ''
    tools_js = ''
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
        tools_js = \
            f"/{'static/dist'}/{static_files['static/dist']['tools.js']}"
    form = LoginForm()
    if username:
        # user = Users.query.filter_by(username=username).first()
        # form = LoginForm(obj=user)
        form.username_or_email.data = username
    if form.validate_on_submit():
        # user = Users.query.filter(
        #     Users.username_hash.ilike(
        #         hash_str_with_pepper(
        #             form.username_or_email.data.lower()))).last()
        # pdb.set_trace()
        formatted_email = format_email(form.username_or_email.data)
        user = Users.query \
            .filter(or_(
                Users.username_hash == hash_str_with_pepper(
                    form.username_or_email.data.lower()),
                Users.email_hash == hash_str_with_pepper(formatted_email),
            )) \
            .first()
        #       .order_by(Users.signed_up_on.desc())
        # if user is None:
        #     formatted_email = format_email(form.username_or_email.data)
        #     user = Users.query.filter_by(
        #         email_hash=hash_str_with_pepper(
        #             formatted_email)).last()
        if user is None or not user.check_password(form.password.data):
            flash('Username or password is incorrect', 'error')
            return redirect(url_for('login'))
        if user.confirmed:
            login_user(user, True)
            user.last_login = datetime.datetime.now()
            db.session.commit()
            next_page = request.args.get('next')
            if not next_page or url_parse(next_page).netloc != '' \
                    or 'accountDeleted' in next_page:
                next_page = url_for('home')
            next_page = next_page
            return redirect(next_page)
        else:
            # return redirect(f'confirmAccountEmailSent/{user.get_username()}')
            return redirect(url_for(
                'confirm_account_message', username=user.get_username()))
    return render_template(
        'login.html', form=form, css=css, js=js, tools_js=tools_js)


@app.route('/account', methods=['GET', 'POST'])  # noqa
def account_settings():  # noqa C901
    if not current_user.is_authenticated:
        return redirect(url_for('home'))

    username_form = AccountSettingsUsernameForm(prefix='username_form')
    email_form = AccountSettingsEmailForm(prefix='email_form')
    password_form = AccountSettingsPasswordForm(prefix='password_form')
    delete_form = AccountSettingsDelete(prefix='delete_form')

    if request.method == 'POST':
        if username_form.submit_username.data:
            if username_form.validate_on_submit():
                if current_user.get_username() != username_form.username.data:
                    current_user.set_username(username_form.username.data)
                    username_form.username.data = current_user.get_username()
                    db.session.commit()
                    flash('Username updated', 'username_updated')
        if password_form.submit_password.data:
            if password_form.validate_on_submit():
                current_user.set_password(password_form.password.data)
                db.session.commit()
                flash('Password updated', 'password_updated')
        if email_form.submit_email.data:
            if email_form.validate_on_submit():
                if current_user.get_email() != email_form.email.data:
                    send_change_email_email(
                        current_user, email_form.email.data)
                    flash('Confirmation email sent', 'email_updated')
        else:
            email_form.email.data = current_user.get_email()
        if delete_form.submit.data:
            if delete_form.validate_on_submit():
                return redirect(url_for('confirm_delete_account'))
    else:
        email_form.email.data = current_user.get_email()
    username_form.username.data = current_user.get_username()

    return make_response_with_files(
        'account_settings.html', username_form=username_form,
        email_form=email_form, password_form=password_form,
        delete_form=delete_form)


@app.route('/confirmDelete', methods=['GET', 'POST'])
def confirm_delete_account():
    if not current_user.is_authenticated:
        return redirect(url_for('home'))
    form = ConfirmDeleteAccount(prefix='form')
    # print(form.submit_save)
    # print(form.submit_delete)
    if request.method == 'POST' and form.validate_on_submit():
        if form.submit_save.data:
            return redirect(url_for('account_settings'))
        if form.submit_delete.data:
            if current_user.get_username() == 'test_user_002':
                user = Users.query.filter_by(id=current_user.id).first()
                if user is not None:
                    db.session.delete(user)
            else:
                current_user.delete_account()
            logout_user()
            session.pop('username', None)
            db.session.commit()
            return redirect(url_for('account_deleted'))

    confirm_delete_account_js = ''
    confirm_delete_account_css = ''
    if 'static/dist' in static_files:
        confirm_delete_account_js = \
            f"/{'static/dist'}/" \
            f"{static_files['static/dist']['confirmDeleteAccount.js']}"
        confirm_delete_account_css = \
            f"/{'static/dist'}/" \
            f"{static_files['static/dist']['confirmDeleteAccount.css']}"

    return make_response_with_files(
        'confirm_delete_account.html', form=form,
        message_css=confirm_delete_account_css,
        message_js=confirm_delete_account_js)


@app.route('/accountDeleted', methods=['GET'])
def account_deleted():
    return make_response_with_files('confirm_account_deleted.html')


@app.route('/tokenError/<error>', methods=['GET'])
def token_error(error):
    if error == 'expired':
        return make_response_with_files(
            'createAccountTokenError.html',
            error_message='''A more recent account with the same username or email has since been created.''')  # noqa
    if error == 'deleted':
        return make_response_with_files(
            'createAccountTokenError.html',
            error_message='''The token points to an account that has been deleted.''')  # noqa
    return make_response_with_files('createAccountTokenError.html')


@app.route('/createAccount', methods=['GET', 'POST'])
def create():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    js = ''
    css = ''
    tools_js = ''
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
        tools_js = \
            f"/{'static/dist'}/{static_files['static/dist']['tools.js']}"
    form = CreateAccountForm()
    if form.validate_on_submit():
        # Delete any rows in the database that have either the username or
        # email (these rows are guaranteed not confirmed as if they were
        # confirmed the submit validation would have failed)
        formatted_email = format_email(form.email.data)
        Users.query \
            .filter(or_(
                Users.username_hash == hash_str_with_pepper(
                    form.username.data.lower()),
                Users.email_hash == hash_str_with_pepper(formatted_email),
            )) \
            .delete()
        user = Users()
        user.set_username(form.username.data)
        user.set_email(form.email.data)
        user.set_password(form.password.data)
        user.signed_up_on = datetime.datetime.now()
        db.session.add(user)
        db.session.commit()
        send_confirm_account_email(user)
        # return redirect(f'confirmAccountEmailSent/{user.get_username()}')
        return redirect(url_for(
            'confirm_account_message', username=user.get_username()))
    return render_template(
        'createAccount.html',
        form=form, css=css, js=js, tools_js=tools_js)


@app.route('/confirmAccountEmailSent/<username>', methods=['GET', 'POST'])
def confirm_account_message(username):
    if (current_user.is_authenticated):
        return redirect(url_for('home'))
    js = ''
    css = ''
    tools_js = ''
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
        tools_js = \
            f"/{'static/dist'}/{static_files['static/dist']['tools.js']}"
    form = ConfirmAccountMessageForm()
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.lower())).first()
    if user is None:
        flash('User does not exist', 'error')
        return redirect(url_for('create'))
    if form.validate_on_submit():
        send_confirm_account_email(user)
        # redirect(f'confirmAccountEmailSent/{user.get_username()}')
        return redirect(url_for(
            'confirm_account_message', username=user.get_username()))
    # flash('''You need to confirm your email address before your
    #     account becomes active.''', 'before')
    # flash(f'''An email has been sent to {user.get_email()}.
    #     Click the link inside it to confirm your email and
    #     finish account registration.''', 'before')

    return render_template(
        'confirmAccountMessage.html',
        form=form, js=js, css=css, tools_js=tools_js,
        email_address=user.get_email(),
    )


@app.route('/confirmAccount/<token>', methods=['GET', 'POST'])
def confirm_account(token):
    result = Users.verify_account_confirmation_token(token)
    if result['status'] == 'fail':
        return redirect(url_for('home'))
    # user = result['user']
    user = Users.query.get(result['user'])
    if user is None \
       or (user is not None
           and str(user.signed_up_on) != result['signed_up_on']):
        return redirect(url_for('token_error', error='expired'))
    if user.username_hash == 'deleted account':
        return redirect(url_for('token_error', error='deleted'))
    if result['status'] == 'expired':
        flash('Email verification time elapsed.', 'after')
        flash('''You have 30 minutes to verify your account after the email
            has been sent.''', 'after')
        flash('Just now, another email has been sent.', 'after')
        send_confirm_account_email(user)
        return redirect(url_for(
            'confirm_account_message', username=user.get_username()))
    if user.confirmed:
        flash(
            'Account has already been confirmed. You can now log in.',
            'before'
        )
        return redirect(url_for('login', username=user.get_username()))
    user.confirmed = True
    user.confirmed_on = datetime.datetime.now()

    Users.query \
        .filter(Users.id != user.id) \
        .filter(or_(
            Users.username_hash == user.username_hash,
            Users.email_hash == user.email_hash,
        )) \
        .delete()
    db.session.commit()
    flash('Thankyou for confirming your email', 'before')
    flash('You can now login to your account.', 'before')
    return redirect(url_for('login', username=user.get_username()))


@app.route('/resetPasswordRequest', methods=['GET', 'POST'])
def reset_password_request():
    js = ''
    css = ''
    tools_js = ''
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
        tools_js = \
            f"/{'static/dist'}/{static_files['static/dist']['tools.js']}"
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
        tools_js=tools_js,
    )


@app.route('/resetPassword/<token>', methods=['GET', 'POST'])
def reset_password(token):
    js = ''
    css = ''
    tools_js = ''
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
        tools_js = \
            f"/{'static/dist'}/{static_files['static/dist']['tools.js']}"
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    user = Users.verify_reset_password_token(token)
    if not user:
        return redirect(url_for('home'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        if not user.confirmed:
            user.confirmed = True
            user.confirmed_on = datetime.datetime.now()
        db.session.commit()
        flash('Your password has been reset.', 'after')
        flash('You can now login with your new password.', 'after')
        return redirect(url_for('login', username=user.get_username()))
    return render_template(
        'resetPassword.html', form=form, css=css, js=js,
        tools_js=tools_js)


@app.route('/confirmEmailChange/<token>', methods=['GET'])
def confirm_email_change(token):
    result = Users.verify_change_email_token(token)
    # if result['status'] == 'fail':
    if result['status'] == 'expired':
        message_html = f'''
        <p>
            You need to verify any email change within 30 minutes of the
            request.
        </p>
        <p>
            In this case, it took more than 30 minutes for the verification, and so it failed. # noqa
        </p>
        <p>
            If you wish to change your email address, please try again and be
            sure to verify within 30 minutes.
        </p>
        '''
        return make_response_with_files(
            'message.html', message_html=re.sub('\n', '', message_html),
        )

    if result['status'] == 'fail':
        message_html = f'''
        <h1>
            Account Email Change Failed
        </h1>
        <p>
            The change to your account email address has failed as either the verification token is invalid or corrupt.  # noqa
        </p>
        <p>
            If you wish to change your email, please try again in account
            settings.
        </p>'''
        return make_response_with_files(
            'message.html', message_html=re.sub('\n', '', message_html)
        )

    if result['status'] == 'ok':
        user = result['user']
        user.set_email(result['email'])
        db.session.commit()
        if current_user.is_authenticated and current_user == user:
            return redirect(url_for('account_settings'))

    confirm_email_change_js = ''
    confirm_email_change_css = ''
    if 'static/dist' in static_files:
        confirm_email_change_js = \
            f"/{'static/dist'}/" \
            f"{static_files['static/dist']['confirmEmailChange.js']}"
        confirm_email_change_css = \
            f"/{'static/dist'}/" \
            f"{static_files['static/dist']['confirmEmailChange.css']}"

    return make_response_with_files(
        'confirm_email_changed.html',
        message_js=confirm_email_change_js,
        message_css=confirm_email_change_css)

    # user = Users.verify_reset_password_token(token)
    # if not user:
    #     return redirect(url_for('home'))
    # form = ResetPasswordForm()
    # if form.validate_on_submit():
    #     user.set_password(form.password.data)
    #     db.session.commit()
    #     flash('Your password has been reset.', 'after')
    #     flash('You can now login with your new password.', 'after')
    #     return redirect(url_for('login', username=user.get_username()))
    # return render_template(
    #     'resetPassword.html', form=form, css=css, js=js,
    #     tools_js=tools_js)


@app.route('/logout', strict_slashes=False)
def logout():
    logout_user()
    session.pop('username', None)

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


@app.route('/getTopicRatings/', defaults={'path': ''})  # noqa
@app.route('/getTopicRatings/<path:path>')
def get_topic_ratings(path):
    if path not in topic_index:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})
    ratings = {}
    current_ratings = VersionRatingsCache.query.filter_by(topic_uid=path).all()
    for rating in current_ratings:
        approach, version = rating.approach_version.split('/')
        if approach not in ratings:
            ratings[approach] = {}
        ratings[approach][version] = {
            'num': rating.num_ratings,
            'high': rating.high_ratings,
            'ave': rating.ave_rating,
            'user': 0,
        }
        if (current_user.is_authenticated):
            user_rating = VersionRatings.query.filter_by(
                user=current_user,
                version_uid=f'{path}/{approach}/{version}').first()
            if user_rating is not None:
                ratings[approach][version]['user'] = user_rating.rating
    return jsonify({'status': 'ok', 'ratings': ratings})


@app.route('/getVersionRating/<path:path>')
def get_version_rating(path):
    if path not in version_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})
    topic_uid = '/'.join(path.split('/')[0:-2])
    approach_version = '/'.join(path.split('/')[-2:])
    rating_stats = {
        'num_ratings': 0,
        'high_ratings': 0,
        'ave_rating': 0,
    }
    current_rating = VersionRatingsCache.query.filter_by(
        topic_uid=topic_uid, approach_version=approach_version).first()
    if current_rating:
        rating_stats = {
            'num_ratings': current_rating.num_ratings,
            'high_ratings': current_rating.high_ratings,
            'ave_rating': current_rating.ave_rating,
        }
    user_rating = 'not logged in'
    if current_user.is_authenticated:
        existing_rating = VersionRatings.query.filter_by(
            version_uid=path, user=current_user).first()
        if existing_rating is not None:
            user_rating = existing_rating.rating
    rating = {
        'num': rating_stats['num_ratings'],
        'high': rating_stats['high_ratings'],
        'ave': rating_stats['ave_rating'],
        'user': user_rating,
    }
    return jsonify({'status': 'ok', 'rating': rating})


@check_confirmed
@app.route('/setVersionRating/<path:path>')
def set_version_rating(path):
    if not current_user.is_authenticated:
        return jsonify({'status': 'fail', 'message': 'not logged in'})
    if path not in version_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})
    rating = request.args.get('rating')
    if rating is None:
        return jsonify({'status': 'fail', 'message': 'no rating'})
    possible_ratings = ['0', '1', '2', '3', '4', '5']
    if rating not in possible_ratings:
        return jsonify({'status': 'fail', 'message': 'invalid rating'})
    clean_path = path.strip('/')
    # set rating
    existing_rating = VersionRatings.query.filter_by(
        user=current_user, version_uid=clean_path).first()
    if existing_rating:
        existing_rating.rating = rating
    else:
        new_rating = VersionRatings(
            user=current_user, version_uid=clean_path, rating=rating)
        db.session.add(new_rating)
    db.session.commit()
    # update cache and return new rating
    update_version_rating_cache(clean_path)
    return get_version_rating(clean_path)


def update_version_rating_cache(version_uid):
    topic_uid = '/'.join(version_uid.split('/')[0:-2])
    approach_version = '/'.join(version_uid.split('/')[-2:])
    rating = VersionRatings.query.filter_by(version_uid=version_uid).all()
    ratings = [r.rating for r in rating]
    num = len(ratings)
    ave = sum(ratings) / num
    high = len(list(r for r in ratings if r > 3))
    existing_rating = VersionRatingsCache.query.filter_by(
        topic_uid=topic_uid, approach_version=approach_version).first()
    if existing_rating:
        existing_rating.num_ratings = num
        existing_rating.high_ratings = high
        existing_rating.ave_rating = ave
    else:
        new_rating = VersionRatingsCache(
            topic_uid=topic_uid, approach_version=approach_version,
            num_ratings=num, high_ratings=high, ave_rating=ave)
        db.session.add(new_rating)
    db.session.commit()


def update_link_rating_cache(version_uid, link_hash):
    rating = LinkRatings.query.filter_by(
        version_uid=version_uid, link_hash=link_hash).all()
    ratings = [r.rating for r in rating]
    num = len(ratings)
    # print(ratings)
    # pdb.set_trace()
    ave = sum(ratings) / num
    high = len(list(r for r in ratings if r > 3))
    existing_rating = LinkRatingsCache.query.filter_by(
        version_uid=version_uid, link_hash=link_hash).first()
    if existing_rating:
        existing_rating.num_ratings = num
        existing_rating.high_ratings = high
        existing_rating.ave_rating = ave
    else:
        new_rating = LinkRatingsCache(
            version_uid=version_uid, link_hash=link_hash,
            num_ratings=num, high_ratings=high, ave_rating=ave)
        db.session.add(new_rating)
    db.session.commit()


def get_link_rating(version_uid, link_hash, user=None):
    rating = LinkRatingsCache.query.filter_by(
        version_uid=version_uid, link_hash=link_hash).first()
    if rating is None:
        # num, high, ave, user
        return [0, 0, 0, 0]
    user_rating = 0
    if user and user.is_authenticated:
        existing_rating = LinkRatings.query.filter_by(
            user=user, version_uid=version_uid,
            link_hash=link_hash).first()
        if existing_rating is not None:
            user_rating = existing_rating.rating
    return [rating.num_ratings, rating.high_ratings,
            rating.ave_rating, user_rating]


@app.route('/getLinkRatings/<path:path>')
def get_link_ratings(path):
    if path not in link_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})
    ratings = []
    for link in link_list[path]:
        if 'hash' in link:
            rating = get_link_rating(path, link['hash'], current_user)
        else:
            rating = [0, 0, 0, 0]
        ratings.append(rating)
    return jsonify({'status': 'ok', 'ratings': ratings})


@app.route('/setLinkRating/<path:path>')
def set_link_rating(path):
    if not current_user.is_authenticated:
        return jsonify({'status': 'fail', 'message': 'not logged in'})
    clean_path = path.strip('/')
    if clean_path not in link_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})

    rating = request.args.get('rating')
    if rating is None:
        return jsonify({'status': 'fail', 'message': 'no rating'})
    possible_ratings = ['0', '1', '2', '3', '4', '5']
    if rating not in possible_ratings:
        return jsonify({'status': 'fail', 'message': 'invalid rating'})

    link_hash = request.args.get('hash')
    hashes = [link['hash'] for link in link_list[clean_path]]

    if link_hash not in hashes:
        return jsonify({'status': 'fail', 'message': 'invalid link hash'})

    existing_rating = LinkRatings.query.filter_by(
        user=current_user, version_uid=clean_path, link_hash=link_hash).first()
    if existing_rating:
        existing_rating.rating = rating
    else:
        new_rating = LinkRatings(
            user=current_user, version_uid=clean_path,
            rating=rating, link_hash=link_hash)
        db.session.add(new_rating)
    db.session.commit()
    update_link_rating_cache(clean_path, link_hash)
    # print(rating, link_hash)
    cached_rating = get_link_rating(clean_path, link_hash, current_user)
    return jsonify({'status': 'ok', 'rating': cached_rating})
