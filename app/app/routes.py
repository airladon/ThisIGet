# from flask import Flask, render_template
# from app.util import assets

# app = Flask(__name__)


# @app.route('/')
# def hello_world():
#     return render_template('index.html')


from flask import render_template, flash, redirect, url_for, jsonify, session
from flask import make_response, request
from app import app, db, lessons, version_list, topic_index, link_list
from app.forms import LoginForm, CreateAccountForm, ResetPasswordRequestForm
from app.forms import ResetPasswordForm, ConfirmAccountMessageForm
from flask_login import current_user, login_user, logout_user
from app.email import send_password_reset_email, send_confirm_account_email
import datetime
# from sqlalchemy import func
from app.tools import hash_str_with_pepper
from app.models import Users, VersionRatings, LinkRatings
# from app.models import Ratings, AllRatings
# from app.models import Lessons, Versions, Topics
# from functools import reduce
from werkzeug.urls import url_parse
from app.tools import format_email
# import re
# import pdb

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
    # The checks for keys in lessons is for pytest in deployment pipeline.
    # In deployment pipeline on travis, the statis/dist directory doesn't
    # exist.
    if 'static/dist' in lessons:
        dist = lessons['static/dist']
        static = lessons['static']
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
    return f'/{root}/{lessons[root][file]}'


