from flask import Flask, jsonify
from flask_cors import CORS

import os
from dotenv import load_dotenv

load_dotenv()  # loads .env file variables
API_KEY = os.getenv("RAWG_API_KEY")


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route("/")
def home():
    return jsonify({"message": "Fieros backend is working!"})

@app.route("/lol")
def lol():
    return jsonify({"msg": "lol!"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
