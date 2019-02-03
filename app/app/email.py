from flask_mail import Message
from app import mail
from flask import render_template
from app import app
import os


def send_email(subject, sender, recipients, text_body, html_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.body = text_body
    msg.html = html_body
    mail.send(msg)


def can_send_email():

    if os.environ.get('MAIL_PASSWORD') is None \
       or os.environ.get('MAIL_USERNAME') is None \
       or os.environ.get('MAIL_SERVER') is None \
       or os.environ.get('MAIL_SENDER') is None:
        return False
    return True


def send_password_reset_email(user):
    if not can_send_email():
        print('MAIL_PASSWORD environment variable not set')
        print('No mail sent to user.email')
        return
    token = user.get_reset_password_token()
    email = user.get_email()
    send_email('ThisIGet Account Password Reset',
               sender=app.config['MAIL_SENDER'],
               recipients=[email],
               text_body=render_template('email/reset_password.txt',
                                         user=user, token=token),
               html_body=render_template('email/reset_password.html',
                                         user=user, token=token))


def send_confirm_account_email(user):
    if not can_send_email():
        print('MAIL_PASSWORD environment variable not set')
        print('No mail sent to user.email')
        return
    token = user.get_account_confirmation_token()
    email = user.get_email()
    print(email)
    send_email('ThisIGet Account Email Confirmation',
               sender=app.config['MAIL_SENDER'],
               recipients=[email],
               text_body=render_template('email/confirm_account.txt',
                                         user=user, token=token),
               html_body=render_template('email/confirm_account.html',
                                         user=user, token=token))

# def send_password_reset_email_test(user):
#     token = user.get_reset_password_token()
#     send_email('ThisIGet Account Password Reset',
#                sender='noreply@thisiget.com',
#                recipients=['airladon@gmail.com'],
#                text_body=render_template('email/reset_password.txt',
#                                          user=user, token=token),
#                html_body=render_template('email/reset_password.html',
#                                          user=user, token=token))