@app.route('/') # noqa
def home():
    res = make_response_with_files('home.html')
    res.set_cookie('page', '0')
    print(f"{request.remote_addr} {request.headers.get('User-Agent')}")
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
    if 'static/dist' in lessons:
        info = lessons['static/dist']
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
    lesson_path = f'static/dist/content/{path}'.strip('/')
    js = ''
    css = ''
    if (lesson_path in lessons):
        js = f'/static/dist/content/' \
             f'{path}/{lessons[lesson_path]["content.js"]}'
        css = f'/static/dist/content/{path}/' \
              f'{lessons[lesson_path]["content.css"]}'

    *p, lesson_uid, topic_name, version_uid = path.strip('/').split('/')

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

    lesson_page = request.args.get('page')

    res = make_response_with_files(
        'content.html', css=css, js=js, title=title, description=description)
    if lesson_page:
        res = make_response(redirect(request.path))
        res.set_cookie(
            key='page', value=lesson_page,
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
    if (qr_path in lessons):
        js = lessons[qr_path]["quickReference.js"]
        css = lessons[qr_path]["quickReference.css"]
    return jsonify({
        'status': 'ok',
        'js': js,
        'css': css,
    })


@app.route('/dev/content/', defaults={'path': ''})
@app.route('/dev/content/<path:path>')
def get_lesson_dev(path):
    lesson_path = f'static/dist/content/{path}'.strip('/')
    js = ''
    css = ''
    if (lesson_path in lessons):
        js = f'/static/dist/content/{path}/' \
             f'{lessons[lesson_path]["content-dev.js"]}'
        css = f'/static/dist/content/{path}/' \
              f'{lessons[lesson_path]["content-dev.css"]}'
    lesson_page = request.args.get('page')

    res = make_response_with_files('content.html', css=css, js=js)
    if lesson_page:
        res = make_response(redirect(request.path))
        res.set_cookie(
            key='page', value=lesson_page,
            path=request.path, max_age=30 * 60)
        return res
    return res


# @app.route('/content/<subject>/<lesson_id>')
# def get_lesson(subject, lesson_id):
#     print(lesson_id)
#     path = f'/static/dist/content/{subject}/{lesson_id}'
#     css = f'{path}/lesson.css'
#     js = f'{path}/lesson.js'
#     return render_template('lesson.html', css=css, js=js)


@app.route('/favicon.ico')
def icon():
    return app.send_static_file('assets/favicon.ico')


@app.route('/apple-touch-icon-precomposed.png')
@app.route('/apple-touch-icon.png')
def apple_touch_icon():
    return app.send_static_file('assets/icon.png')


# @app.route('/lessons/chapter1')
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
    if 'static/dist' in lessons:
        js = f"/{'static/dist'}/{lessons['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{lessons['static/dist']['input.css']}"
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
    if 'static/dist' in lessons:
        js = f"/{'static/dist'}/{lessons['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{lessons['static/dist']['input.css']}"
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
    if 'static/dist' in lessons:
        js = f"/{'static/dist'}/{lessons['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{lessons['static/dist']['input.css']}"
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
    if 'static/dist' in lessons:
        js = f"/{'static/dist'}/{lessons['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{lessons['static/dist']['input.css']}"
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
    if 'static/dist' in lessons:
        js = f"/{'static/dist'}/{lessons['static/dist']['input.js']}"
        css = f"/{'static/dist'}/{lessons['static/dist']['input.css']}"
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


# # deprecated
# def getVersion(lesson_uid, topic_name, version_uid):
#     # lesson = Lessons.query.filter_by(uid=lesson_uid).first()
#     # if lesson is None:
#     #     return jsonify(
#     #         {'status': 'fail', 'message': 'lesson does not exist'})
#     # topic = Topics.query.filter_by(
#     #     lesson=lesson, name=topic_name).first()
#     # if topic is None:
#     #     return jsonify(
#     #         {'status': 'fail', 'message': 'topic does not exist'})
#     # version = Versions.query.filter_by(
#     #     topic_id=topic.id, uid=version_uid).first()
#     # if version is None:
#     #     return jsonify(
#     #         {'status': 'fail', 'message': 'version does not exist'})
#     version = db.session.query(Versions).join(Topics).join(Lessons).filter(
#         Lessons.uid == lesson_uid,
#         Topics.name == topic_name,
#         Versions.uid == version_uid).first()
#     if version is None:
#         return 'lesson/topic/version does not exist'
#         # return jsonify(
#         #     {'status': 'fail', 'message': 'lesson/topic/version exist'})
#     return version


# # deprecated
# def getLinkVersion(version_id, url_hash):
#     link_version = db.session.query(LinkVersions).join(Links).filter(
#         Links.url_hash == url_hash,
#         Versions.id == version_id).first()
#     # link = Links.query.filter_by(url_hash=url_hash)
#     # if link is None:
#     #     return jsonify(
#     #         {'status': 'fail', 'message': 'link does not exist'})

#     # link_version = LinkVersions.query.filter_by(
#     #     version_id=version_uid, link_id=link.id)
#     if link_version is None:
#         return 'link/version does not exist'
#         # return jsonify(
#         #     {'status': 'fail', 'message': 'link/version does not exist'})
#     return link_version


# # deprecated
# @check_confirmed
# @app.route('/rate/<lesson_uid>/<topic_name>/<version_uid>/<rating_value>')
# def rate(lesson_uid, topic_name, version_uid, rating_value):
#     # print(lesson_uid, topic_name, version_uid, rating_value)
#     status = 'not logged in'
#     if current_user.is_authenticated:
#         version = getVersion(lesson_uid, topic_name, version_uid)
#         if isinstance(version, str):
#             return jsonify({'status': 'fail', 'message': version})

#         user_rating = Ratings.query.filter_by(
#             version=version, user=current_user).first()
#         if user_rating is None:
#             user_rating = Ratings(user=current_user, version=version)
#             db.session.add(user_rating)
#         if rating_value not in ['1', '2', '3', '4', '5']:
#             return jsonify({'status': 'fail', 'message': 'invalid rating'})
#         if user_rating.rating != rating_value:
#             user_rating.rating = rating_value

#         generic_rating = AllRatings(user=current_user, version=version)
#         generic_rating.timestamp = datetime.datetime.now()
#         generic_rating.rating = rating_value

#         page = request.args.get('page')
#         pages = request.args.get('pages')
#         if page is not None and pages is not None \
#            and isInt(page) and isInt(pages) \
#            and int(page) < int(pages):
#             generic_rating.page = page
#             generic_rating.pages = pages

#         db.session.add(generic_rating)
#         db.session.commit()
#         status = 'done'
#     return jsonify({'status': status})


# # deprecated
# @check_confirmed
# @app.route('/ratelink/<lesson_uid>/<topic_name>/<version_uid>/<url_hash>/<rating_value>')  # noqa
# def rateLink(lesson_uid, topic_name, version_uid, url_hash, rating_value):
#     # print(lesson_uid, topic_name, version_uid, rating_value)
#     status = 'not logged in'
#     if current_user.is_authenticated:
#         version = getVersion(lesson_uid, topic_name, version_uid)
#         if isinstance(version, str):
#             return jsonify({'status': 'fail', 'message': version})

#         link_version = getLinkVersion(version.id, url_hash)
#         if isinstance(link_version, str):
#             return jsonify({'status': 'fail', 'message': link_version})

#         user_rating = LinkRatings.query.filter_by(
#             link_version_id=link_version.id, user_id=current_user.id).first()
#         if user_rating is None:
#             user_rating = LinkRatings(
#                 user_id=current_user.id, link_version_id=link_version.id)
#             db.session.add(user_rating)

#         if rating_value not in ['1', '2', '3', '4', '5']:
#             return jsonify(
#                 {'status': 'fail', 'message': 'invalid rating'})
#         if user_rating.rating != rating_value:
#             user_rating.rating = rating_value

#         generic_rating = AllLinkRatings(
#             user_id=current_user.id, link_version_id=link_version.id)
#         generic_rating.timestamp = datetime.datetime.now()
#         generic_rating.rating = rating_value

#         page = request.args.get('page')
#         pages = request.args.get('pages')
#         if page is not None and pages is not None \
#            and isInt(page) and isInt(pages) \
#            and int(page) < int(pages):
#             generic_rating.page = page
#             generic_rating.pages = pages

#         db.session.add(generic_rating)
#         db.session.commit()
#         status = 'done'
#     return jsonify({'status': status})


@app.route('/getTopicRatings/', defaults={'path': ''})  # noqa
@app.route('/getTopicRatings/<path:path>')
def get_topic_ratings(path):
    if path not in topic_index:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})
    ratings = {}
    approaches = topic_index[path]['approaches']
    for approach_uid, approach in approaches.items():
        if approach_uid not in ratings:
            ratings[approach_uid] = {}
        for version_uid, versions in approach.items():
            if version_uid not in ratings[approach_uid]:
                ratings[approach_uid][version_uid] = {}
            ratings[approach_uid][version_uid] = {
                'num': 10,
                'high': 3,
                'ave': 2.3,
                'user': 'not logged in'
            }
            if current_user.is_authenticated:
                ratings[approach_uid][version_uid]['user'] = 4
    return jsonify({'status': 'ok', 'ratings': ratings})


