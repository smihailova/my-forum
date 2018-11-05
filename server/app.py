from flask import render_template, request, g
from flask.json import jsonify
from sqlalchemy.exc import IntegrityError
from models import User, Post
from index import db, app
from serializers import user_schema, users_schema, posts_schema, post_schema
from utils.auth import generate_token, requires_auth, verify_token

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

@app.route('/api/users', methods=['GET'])
def users():
    users = User.query.all()
    return jsonify({ 'users': users_schema.dump(users).data })

@app.route('/api/users/login', methods=['POST'])
def login():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming['email'], incoming['password'])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403

@app.route('/api/user', methods=['GET'])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)

@app.route('/api/create_user', methods=['POST'])
def create_user():
    incoming = request.get_json()
    user = User(
        name=incoming['name'],
        email=incoming['email'],
        password=incoming['password']
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message='User with that email already exists'), 409

    new_user = User.query.filter_by(email=incoming['email']).first()

    return jsonify(
        user=new_user,
        token=generate_token(new_user)
    )

@app.route('/api/get_token', methods=['POST'])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming['email'], incoming['password'])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route('/api/is_token_valid', methods=['POST'])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming['token'])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403

@app.route('/api/users/<id>')
def user_detail(id):
    user = User.query.get(id)
    return jsonify({ 'user': user_schema.dump(user).data })

@app.route('/api/posts', methods=['GET'])
def posts():
    posts = Post.query.all()
    return jsonify({ 'posts': posts_schema.dump(posts).data })

@app.route('/api/posts/<id>')
def post_detail(id):
    post = Post.query.get(id)
    return jsonify({ 'post': post_schema.dump(post).data })
