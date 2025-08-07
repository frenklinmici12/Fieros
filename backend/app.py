from flask import Flask, jsonify
from flask_cors import CORS
from flask_caching import Cache

import requests

import os
from dotenv import load_dotenv

load_dotenv()  # loads .env file variables
API_KEY = os.getenv("RAWG_API_KEY")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Simple in-memory cache configuration, each decorator will use this config
app.config['CACHE_TYPE'] = 'SimpleCache'
app.config['CACHE_DEFAULT_TIMEOUT'] = 36000  # 10 hours = 36000 seconds

cache = Cache(app)

#formalities end

#just making sure its working!
@cache.cached()
@app.route("/")
def home():
    return jsonify({"message": "Fieros backend is working!"})

#just an example
@app.route("/games")
@cache.cached()
def games():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=5"
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses (4xx or 5xx)
        data = response.json()       # Parse JSON from RAWG response
        return jsonify(data)         # Return JSON to whoever called this Flask route
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to fetch data", "details": str(e)}), 500

# fetch data from given url - return as JSON
def fetch_data(url):
    print(f"Fetching from RAWG: {url}")
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad responses (4xx or 5xx)
        data = response.json()       # Parse JSON from RAWG response
        return jsonify(data)         # Return JSON to whoever called this Flask route
    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Failed to fetch data", "details": str(e)}), 500

@app.route("/api/featured-games")
@cache.cached()
def featured_games():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&ordering=-added" 
    #page_size is how many games it will fetch, 
    #ordering=-added is games most added by users (to give us the most popular games rn)
    return fetch_data(url)

@app.route("/api/top-rated-games")
@cache.cached()
def top_rated_games():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&ordering=-metacritic" 
    return fetch_data(url)

@app.route("/api/new-games")
@cache.cached()
def new_games():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&dates=2025-04-01,2025-08-01&ordering=-added" 
    return fetch_data(url)


#run backend
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5001, debug=True)
