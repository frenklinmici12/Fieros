# Author: Frenklin Mici
# Purpose: Fieros backend

# RAWG API docs: https://api.rawg.io/docs/

# some notes ...
# request : FLASK library, for looking at data sent by client
# requests (plural!) python library, for fetching data from elsewhere (RAWG API in this case)

from flask import Flask, jsonify, request, session #framework, json, for looking at data sent by frontend, session for sessions (Duh) (its for keeping track of if a user is logged in or not)
from flask_cors import CORS #for linking frontend to backend
from flask_caching import Cache # cache data saves api calls and really efficient
from dotenv import load_dotenv # .env for api key
import requests # fetch from api
import os # access .env
from werkzeug.security import generate_password_hash, check_password_hash # hash passwords (never store passwords as plain text security issues !!!)

load_dotenv()  # loads .env file variables
API_KEY = os.getenv("RAWG_API_KEY") # in the .env file

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

SESSION_COOKIE_SAMESITE = "None"
SESSION_COOKIE_SECURE = False  # True only on HTTPS

# Simple in-memory cache configuration, each decorator will use this config
app.config['CACHE_TYPE'] = 'SimpleCache'
app.config['CACHE_DEFAULT_TIMEOUT'] = 36000  # 10 hours = 36000 seconds (means it wont change whats in cache for 10 hours)
cache = Cache(app)

#key for sessions
app.secret_key = "my_key"  # for learning, you can hardcode

# ========================== FETCHING GAMES ==========================

#just making sure its working!
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

# Home
@app.route("/api/trending-games")
@cache.cached()
def trending_games():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&ordering=-added&dates=2025-10-15,2026-09-25" 
    #page_size is how many games it will fetch, 
    #ordering=-added is games most added by users (to give us the most popular games rn)
    return fetch_data(url)

# Home
@app.route("/api/featured-games")
@cache.cached()
def featured_games():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&ordering=-added" 
    return fetch_data(url)

# Home
@app.route("/api/top-rated-games")
@cache.cached()
def top_rated_games():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&ordering=-metacritic" 
    return fetch_data(url)

# Home
@app.route("/api/most-anticipated")
@cache.cached()
def most_anticipated():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&dates=2026-01-16,2030-08-01&ordering=-added" 
    return fetch_data(url)

# Home
@app.route("/api/new-games")
@cache.cached()
def new_games():
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&dates=2025-04-01,2025-08-01&ordering=-added" 
    return fetch_data(url)

# GamePage
@app.route("/api/<int:game_id>")
@cache.cached()
def game_page(game_id):
    url = f"https://api.rawg.io/api/games/{game_id}?key={API_KEY}" 
    # here, game.id is a PATH parameter, meaning it comes before the '?'. 
    # it controls the path. After the '?' come the query parameters, which narrow the search. 
    # the api key must also be there
    return fetch_data(url)

# Search Feature for Navbar
@app.route("/api/<string:search_query>")
@cache.cached()
def search(search_query):
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&search={search_query}" 
    return fetch_data(url)
#shoudl proabbly sort by popular or something to not give


# list of genres
@app.route("/api/genres")
@cache.cached()
def genres():
    url = f"https://api.rawg.io/api/genres?key={API_KEY}&page_size=40"
    return fetch_data(url)

# games by genre
@app.route("/api/genres/<string:genre>")
@cache.cached()
def genre(genre):
    url = f"https://api.rawg.io/api/games?key={API_KEY}&page_size=40&genres={genre}" 
    return fetch_data(url)

# ========================== ACCOUNTS ==========================

#use this dummy for learning purpsoses before doing sql
fake_db = {
    "frenk": generate_password_hash("123"),
    "cj": generate_password_hash("sorry")
}

# get the data entered by client with POST (uses request)
@app.route("/auth/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # For now, just print to see it works
    print("Received:", username, password)

    #avoid overwriting someone else's account!
    if username in fake_db:
        return jsonify({"message": f"ERROR: Username {username} already exists."}), 401

    # hash password for security
    password_hash = generate_password_hash(password)

    #TODO now, send to data base so that you can login in the future 
    fake_db[username] = password_hash
    print(fake_db)

    return jsonify({"message": f"TEST ONLY: User succesfully created. user is {username} and pass is {password}"}), 201

    

@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    
    username = data.get("username")
    password = data.get("password")

    # For now, just print to see it works
    print("Received:", username, password)

    if not username or not password:
        return jsonify({"message": "Invalid username or password."}), 400

    #TODO lookup the username and password hash in db, if there exists a match, log in, else nope
    # Lookup user
    stored_hash = fake_db.get(username)
    if stored_hash and check_password_hash(stored_hash, password):
        #user succesfully authenticates
        session["username"] = username #store in session
        print(session["username"])
        return jsonify({"message": "Successful login!"}), 200

    return jsonify({"message": "Invalid username or password."})

@app.route("/profile")
def profile():
    if "username" in session:
        username = session["username"]
        #fetch info from user (games list with reviews...)
        print("profile found")
        return jsonify({"message": f"Welcome to your profile, {username}"})
    else:
        return jsonify({"message": "You must be logged in to view your profile."})
    
@app.route("/logout")
def logout():
    print("logging out")
    session.pop("username", None)
    return jsonify({"message": "You have logged out."})


#check we're logged in
@app.route("/auth/check")
def check_login():
    if "username" in session:
        return jsonify({"loggedIn" : True, "username" : session["username"]}) #and also pfp eventually!
    else:
        return jsonify({"loggedIn" : False})

# use sqlachemy 

#run backend
if __name__ == "__main__":
    app.run(host="localhost", port=5001, debug=True)
