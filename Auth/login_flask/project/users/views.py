from flask import g, redirect, render_template, request, url_for, Blueprint, session, flash
from project.users.forms import UserForm
from project.users.models import User
from project import db

from sqlalchemy.exc import IntegrityError
from functools import wraps

users_blueprint = Blueprint(
    'users',
    __name__,
    template_folder='templates'
)

@users_blueprint.before_request
def current_user():
    if session.get('user_id'):
        g.current_user = User.query.get(session['user_id'])
    else:
        g.current_user = None

def ensure_logged_in(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if not session.get('user_id'):
            flash("Please log in first")
            return redirect(url_for('users.login'))
        return fn(*args, **kwargs)
    return wrapper

def ensure_correct_user(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # in the params we have something called id, is it the same as the user logged in?
        if kwargs.get('id') != session.get('user_id'):
            # if not, redirect them back home
            flash("Not Authorized")
            return redirect(url_for('users.welcome'))
        # otherwise, move on with all the arguments passed in!
        return fn(*args, **kwargs)
    return wrapper

@users_blueprint.route('/signup', methods=["GET", "POST"])
def signup():
    form = UserForm(request.form)
    if request.method == "POST" and form.validate():
        try:
            new_user = User(form.data['username'], form.data['password'])
            db.session.add(new_user)
            db.session.commit()
        except IntegrityError as e:
            flash("Invalid submission. Please try again.")
            return render_template('signup.html', form=form)
        return redirect(url_for('users.login'))
    return render_template('signup.html', form=form)

@users_blueprint.route('/login', methods=["GET", "POST"])
def login():
    form = UserForm(request.form)
    if request.method == "POST":
        if form.validate():
            user = User.authenticate(form.data['username'], form.data['password'])
            if user:
                session['user_id'] = user.id
                flash(g.current_user.username)
                flash("You've successfully logged in!")
                return redirect(url_for('users.welcome'))
        flash("Invalid credentials. Please try again.")
    return render_template('login.html', form=form)

@users_blueprint.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('You have been signed out.')
    return redirect(url_for('users.login'))

@users_blueprint.route('/welcome')
@ensure_logged_in
def welcome():
    return render_template('welcome.html')
