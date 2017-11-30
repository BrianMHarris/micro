from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, validators

class UserForm(FlaskForm):
    username = StringField('username', [validators.length(min=1)])
    password = PasswordField('password', [
      validators.DataRequired(),
      validators.EqualTo('confirm', message="Passwords must match")
    ])

class DeleteForm(FlaskForm):
    pass
