from index import db, bcrypt


class BaseModel(db.Model):
    __abstract__ = True

    def __init__(self, *args):
        super(BaseModel, self).__init__(*args)

    def __repr__(self):
        return '%s(%s)' % (self.__class__.__name__, {
            column: value
            for column, value in self._to_dict().items()
        })

    def _to_dict(self):
        return dict((col, getattr(self, col)) for col in self.__table__.columns.keys())

class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    posts = db.relationship('Post', backref='User', lazy=True)

    def __init__(self, name, password, email):
        self.name = name
        self.email = email
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password).decode('utf-8')

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None


class Post(BaseModel, db.Model):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(100), nullable=False)
    text = db.Column(db.Text)
    published_at = db.Column(db.Date, server_default=db.func.now())
    is_edited = db.Column(db.Boolean)
    comments = db.relationship('Comment', backref='Post', lazy=True)


class Comment(BaseModel, db.Model):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.Integer, db.ForeignKey('post.id'))
    text = db.Column(db.Text)
    is_edited = db.Column(db.Boolean)
    added_at = db.Column(db.Date, server_default=db.func.now())
    author = db.Column(db.Integer, db.ForeignKey('user.id'))
