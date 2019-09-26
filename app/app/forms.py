from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms import BooleanField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError
# from wtforms.validators import Length
from app.models import Users
from app.tools import hash_str_with_pepper, format_email

# import pdb


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
        if len(username.data) > 32:
            raise ValidationError('Username max length is 32 characters')
        user = Users.query.filter_by(
            username_hash=hash_str_with_pepper(username.data.lower())).first()
        # user = Users.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Username already exists.')

    def validate_email(self, email):
        user = Users.query.filter_by(
            email_hash=hash_str_with_pepper(format_email(email.data))).first()
        if user is not None:
            raise ValidationError('Email address already in use.')

    def validate_password(self, password):
        if len(password.data) < 8:
            raise ValidationError('Password must be at least 8 characters')


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
        if len(password.data) < 8:
            raise ValidationError('Password must be at least 8 characters')


class ConfirmAccountMessageForm(FlaskForm):
    submit = SubmitField('Resend Confirmation Email')