@app.route('/getVersionRating/<path:path>')
def get_version_rating(path):
    if path not in version_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})

    rating = {}
    rating = {
        'num': 10,
        'high': 2,
        'ave': 2.3,
        'user': 'not logged in'
    }
    if current_user.is_authenticated:
        rating['user'] = 4
    return jsonify({'status': 'ok', 'rating': rating})


@check_confirmed
@app.route('/setVersionRating/<path:path>')
def set_version_rating(path):
    if not current_user.is_authenticated:
        return jsonify({'status': 'fail', 'message': 'no logged in'})
    if path not in version_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})
    # set rating
    rating = request.args.get('rating')
    if rating is None:
        return jsonify({'status': 'fail', 'message': 'no rating'})
    # return new stats
    existing_rating = VersionRatings.query.filter_by(
        user=current_user, version_uid=path).first()
    if existing_rating:
        existing_rating.rating = rating
    else:
        new_rating = VersionRatings(
            user=current_user, version_uid=path, rating=rating)
        db.session.add(new_rating)
    db.session.commit()
    return get_version_rating(path)


def update_version_rating_cache(version_uid):
    rating = VersionRatings.query.filter_by(version_uid=version_uid).all()


@app.route('/getLinkRatings/<path:path>')
def get_link_ratings(path):
    if path not in link_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})

    ratings = []
    for link in link_list[path]:
        # num, high, ave, user
        ratings.append([4, 2, 2.3, 0])
        if current_user.is_authenticated:
            ratings[-1][3] = 3
    return jsonify({'status': 'ok', 'ratings': ratings})


