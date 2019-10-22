from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
# # Uncomment for Privacy
from wtforms import BooleanField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError
# from wtforms.validators import Length
from app.models import Users
from app.tools import hash_str_with_pepper, format_email
# import pdb


def check_password(password):
    if len(password.data) < 8:
        raise ValidationError('Password must be at least 8 characters')


def check_username(username):
    if len(username.data) > 32:
        raise ValidationError('Username max length is 32 characters')
    # if username.data == current_user.get_username():
    #     return
    user = Users.query.filter_by(
        username_hash=hash_str_with_pepper(username.data.lower())).first()
    # user = Users.query.filter_by(username=username.data).first()
    if user is not None:
        raise ValidationError('Username already exists.')


def check_email(email):
    # if email.data == current_user.get_email():
    #     return
    user = Users.query.filter_by(
        email_hash=hash_str_with_pepper(format_email(email.data))).first()
    if user is not None:
        raise ValidationError('Email address already in use.')


class LoginForm(FlaskForm):
    username_or_email = StringField(
        'Username or Email: ',
        validators=[DataRequired()]
    )
    password = PasswordField('Password: ', validators=[DataRequired()])
    # remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')

    def validate_username_or_email(self, username_or_email):
        if len(username_or_email.data) > 32:
            raise ValidationError('Username max length is 32 characters')


class CreateAccountForm(FlaskForm):
    username = StringField('Username:', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField(
        'Password: ',
        validators=[DataRequired()]
    )
    repeat_password = PasswordField(
        'Repeat Password: ',
        validators=[DataRequired(), EqualTo('password')]
    )

    # Uncomment for Privacy
    terms = BooleanField(
        'I have read and agree to the <a href="/terms">Terms of Use</a>',  # noqa
        validators=[DataRequired(
            message="You must agree to create an account"), ])
    privacy = BooleanField(
        'I have read and agree to the <a href="/privacy">Privacy Policy</a>',
        validators=[DataRequired(
            message="You must agree to create an account"), ])
    submit = SubmitField('Create Account')

    def validate_username(self, username):
        check_username(username)

    def validate_email(self, email):
        check_email(email)

    def validate_password(self, password):
        check_password(password)


class ResetPasswordRequestForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Reset Password')


class ResetPasswordForm(FlaskForm):
    password = PasswordField(
        'Password: ',
        validators=[DataRequired()]
    )
    repeat_password = PasswordField(
        'Repeat Password: ',
        validators=[DataRequired(), EqualTo('password')]
    )

    submit = SubmitField('Reset Password')

    def validate_password(self, password):
        check_password(password)


class ConfirmAccountMessageForm(FlaskForm):
    submit = SubmitField('Resend Email')


class AccountSettingsUsernameForm(FlaskForm):
    username = StringField('Username:', validators=[DataRequired()])
    submit_username = SubmitField('Change')

    def validate_username(self, username):
        check_username(username)


class AccountSettingsEmailForm(FlaskForm):
    email = StringField('Email:', validators=[DataRequired(), Email()])
    submit_email = SubmitField('Verify & Change')

    def validate_email(self, email):
        check_email(email)


class AccountSettingsPasswordForm(FlaskForm):
    password = PasswordField(
        'Password: ',
        validators=[DataRequired()]
    )
    repeat_password = PasswordField(
        'Repeat Password: ',
        validators=[DataRequired(), EqualTo('password')]
    )
    submit_password = SubmitField('Change')

    def validate_password(self, password):
        check_password(password)


class AccountSettingsDelete(FlaskForm):
    submit = SubmitField('Delete')


class ConfirmDeleteAccount(FlaskForm):
    submit_save = SubmitField("DO NOT delete my account")
    submit_delete = SubmitField('Delete NOW')
