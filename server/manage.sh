#!/bin/bash

#!/bin/sh

createFolder() {
    local folder_name="$1"
    local LOWER=$(echo "$MODEL" | tr '[:upper:]' '[:lower:]')

    # Create folder
    mkdir "$folder_name" || {
        echo "Failed to create folder '$folder_name'."
        return 1
    }

    # Check if folder creation was successful
    echo "Model directory '$folder_name' created successfully."

    # Nested function to write content into files
    writeContent() {
        local file_name="$1"
        local content="$2"
        local file_path="$folder_name/$file_name"

        cat >"$file_path" <<EOF
$content
EOF
        echo "Content written into $file_path."
    }

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
}

# Function to run the script
scriptRun() {
    python "main.py"
}

# Export Python Requirments file
exportPythonFile(){
    pip freeze > requirements.txt
}

# Remove All Pycache folder 
removePycache() {
    find . -type d -name "__pycache__" -exec rm -rf {} +
}

# Main script

# Check if argument is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <model -m| runserver -r>"
    exit 1
fi

# Prompt user for model name if creating folder and files
if [ "$1" = "-m" ]; then
    read -p "Enter the model to be created: " MODEL
    createFolder "$MODEL"
elif [ "$1" = "-r" ]; then
    scriptRun
elif [ "$1" = "-ex" ]; then
    exportPythonFile
elif [ "$1" = "-rmpy" ]; then
    removePycache
else
    echo "Invalid argument. Usage: $0 <create|run>"
    exit 1
fi


# Model creation -m
# Export Python Packages list -ex
# Run server -r