#!/bin/zsh
declare -a file_array

createFile() {
    local file_name="$1"
    local controller="app/controller/${file_name}Controller.py"
    local model="app/model/${file_name}Model.py"
    local service="app/service/${file_name}Service.py"
    local repo="app/repository/${file_name}Repo.py"

    file_array=("$controller" "$model" "$service" "$repo")
    for file in $file_array[@] ; do
        touch "$file"                 # Create the file
    done
}

writeFile() {
    local file_path="$1"
    local content="$2"
    cat >"$file_path" <<EOF
        $content
EOF
}

show_help() {
    echo "Usage: $0 [-h] [-r] [-c model ] [-e] [-x]"
    echo
    echo "Options:"
    echo "  -h     Display this help message."
    echo "  -r     Run the server."
    echo "  -c     Create the model."
    echo "  -e     Export the python envrioment."
    echo "  -x     Remove Pycache folders."
}

export_enviroment() {
    pip freeze >requirements.txt
}

run_server() {
    trap remove_py SIGINT
    python "main.py"
}

remove_py() {
    find . -type d -name "__pycache__" -exec rm -rf {} +
    clear
}

while getopts "hrxec" opt; do
    case ${opt} in
    h)
        show_help
        exit 0
        ;;
    r)
        run_server
        ;;
    c)
        echo -n "Enter model name :"
        read filename
        createFile $filename
        ;;
    x)
        remove_py
        ;;
    e)
        export_enviroment
        ;;
    ?)
        show_help
        exit 1
        ;;
    esac
done
