from User.url import user_bp
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "09145562281e37b0413fa153b68a5245c6a4fd511775865b6d73abd710119d66"
# REVIEW - MongoDB Configuration
app.config['MONGODB_SETTINGS'] = {
    'db': 'gender-bias',
    'host': 'mongodb://localhost',
    'port': 27017
}

# REVIEW - Before Request


@app.before_request
def Before_Request():
    if request.headers['Content-Type'] != 'application/json':
        raise Exception("Content Type must be application/json")

# REVIEW - Error Handling


@app.errorhandler(Exception)
def Error_Handling(error):
    data = {
        "status": "alert",
        "message": str(error)
    }
    return jsonify(data)


app.register_blueprint(user_bp)
