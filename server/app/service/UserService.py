from hashlib import sha256
from ..repository.UserRepo import UserRepo
from flask import session

class UserService():
    """REVIEW - (UserService) Class contain static method to handle user Request

    Raises:
        Exception: Raise Exception then value in None
    Returns:
        json : Response Json after validation
    """
    @classmethod
    def __encryptPassword(cls,password:str)->str:
        """NOTE - Encrypt Password handler

        Args:
            password (str): User password 
        Raises:
            Exception: Value is none
        Returns:
            str: Encrypted password
        """
        if password is None:
            raise Exception("Password is Empty")
        sha256_hash = sha256()
        sha256_hash.update(password.encode())
        encryptPassword = sha256_hash.hexdigest()
        return encryptPassword
        
    @staticmethod
    def register_user(user_name:str,full_name:str,email_id:str,password:str,user_type:int)->dict:
        """NOTE - Register user handler

        Args:
            user_name (str): User Name
            full_name (str): Full Name
            email_id (str): Email ID
            password (str): Password
            user_type (int): User Type
        Returns:
            dict: Validation of user request
        """
        user = UserRepo.create(user_name,full_name,email_id,UserService.__encryptPassword(password),user_type)
        return {
            'status': 'success',
            'message': 'Thanks for Submission',
            'data':user
        }
        
    @staticmethod
    def sign_in_as_user_name(user_name:str,password:str)->dict:
        """NOTE - Sign In with User Name

        Args:
            user_name (str): User Name
            password (str): Password
        Returns:
            dict: Validation of user request
        """
        user = UserRepo.sign_in_by_user_name(user_name,UserService.__encryptPassword(password))
        session['user'] = user   
        return {
            "status":"success",
            "message":"Thanks for sign in",
            "data":user
        }
        
    @staticmethod
    def sign_in_as_email_id(user_name:str,password:str)->dict:
        """NOTE - Sign In with Email Id
        
        Args:
            user_name (str): User Name
            password (str): Password
        Returns:
            dict: Validation of user Request
        """
        
        user = UserRepo.sign_in_by_email(user_name,UserService.__encryptPassword(password))
        session['user'] = user  
        return {
            "status":"success",
            "message":"Thanks for sign in",
            "data":user
        }
        
    @staticmethod
    def get_sign_in_detail():
        if "user" in session:
            return {
            "status":"success",
            "message":"Login Detail",
            "data":{
                "login":True,
                "user":session['user'],
                }
            }
        else:
            return {
            "status":"success",
            "message":"Login Detail",
            "data":{
                "login":False,
                }
            }
        
    @staticmethod
    def logout_user():
        session.pop('user',None)
        if 'user' not in session:
            return {
            "status":"success",
            "message":"Logout Successful",
            "data":False
        }
        else:
            return {
            "status":"success",
            "message":"Logout unsuccessful",
            "data":True
        }