import { Link } from 'react-router-dom';

import '/src/styling/Home.css'
import { useState } from 'react';

function Home() {
    const [featuredGames, setFeaturedGames] = useState([]);
    

    return (
        <div>
            <h1>Welcome to Fieros!</h1>
            <nav className='navbar'>
                <Link to="/login">Login</Link> |{" "}
                <Link to="/register">Register</Link> |{" "}

                <input type="search" placeholder='Search for games here...'></input>{" "}
                <button>Search</button>
            </nav>
            <div className='game-showcase'>
                This is my showcase
            </div>
        </div>
    );
}

export default Home;
