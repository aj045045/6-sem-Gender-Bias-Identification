from flask_restful import Resource,Api
from flask import request,Blueprint
from ..service.UserService import UserService
import re

class UserController(Resource):
    """REVIEW - User RESTful Controller to control user Request 
    
    Args:
        Resource (Class): Extend to create RESTful API
    """
    
    def put(self):
        json_data = request.get_json()
        user_name = json_data['user_name']
        password = json_data['password']
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if re.match(email_pattern, user_name):
            return UserService.sign_in_as_email_id(user_name,password)
        else:
            return UserService.sign_in_as_user_name(user_name,password)

    def post(self):
        json_data = request.get_json()
        user_name = json_data['user_name']
        full_name = json_data['full_name']
        email = json_data['email_id']
        password = json_data['password']
        user_type = json_data['user_type']
        return UserService.register_user(user_name,full_name,email,password,user_type)

    def get(self):
        return UserService.get_sign_in_detail()
    
    def delete(self):
        return UserService.logout_user()
    
UserController_bp = Blueprint('usr', __name__)
api = Api(UserController_bp)
api.add_resource(UserController, '/user')