@app.route('/setLinkRating/<path:path>')
def set_link_rating(path):
    if not current_user.is_authenticated:
        return jsonify({'status': 'fail', 'message': 'no logged in'})
    if path not in link_list:
        return jsonify({'status': 'fail', 'message': 'path does not exist'})

    rating = request.args.get('rating')
    hashStr = request.args.get('hash')
    existing_rating = LinkRatings.query.filter_by(
        user=current_user, version_uid=path, link_hash=hashStr).first()
    if existing_rating:
        existing_rating.rating = rating
    else:
        new_rating = LinkRatings(
            user=current_user, version_uid=path,
            rating=rating, link_hash=hashStr)
        db.session.add(new_rating)
    db.session.commit()
    print(rating, hashStr)
    return jsonify({'status': 'ok', 'rating': [0, 3, 2.3, int(rating)]})


# # deprecated
# @check_confirmed
# @app.route('/rating/<lesson_uid>/<topic_name>/<version_uid>')
# def get_rating(lesson_uid, topic_name, version_uid):
#     num_ratings = 0
#     ave_rating = 0
#     num_high_ratings = 0
#     user_rating_value = 'not logged in'

#     version = getVersion(lesson_uid, topic_name, version_uid)
#     if isinstance(version, str):
#         return jsonify({'status': 'fail', 'message': version})

#     ratings = Ratings.query.filter_by(version=version).all()
#     if ratings is None:
#         ratings = []
#     num_ratings = len(ratings)
#     sum_ratings = 0
#     num_high_ratings = 0
#     for r in ratings:
#         sum_ratings += r.rating
#         if r.rating >= 4:
#             num_high_ratings += 1
#     ave_rating = 0
#     if num_ratings > 0:
#         ave_rating = round(sum_ratings / num_ratings, 1)

#     if current_user.is_authenticated:
#         user_rating = Ratings.query.filter_by(
#             user=current_user, version=version).first()
#         if user_rating is None:
#             user_rating_value = 'not rated'
#         else:
#             user_rating_value = user_rating.rating
#     return jsonify({
#         'status': 'ok',
#         'message': '',
#         'userRating': user_rating_value,
#         'numRatings': num_ratings,
#         'aveRating': ave_rating,
#         'numHighRatings': num_high_ratings})


# # deprecated
# @check_confirmed
# @app.route('/linkrating/<lesson_uid>/<topic_name>/<version_uid>/<url_hash>')
# def get_link_rating(lesson_uid, topic_name, version_uid, url_hash):
#     num_ratings = 0
#     ave_rating = 0
#     num_high_ratings = 0
#     user_rating_value = 'not logged in'

#     version = getVersion(lesson_uid, topic_name, version_uid)
#     if isinstance(version, str):
#         return jsonify({'status': 'fail', 'message': version})

#     link_version = getLinkVersion(version.id, url_hash)
#     if isinstance(version, str):
#         return jsonify({'status': 'fail', 'message': version})

#     ratings = LinkRatings.query.filter_by(
#         link_version_id=link_version.id).all()
#     if ratings is None:
#         ratings = []
#     num_ratings = len(ratings)
#     sum_ratings = 0
#     num_high_ratings = 0
#     for r in ratings:
#         sum_ratings += r.rating
#         if r.rating >= 4:
#             num_high_ratings += 1
#     ave_rating = 0
#     if num_ratings > 0:
#         ave_rating = round(sum_ratings / num_ratings, 1)

#     if current_user.is_authenticated:
#         user_rating = LinkRatings.query.filter_by(
#             user_id=current_user.id, link_version_id=link_version.id).first()
#         if user_rating is None:
#             user_rating_value = 'not rated'
#         else:
#             user_rating_value = user_rating.rating
#     return jsonify({
#         'status': 'ok',
#         'message': '',
#         'userRating': user_rating_value,
#         'numRatings': num_ratings,
#         'aveRating': ave_rating,
#         'numHighRatings': num_high_ratings})
