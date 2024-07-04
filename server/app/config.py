from app.controller.ChatController import ChatController_bp
from app.controller.UserController import UserController_bp
from app.controller.AdminController import AdminController_bp
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_session import Session

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "09145562281e37b0413fa153b68a5245c6a4fd511775865b6d73abd710119d66"

# REVIEW - MongoDB Configuration
app.config['MONGODB_SETTINGS'] = {
    'db': 'gender-bias',
    'host': 'mongodb://localhost',
    'port': 27017
}

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = '/tmp/flask_session/'
app.config['SESSION_COOKIE_NAME'] = 'gender-bias'

Session(app)


@app.before_request
def Before_Request():
    """REVIEW - Before Request Handler

    Raises:
        Exception: Check if it is a json format data or not
    """
    if request.method in ['PUT', 'DELETE', 'POST']:
        if request.headers['Content-Type'] != 'application/json':
            raise Exception("Content Type must be application/json")

@app.after_request
def convert_to_json(response):
    """REVIEW - Response Handler

    Args:
        response (dict): Get Response as dict
    Returns:
        response : Convert the dict response to json by parsing using jsonify 
    """
    if isinstance(response.get_json(), dict):
        response.set_data(jsonify(response.get_json()).data)
    return response

@app.errorhandler(Exception)
def Error_Handling(error):
    """REVIEW - Error Handler

    Args:
        error (string): When Raise and exception with a string
    Returns:
        json : Convert the string into dict and parse it using jsonify
    """
    data = {
        "status": "alert",
        "message": str(error)
    }
    return jsonify(data)


app.register_blueprint(UserController_bp)
app.register_blueprint(ChatController_bp)
app.register_blueprint(AdminController_bp)
