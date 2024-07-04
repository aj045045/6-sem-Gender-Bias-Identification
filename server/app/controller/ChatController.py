from flask import Blueprint,request
from flask_restful import Api,Resource
from app.service.ChatService import ChatService



class ChatController(Resource):
    
    
    def post(self):
        query = request.get_json()
        return ChatService.provide_response(query)
    
ChatController_bp = Blueprint("chat",__name__)
api = Api(ChatController_bp)

api.add_resource(ChatController,"/chat")