> Flask-JWT-Extended / Flask-JWT-Simple <br>
> Flask-Limiter <br>
> Flask-Talisman <br>
> Flask-RESTful
> Flask-Login

-   Add JWT Secret Key : `app.config['JWT_SECRET_KEY'] = 'your_strong_secret_key_here`
-   Add JWT Algorithm :`app.config['JWT_ALGORITHM'] = 'HS256'  # Specify the algorithm explicitly`
-   Add token expiration (TTL, RTTL) as short as possible :`app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)  # Example: 15 minutes expiration`
-   Keep payload small :`jwt_payload_handler = lambda x: {'user_id': x.id}  # Example: Only include user ID`

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
>
>
>