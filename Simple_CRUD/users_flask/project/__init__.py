from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_modus import Modus

app = Flask(__name__)
modus = Modus(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://localhost/01_users'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'supa secret'
db = SQLAlchemy(app)

#import a blueprint that we will create
from project.users.views import users_blueprint

#register our blueprint with the application
app.register_blueprint(users_blueprint, url_prefix='/users')

@app.route('/')
def root():
    return "Users Blueprint"
