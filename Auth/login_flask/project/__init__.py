from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_wtf.csrf import CSRFProtect
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/login_flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
bcrypt = Bcrypt(app)
csrf = CSRFProtect(app)
db = SQLAlchemy(app)

from project.users.views import users_blueprint

app.register_blueprint(users_blueprint, url_prefix='/users')
