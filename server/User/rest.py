from flask_restful import Resource
from flask import request
from .task import UserTask

# REVIEW - Create Restful model User


class User(Resource):

    def get(self):
        return

    def post(self):
        json_data = request.get_json()
        user_name = json_data['user_name']
        full_name = json_data['full_name']
        email = json_data['email_id']
        password = json_data['password']
        user_type = json_data['user_type']
        obj_usr = UserTask()
        obj_usr._user_name = user_name
        obj_usr._full_name = full_name
        obj_usr._email_id = email
        obj_usr._password = password
        obj_usr._user_type = user_type
        return obj_usr.register_user()

    def put(self):
        return

    def delete(self):
        return
