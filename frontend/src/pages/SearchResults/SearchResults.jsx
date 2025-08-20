import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom"

import GameCard from '../../components/GameCard/GameCard.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './SearchResults.css';

function SearchResults() {
    const [games, setGames] = useState([]) //games list for the search

    const [loading, setLoading] = useState(true)
    
    const [searchParams] = useSearchParams(); //initialize search params
    const searchQuery = searchParams.get("search_query"); // get from URL, the search the user entered

    const fetchGames = () => {
        const url = import.meta.env.VITE_SERVER_URL

        setLoading(true)

        // fetch game by id
        axios.get(url + '/api/' + searchQuery)
        .then(response => {
            setGames(response.data.results)
            setLoading(false)
        })
        .catch(err => console.log("Error fetching games: ", err))
    }

    //fetch API data from backend
    useEffect(() => {
        fetchGames()
    }, [searchQuery]) //use this effect every time games changes (each search will change games)

    

    if (loading) {
        return (
            <>
            <Navbar msg="Fieros - Search Results"></Navbar>
            <p id='loading-msg'>Loading...</p>
            </>
        )
    }

    //sorting + filtering can go in sorting div
    //sort by most popular, genre, etc..

    return (
        <>
            <Navbar msg="Fieros - Search Results"></Navbar>
            <div className='disp-msg'>
                <span>Displaying results for "</span>
                <span id="query">{searchQuery}</span>
                <span>"</span>
            </div>
   
            <div className='sorting'>
               
            </div>
            <div className='SearchResults'>
                <div className='games'>
                    {games.map(game => (
                        <GameCard key={game.id} game={game}></GameCard>
                    ))}
                </div>

                <button id="end-button" disabled={games.length === 0}>{games.length === 0 ? "No results found." : "Load more?"}</button>
            </div>
        </>
    );
}

export default SearchResults