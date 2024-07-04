from .model import UserDB
from datetime import datetime
from flask import jsonify


class UserTask():
    def __init__(self):
        self.__user_name = ""
        self.__full_name = ""
        self.__email_id = ""
        self.__password = ""
        self.__user_type = None
        self.__last_logged_in = datetime.now()
        self.__logged_in = datetime.now()

    @property
    def _user_type(self):
        return self.__user_type

    @_user_type.setter
    def _user_type(self, value):
        self.__user_type = value

    @property
    def _user_name(self):
        return self.__user_name

    @_user_name.setter
    def _user_name(self, value):
        self.__user_name = value

    @property
    def _full_name(self):
        return self.__full_name

    @_full_name.setter
    def _full_name(self, value):
        self.__full_name = value

    @property
    def _email_id(self):
        return self.__email_id

    @_email_id.setter
    def _email_id(self, value):
        self.__email_id = value

    @property
    def _password(self):
        return self.__password

    @_password.setter
    def _password(self, value):
        self.__password = value

    @property
    def _last_logged_in(self):
        return self.__last_logged_in

    @_last_logged_in.setter
    def _last_logged_in(self, value):
        self.__last_logged_in = value

    @property
    def _logged_in(self):
        return self.__logged_in

    @_logged_in.setter
    def _logged_in(self, value):
        self.__logged_in = value

    def register_user(self) -> dict:
        user = UserDB(
            user_name=self._user_name,
            full_name=self._full_name,
            email_id=self._email_id,
            password=self._password,
            logged_in=self._logged_in,
            last_logged_in=self._last_logged_in,
            user_type=str(self._user_type)
        )

        if user.save() == None:
            raise Exception("Database Connection Error try after sometime")
        return jsonify({
            'status': 'success',
            'message': 'Thanks for Submission'
        })
