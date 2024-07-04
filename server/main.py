from mongoengine import connect
from app.config import app


def greeting():
    return "<h1>This is a Flask Gender Bias Server</h1>"


app.add_url_rule("/", "greeting", greeting, methods=['GET'])

if __name__ == "__main__":
    connect(db=app.config['MONGODB_SETTINGS']['db'],
            host=app.config['MONGODB_SETTINGS']['host'],
            port=app.config['MONGODB_SETTINGS']['port'])
    app.run(debug=True)
