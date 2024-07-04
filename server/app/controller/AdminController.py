from flask import Blueprint,request
from flask_restful import Api,Resource
from app.service.AdminService import AdminService



class AdminController(Resource):
    
    
    def get(self):
        query = request.args.get('query')
        return AdminService.filter_list(query)
    
    def post(self):
        keyword = request.get_json()
        return  AdminService.add_selected_keyword(keyword)
    
AdminController_bp = Blueprint("admin",__name__)
api = Api(AdminController_bp)

api.add_resource(AdminController,"/admin")