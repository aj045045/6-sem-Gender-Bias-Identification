> 202018

> Flask-JWT-Extended / Flask-JWT-Simple <br>
> Flask-Limiter <br>
> Flask-Talisman <br>
> Flask-RESTful
> Flask-Login

- Add JWT Secret Key : `app.config['JWT_SECRET_KEY'] = 'your_strong_secret_key_here`
- Add JWT Algorithm :`app.config['JWT_ALGORITHM'] = 'HS256'  # Specify the algorithm explicitly`
- Add token expiration (TTL, RTTL) as short as possible :`app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)  # Example: 15 minutes expiration`
- Keep payload small :`jwt_payload_handler = lambda x: {'user_id': x.id}  # Example: Only include user ID`

```
Validate content-type on request header
Client-side validation libraries like Formik or Yup
Use @app.before_request and use UUID (uuid or uuid4 )
```

## Add for MIME security

```
@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'deny'
    response.headers['Content-Security-Policy'] = "default-src 'none'"
    return response
```

## Use this form data validation

```
@app.route('/endpoint')
def endpoint():
    response = make_response('Your content')
    response.headers['Content-Type'] = 'text/plain'
    return response

```

## Use Single Error handling

```
@app.errorhandler(Exception)
```

## Add unit and integration testing in flask

## Run security analysis tools in system

database , classes, url, rest classes

> app

```shell

    # Use the nested function to create and write content into files
    writeContent "model.py" "from mongoengine import Document, StringField

class ${MODEL}DB(Document):
    meta = {
        'collection': '${LOWER}'  # Specify the collection name here
    }"

    writeContent "rest.py" "from flask_restful import Resource
from flask import request
from .task import ${MODEL}Task

#REVIEW - Create Restful model ${MODEL}

class ${MODEL}(Resource):

    def get(self):
        return

    def post(self):
        return

    def put(self):
        return

    def delete(self):
        return"

    writeContent "task.py" "from .model import ${MODEL}DB
class ${MODEL}Task():
    pass
    "

    writeContent "url.py" "from flask_restful import Api
from .rest import ${MODEL}
from flask import Blueprint

${LOWER}_bp = Blueprint('{LOWER}',__name)
api = Api(${LOWER}_bp)

#REVIEW - The URL route for mapping with the request
api.add_resource(${MODEL}, '/${LOWER}')"
```

## Process

Input data
add field named output
do pre process and store in output field

Print in this format:

Label 1: JUDGEMENTAL / **
Label 2: STEREOTYPING-DOMINANCE / **
Input :
Pre-Process :
Key and Index :
Choose Key :

IDEOLOGICAL-INEQUALITY
STEREOTYPING-DOMINANCE
OBJECTIFICATION
SEXUAL-VIOLENCE
MISOGYNY-NON-SEXUAL-VIOLENCE
