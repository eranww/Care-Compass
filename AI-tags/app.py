import json
from flask import Flask, request, jsonify
from use import use_api

def api(text_file_name):
    tags_list = use_api(text_file_name)
    
    # convert to Json
    json_str = json.dumps(tags_list)

    return json_str

app = Flask(__name__)

@app.route('/run-python-function', methods=['POST'])
def run_python_function():
    data = request.json
    result = api(data['param1'], data['param2'])
    return jsonify(result=result)

if __name__ == '__main__':
    app.run(debug=True)
