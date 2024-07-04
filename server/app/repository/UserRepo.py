from ..model.UserModel import UserModel
from datetime import datetime

class UserRepo():
    """REVIEW - (UserRepo) Manage User Model and response the user objects in dict

    Raises:
        Exception: User Validation
    Returns:
        dict: Contain user data
    """
    @staticmethod
    def find_all()->dict:
        """NOTE - Find all users

        Raises:
            Exception: If no user exists
        Returns:
            dict: User data
        """
        users = UserModel.objects()
        if users == None:
            raise Exception("Users not found")
        return users.to_dict()
    
    @staticmethod
    def find_by_email(email_id:str,password:str)->dict:
        """NOTE - Find user by Email

        Args:
            email_id (str): Email ID
            password (str): Password
        Raises:
            Exception: If user not Exists
        Returns:
            dict: User data
        """
        user = UserModel.objects(_email_id=email_id,_password=password)
        if user == None:
            raise Exception("User not found please sign up first")
        return user.to_dict()
    
    @staticmethod
    def find_by_user_name(user_name:str,password:str)->dict:
        """NOTE - Find user by User Name

        Args:
            user_name (str): User Name
            password (str): Password
        Raises:
            Exception: User Not Found
        Returns:
            dict: User data
        """
        user =  UserModel.objects(_user_name=user_name,_password=password).first()
        if user == None:
            raise Exception("User not found please sign up first")
        return user.to_dict()
    
    @staticmethod
    def create(user_name:str,full_name:str,email_id:str,password:str,user_type:int)->dict:
        """NOTE - Create User using user Details

        Args:
            user_name (str): User Name
            full_name (str): Full Name
            email_id (str): Email ID
            password (str): Password
            user_type (int): User Type ( 0 = admin , 1 = user )
        Raises:
            Exception: User Not found
            Exception: Data base not connect while saving data to DB
        Returns:
            dict: User Data
        """
        user = UserModel()
        if user == None:
            raise Exception("User not Found")
        user.user_name = user_name
        user.full_name = full_name
        user.email_id = email_id
        user.password = password
        user.user_type = user_type
        if user.save() == None:
            raise Exception("Database Connection Error try after sometime")
        return user.to_dict()

    
    @staticmethod
    def delete_by_email(email_id:str)->dict:
        """NOTE - Delete User by Email ID

        Args:
            email_id (str): Email ID
        Raises:
            Exception: If user does not exist
        Returns:
            dict: User data
        """
        user =  UserModel.objects(_email_id=email_id).delete()
        if user == None:
            raise Exception("User is not available")
        return user
    
    @staticmethod
    def sign_in_by_email(email_id:str,password:str)->dict:
        """NOTE - Sign In by Email
        
        Args:
            email_id (str): Email ID
            password (str): Password
        Raises:
            Exception: If user does not exists
        Returns:
            dict: User Data
        """
        user = UserModel.objects(_email_id=email_id, _password=password).first()
        if user == None:
            raise Exception("User not found please sign up first")
        UserRepo.__update_last_logged_in_by_email(user)
        return user.to_dict()
    
    @staticmethod
    def sign_in_by_user_name(user_name: str, password: str) -> dict:
        """NOTE - Sign In by User Name

        Args:
            user_name (str): User Name
            password (str): Password
        Raises:
            Exception: If user Does not exists
        Returns:
            dict: User Data
        """
        user = UserModel.objects(_user_name=user_name, _password=password).first()
        if user is None:
            raise Exception("User not found, please sign up first")
        UserRepo.__update_last_logged_in_by_email(user)
        return user.to_dict()
    
    
    @classmethod
    def __update_last_logged_in_by_email(cls, user:UserModel) -> None:
        """NOTE - Update user logged in date

        Args:
            user (UserModel): User data
        Raises:
            Exception: If DB is not Connected
        """
        user.last_logged_in = datetime.now()
        if user.save() is None:
            raise Exception("Database Connection Error, try again later")