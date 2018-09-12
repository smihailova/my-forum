from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()


class BaseModel(db.Model):
    __abstract__ = True

    def __init__(self, *args):
        super(BaseModel, self).__init__(*args)

    def __repr__(self):
        return '%s(%s)' % (self.__class__.__name__, {
            column: value
            for column, value in self._to_dict().items()
        })

    def json(self):
        return {
            column: value if not isinstance(value, datetime.date) else value.strftime('%Y-%m-%d')
            for column, value in self._to_dict().items()
        }


class User(BaseModel, db.Model):
    __tablename__ = 'User'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(20), nullable=False)
    publications = db.relationship('Publication', backref='User', lazy=True)


class Post(BaseModel, db.Model):
    __tablename__ = 'Post'

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Integer, db.ForeignKey('User.id'))
    title = db.Column(db.String(100), nullable=False)
    text = db.Column(db.Text)
    published_on = db.Column(db.Date, server_default=db.func.now())
    comments = db.relationship('Comment', backref='Post', lazy=True)


class Comment(BaseModel, db.Model):
    __tablename__ = 'Comment'

    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.Integer, db.ForeignKey('Post.id'))
    text = db.Column(db.Text)
    is_edited = db.Column(db.Boolean)
    added_on = db.Column(db.Date, server_default=db.func.now())
