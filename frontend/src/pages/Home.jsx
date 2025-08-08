import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import '/src/styling/Home.css'
import GameCard from '../components/GameCard';

function Home() {
    //where our RAWG api data will live
    const [featuredGames, setFeaturedGames] = useState([]);
    const [newGames, setNewGames] = useState([])
    const [topRatedGames, setTopRatedGames] = useState([])

    //fetch from backend
    const fetchGames = () => {
        const url = 'http://localhost:5001' //where our backend lives: CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

        // FEATURED GAMES
        axios.get(url + '/api/featured-games')
        .then(response => setFeaturedGames(response.data.results))
        .catch(err => console.log("Error fetching featured games: ", err))

        // TOP RATED GAMES
        axios.get(url + '/api/top-rated-games')
        .then(response => setTopRatedGames(response.data.results))
        .catch(err => console.log("Error fetching top rated games: ", err))

        // NEW GAMES
        axios.get(url + '/api/new-games')
        .then(response => setNewGames(response.data.results))
        .catch(err => console.log("Error fetching new games: ", err))
    }

    //fetch API data from backend, might add it to fetch on an interval
    useEffect(() => {
        fetchGames()
    }, [])
    
    //the actual page
    return (
        <div>
            <h1>Welcome to Fieros!</h1>
            <nav className='navbar'>
                <Link to="/login">Login</Link> |{" "}
                <Link to="/register">Register</Link> |{" "}
                <Link to="/about">About</Link> | {" "}

                <input type="search" placeholder='Search for games here...'></input>{" "}
                <button>Search</button>
            </nav>
            <div className='game-showcase'>
                <div className="section featured-section">
                    <h2>Featured Games</h2>
                    <div className="carousel">
                        {featuredGames.map(game => (
                        <GameCard key={game.id} game={game}/>
                        ))}
                    </div>
                </div>

                 <div className="section top-rated-section">
                    <h2>Top Rated</h2>
                    <div className="carousel">
                        {topRatedGames.map(game => (
                        <GameCard key={game.id} game={game}/>
                        ))}
                    </div>
                </div>

                <div className="section new-section">
                    <h2>New Releases</h2>
                    <div className="carousel">
                        {newGames.map(game => (
                        <GameCard key={game.id} game={game}/>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Home;
