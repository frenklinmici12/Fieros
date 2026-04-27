# Fieros – Video Game Tracker

## Overview
Fieros is a full-stack web application designed to help gamers track, organize, and engage with video games in a personalized way. Inspired by platforms like Letterboxd, this platform allows users to discover new games, create accounts, manage game lists, and rate games.

## Tech Stack
**Frontend:**
- React
- CSS

**Backend:**
- Flask (Python)
- RESTful API
- [RAWG API](https://rawg.io) for game data

**Tools:**
- Git/GitHub 
- Axios

## Development Process
1. Planned the project structure and fundamental features
2. Set up Flask backend with basic endpoints
3. Built React frontend components
4. Used RAWG API for fetching game data
5. Implemented user authentication and session handling on backend

## Challenges
- **State Management:** Fixed inconsistent data by using React's context library
- **API Data:** Missing data fixed by specific search query
- **Routing Rrrors:** Fixed problems with React Router and page navigation
- **Authentication Bugs:** Fixed auth mismatch by managing session

## TODO
- Add social features (friends, messaging, ...)
- Implement filtering option
- Add list functionality

## Installation & Setup
**Note: .env must be set up with your own API key!**
1. Clone the repository:
   
   git clone https://github.com/frenklinmici12/Fieros

2. Navigate to backend (Where app.py is located)

3. Set Up Virtual Environment:

   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt

4. Start the backend
   python3 app.py

6. Navigate to frontend folder
7. Install frontend dependencies and run
   npm install
   npm run dev

## Demo
   
