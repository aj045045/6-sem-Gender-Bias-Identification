from mongoengine import Document, StringField, DateTimeField, EmailField,IntField
from datetime import datetime

USER_CHOICE = ((0, "admin"), (1, "user"))


class UserModel(Document):
    """REVIEW - UserModel ( user )
    Args:
        Document (Class): Document class of model creation
    """
    _user_name = StringField(db_field="user_name",max_length=10)
    _full_name = StringField(db_field="full_name",max_length=40)
    _email_id = EmailField(db_field="email_id",required=True, unique=True,max_length=100)
    _password = StringField(db_field="password")
    _logged_in = DateTimeField(db_field="logged_in",default=datetime.now())
    _last_logged_in = DateTimeField(db_field="last_logged_in",default=datetime.now())
    _user_type = IntField(db_field="user_type",choices=USER_CHOICE)
    
    meta = {'collection': 'user' }

    @property
    def user_name(self):
        return self._user_name

    @user_name.setter
    def user_name(self, value):
        self._user_name = value

    @property
    def full_name(self):
        return self._full_name

    @full_name.setter
    def full_name(self, value):
        self._full_name = value

    @property
    def email_id(self):
        return self._email_id

    @email_id.setter
    def email_id(self, value):
        self._email_id = value

    @property
    def password(self):
        return self._password

    @password.setter
    def password(self, value):
        self._password = value

    @property
    def logged_in(self):
        return self._logged_in

    @logged_in.setter
    def logged_in(self, value):
        self._logged_in = value

    @property
    def last_logged_in(self):
        return self._last_logged_in

    @last_logged_in.setter
    def last_logged_in(self, value):
        self._last_logged_in = value

    @property
    def user_type(self):
        return self._user_type

    @user_type.setter
    def user_type(self, value):
        self._user_type = value
        
    def to_dict(self):
        return {
            "user_name": self.user_name,
            "full_name": self.full_name,
            "email_id": self.email_id,
            "user_type": self.user_type,
            "logged_in":self.logged_in.strftime('%Y-%m-%d %H:%M:%S.%f %Z'),
            "last_logged_in": self.last_logged_in.strftime('%Y-%m-%d %H:%M:%S.%f %Z')
        }