import axios from 'axios';
import { useEffect, useState } from 'react';

import GameCard from '../../components/GameCard/GameCard.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Home.css';

function Home() {
    //where our RAWG api data will live
    const [trendingGames, setTrendingGames] = useState([]);
    const [featuredGames, setFeaturedGames] = useState([]);
    const [mostAnticipated, setMostAnticipated] = useState([]);
    const [newGames, setNewGames] = useState([])
    const [topRatedGames, setTopRatedGames] = useState([])

    //fetch from backend
    const fetchGames = () => {
        const url = import.meta.env.VITE_SERVER_URL //where our backend lives (the Flask): CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

         // TRENDING GAMES
        axios.get(url + '/api/trending-games')
        .then(response => setTrendingGames(response.data.results))
        .catch(err => console.log("Error fetching trending games: ", err))

        // FEATURED GAMES
        axios.get(url + '/api/featured-games')
        .then(response => setFeaturedGames(response.data.results))
        .catch(err => console.log("Error fetching featured games: ", err))

        // TOP RATED GAMES
        axios.get(url + '/api/top-rated-games')
        .then(response => setTopRatedGames(response.data.results))
        .catch(err => console.log("Error fetching top rated games: ", err))

        // MOST ANTICIPATED GAMES
        axios.get(url + '/api/most-anticipated')
        .then(response => setMostAnticipated(response.data.results))
        .catch(err => console.log("Error fetching most anticipated games: ", err))

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
        <div className='Home'>
            <Navbar msg="Welcome to Fieros!"></Navbar>
            
            <div className='game-showcase'>
                
                <div className="section trending-section">
                    <h2>Trending Games</h2>
                    <div className="carousel">
                        {trendingGames.map(game => (
                        <GameCard key={game.id} game={game}/>
                        ))}
                    </div>
                </div>

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

                <div className="section most-anticipated-section">
                    <h2>Most Anticipated</h2>
                    <div className="carousel">
                        {mostAnticipated.map(game => (
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
