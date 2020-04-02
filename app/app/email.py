from flask_mail import Message
from app import mail
from flask import render_template
from app import app
from threading import Thread


def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    # mail.send(msg)
    Thread(target=send_async_email, args=(app, msg)).start()


def can_send_email():
    # print(app.config['MAIL_PASSWORD'])
    # print(app.config['MAIL_USERNAME'])
    # print(app.config['MAIL_SERVER'])
    # print(app.config['MAIL_SENDER'])
    # print(app.config['TESTING'])
    # print(app.config['MAIL_SUPPRESS_SEND'])

    if app.config['MAIL_PASSWORD'] == '' \
       or app.config['MAIL_USERNAME'] == '' \
       or app.config['MAIL_SERVER'] == '' \
       or app.config['MAIL_SENDER'] == '':
        return False
    return True


def send_password_reset_email(user):
    if not can_send_email():
        app.logger.error('MAIL environment variable(s) not set')
        app.logger.error('No mail sent to user.email')
        return
    token = user.get_reset_password_token()
    email = user.get_email()
    send_email('This I Get Account Password Reset',
               sender=app.config['MAIL_SENDER'],
               recipients=[email],
               text_body=render_template('email/reset_password.txt',
                                         user=user, token=token),
               html_body=render_template('email/reset_password.html',
                                         user=user, token=token))


def send_confirm_account_email(user):
    if not can_send_email():
        app.logger.error('MAIL environment variable(s) not set')
        app.logger.error('No mail sent to user.email')
        return
    token = user.get_account_confirmation_token()
    email = user.get_email()
    # print(email)
    send_email('This I Get Account Email Confirmation',
               sender=app.config['MAIL_SENDER'],
               recipients=[email],
               text_body=render_template('email/confirm_account.txt',
                                         user=user, token=token),
               html_body=render_template('email/confirm_account.html',
                                         user=user, token=token))


def send_change_email_email(user, email_address):
    if not can_send_email():
        app.logger.error('MAIL environment variable(s) not set')
        app.logger.error('No mail sent to user.email')
        return
    token = user.get_change_email_token(email_address)
    print(email_address)
    send_email('This I Get Account Email Change Confirmation',
               sender=app.config['MAIL_SENDER'],
               recipients=[email_address],
               text_body=render_template('email/change_email.txt',
                                         user=user, token=token),
               html_body=render_template('email/change_email.html',
                                         user=user, token=token))
