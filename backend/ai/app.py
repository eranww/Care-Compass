from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from use import *


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def process_text(text):
    # Example: reverse the content of the text
    return text[::-1]

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify(message='No file part'), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(message='No selected file'), 400
    if file:
        filename = file.filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        with open(filepath, 'r') as f:
            file_content = f.read()

        processed_content = process_text(file_content)
        jsonk = use_api("uploads/" + filename)
        return jsonk
        return jsonify(message='File successfully uploaded and processed', file_content=jsonk)

if __name__ == '__main__':
    app.run(debug=True)
