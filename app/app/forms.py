from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError
from wtforms.validators import Length
from app.models import User


class LoginForm(FlaskForm):
    username = StringField('Username or Email: ', validators=[DataRequired()])
    password = PasswordField('Password: ', validators=[DataRequired()])
    # remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')


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
    submit = SubmitField('Create Account')

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user is not None:
            raise ValidationError('Username already exists.')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
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
