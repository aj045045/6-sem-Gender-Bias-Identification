from flask_restful import Api
from .rest import User
from flask import Blueprint

user_bp = Blueprint('usr', __name__)
api = Api(user_bp)

# REVIEW - The URL route for mapping with the request
api.add_resource(User, '/user')
