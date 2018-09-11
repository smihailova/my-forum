from flask import Flask, render_template

app = Flask(__name__, static_folder='../build', template_folder='../src/assets')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
