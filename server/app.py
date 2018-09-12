from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy

from models import db
from config import DevelopmentConfig

app = Flask(__name__, static_folder='../build', template_folder='../src/assets')
app.config.from_object(DevelopmentConfig)
db.init_app(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
