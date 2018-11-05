from index import ma
from models import User, Post, Comment

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User
        fields = ('id', 'name', 'password', 'email', '_links')

    _links = ma.Hyperlinks({
        'self': ma.URLFor('user_detail', id='<id>'),
        'collection': ma.URLFor('users')
    })

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class PostSchema(ma.ModelSchema):
    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'text', 'published_at', 'is_edited', '_links')

    author = ma.HyperlinkRelated('author_detail')

    _links = ma.Hyperlinks({
        'self': ma.URLFor('post_detail', id='<id>'),
        'collection': ma.URLFor('posts')
    })

post_schema = PostSchema()
posts_schema = PostSchema(many=True)

class CommentSchema(ma.ModelSchema):
    class Meta:
        model = Comment
        fields = ('id', 'post', 'text', 'is_edited', 'added_at', 'author', '_links')

    author = ma.HyperlinkRelated('user_detail')
    post = ma.HyperlinkRelated('post_detail')

    _links = ma.Hyperlinks({
        'self': ma.URLFor('comment_detail', id='<id>'),
        'collection': ma.URLFor('comments')
    })

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
