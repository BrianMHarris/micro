from project import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.Text)

    def __init__(self, user_name):
        self.user_name = user_name
