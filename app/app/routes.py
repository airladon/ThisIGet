# from flask import Flask, render_template
# from app.util import assets

# app = Flask(__name__)


# @app.route('/')
# def hello_world():
#     return render_template('index.html')


from flask import render_template, flash, redirect, url_for, jsonify, session
from flask import make_response, request
from app import app, db, static_files, version_list, topic_index, link_list
from app.forms import LoginForm, CreateAccountForm, ResetPasswordRequestForm
from app.forms import ResetPasswordForm, ConfirmAccountMessageForm
from flask_login import current_user, login_user, logout_user
from app.email import send_password_reset_email, send_confirm_account_email
import datetime
# from sqlalchemy import func
from app.tools import hash_str_with_pepper
from app.models import Users, VersionRatings, LinkRatings, LinkRatingsCache
from app.models import VersionRatingsCache
# from app.models import Ratings, AllRatings
# from app.models import Lessons, Versions, Topics
# from functools import reduce
from werkzeug.urls import url_parse
from app.tools import format_email
# import re
import pdb

# project/decorators.py
from functools import wraps


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

    res = make_response(render_template(
        *args, **kwargs,
        tools_js=tools_js, polyfill_js=polyfill_js,
        common_content_js=common_content_js, vendors_js=vendors_js,
        figure_one_js=figure_one_js, topic_index_js=topic_index_js,
        about_js=about_js, main_css=main_css, main_js=main_js,
        about_css=about_css,
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


@app.route('/') # noqa
def home():
    res = make_response_with_files('home.html')
    res.set_cookie('page', '0')
    # print(f"{request.remote_addr} {request.headers.get('User-Agent')}")
    return res


@app.route('/sitemap.xml')
def sitemap():
    return app.send_static_file('sitemap.xml')


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


@app.route('/about')
def about():
    return information_response('about')


@app.route('/copyright')
def copyright():
    return information_response('copyright')


@app.route('/privacy')
def privacy():
    return information_response('privacy')


@app.route('/terms')
def terms():
    return information_response('terms')


@app.route('/disclaimer')
def disclaimer():
    return information_response('disclaimer')


@app.route('/contribute')
def contribute():
    return information_response('contribute')


@app.route('/introduction')
def introduction():
    return information_response('introduction')


@app.route('/contact')
def contact():
    return information_response('contact')


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


@app.route('/content/', defaults={'path': ''})  # noqa
@app.route('/content/<path:path>')
def get_content(path):
    content_path = f'static/dist/content/{path}'.strip('/')
    js = ''
    css = ''
    if (content_path in static_files):
        js = f'/static/dist/content/' \
             f'{path}/{static_files[content_path]["content.js"]}'
        css = f'/static/dist/content/{path}/' \
              f'{static_files[content_path]["content.css"]}'

    *p, content_path, topic_name, version_uid = path.strip('/').split('/')

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
        res = make_response(redirect(request.path))
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
    if (qr_path in static_files):
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
        res = make_response(redirect(request.path))
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
        username_hash=hash_str_with_pepper(form.username.data)).first()
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
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
    form = LoginForm()
    if username:
        # user = Users.query.filter_by(username=username).first()
        # form = LoginForm(obj=user)
        form.username_or_email.data = username
    if form.validate_on_submit():
        user = Users.query.filter(
            Users.username_hash.ilike(
                hash_str_with_pepper(
                    form.username_or_email.data.lower()))).first()
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
            next_page = request.args.get('next')
            if not next_page or url_parse(next_page).netloc != '':
                next_page = url_for('home')
            next_page = next_page
            return redirect(next_page)
        else:
            # return redirect(f'confirmAccountEmailSent/{user.get_username()}')
            return redirect(url_for(
                'confirm_account_message', username=user.get_username()))
    return render_template(
        'login.html', form=form, css=css, js=js)


@app.route('/createAccount', methods=['GET', 'POST'])
def create():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    js = ''
    css = ''
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
    form = CreateAccountForm()
    if form.validate_on_submit():
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
    return render_template('createAccount.html', form=form, css=css, js=js)


@app.route('/confirmAccountEmailSent/<username>', methods=['GET', 'POST'])
def confirm_account_message(username):
    if (current_user.is_authenticated):
        return redirect(url_for('home'))
    js = ''
    css = ''
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
    form = ConfirmAccountMessageForm()
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username)).first()
    if user is None:
        flash('User does not exist', 'error')
        return redirect(url_for('create'))
    if form.validate_on_submit():
        send_confirm_account_email(user)
        # redirect(f'confirmAccountEmailSent/{user.get_username()}')
        return redirect(url_for(
            'confirm_account_message', username=user.get_username()))
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
        # return redirect(f'confirmAccountEmailSent/{user.get_username()}')
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
    db.session.commit()
    flash('Thankyou for confirming your email', 'before')
    flash('You can now login to your account.', 'before')
    return redirect(url_for('login', username=user.get_username()))


@app.route('/resetPasswordRequest', methods=['GET', 'POST'])
def reset_password_request():
    js = ''
    css = ''
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
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
    js = ''
    css = ''
    if 'static/dist' in static_files:
        js = f"/{'static/dist'}/{static_files['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{static_files['static/dist']['input.css']}"
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
        return redirect(url_for('login', username=user.get_username()))
    return render_template('resetPassword.html', form=form, css=css, js=js)


@app.route('/logout')
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
        return jsonify({'status': 'fail', 'message': 'no logged in'})
    if path not in version_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})
    rating = request.args.get('rating')
    if rating is None:
        return jsonify({'status': 'fail', 'message': 'no rating'})
    # set rating
    existing_rating = VersionRatings.query.filter_by(
        user=current_user, version_uid=path).first()
    if existing_rating:
        existing_rating.rating = rating
    else:
        new_rating = VersionRatings(
            user=current_user, version_uid=path, rating=rating)
        db.session.add(new_rating)
    db.session.commit()
    # update cache and return new rating
    update_version_rating_cache(path)
    return get_version_rating(path)


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
        rating = get_link_rating(path, link['hash'], current_user)
        ratings.append(rating)
    return jsonify({'status': 'ok', 'ratings': ratings})


@app.route('/setLinkRating/<path:path>')
def set_link_rating(path):
    if not current_user.is_authenticated:
        return jsonify({'status': 'fail', 'message': 'no logged in'})
    if path not in link_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})

    rating = request.args.get('rating')
    link_hash = request.args.get('hash')
    existing_rating = LinkRatings.query.filter_by(
        user=current_user, version_uid=path, link_hash=link_hash).first()
    if existing_rating:
        existing_rating.rating = rating
    else:
        new_rating = LinkRatings(
            user=current_user, version_uid=path,
            rating=rating, link_hash=link_hash)
        db.session.add(new_rating)
    db.session.commit()
    update_link_rating_cache(path, link_hash)
    # print(rating, link_hash)
    cached_rating = get_link_rating(path, link_hash, current_user)
    return jsonify({'status': 'ok', 'rating': cached_rating})
