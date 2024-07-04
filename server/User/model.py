from mongoengine import Document, StringField, DateTimeField, EmailField

USER_CHOICE = (("0", "admin"), ("1", "user"))


class UserDB(Document):
    user_name = StringField(max_length=10)
    full_name = StringField(max_length=80)
    email_id = EmailField(required=True, unique=True)
    password = StringField()
    logged_in = DateTimeField()
    last_logged_in = DateTimeField()
    user_type = StringField(choices=USER_CHOICE)
    meta = {
        'collection': 'user'  # Specify the collection name here
    }
