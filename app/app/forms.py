from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Email


class LoginForm(FlaskForm):
    username = StringField('Username or Email: ', validators=[DataRequired()])
    password = PasswordField('Password: ', validators=[DataRequired()])
    # remember_me = BooleanField('Remember Me')
    submit = SubmitField('Sign In')


class CreateAccountForm(FlaskForm):
    username = StringField('Username:', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password: ', validators=[DataRequired()])
    repeat_password = PasswordField('Repeat Password: ', validators=[DataRequired()])
    submit = SubmitField('Create Account')
