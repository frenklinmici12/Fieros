import axios from 'axios';
import { useEffect, useState } from 'react';

import "./Genres.css"
import Navbar from "../../components/Navbar/Navbar";
import { Link , useNavigate} from 'react-router-dom';

function Genres() {
    const [genres, setGenres] = useState([])

    //fetch from backend
    const fetchGenres = () => {
        const url = import.meta.env.VITE_SERVER_URL //where our backend lives (the Flask): CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

        axios.get(url + '/api/genres')
        .then(response => setGenres(response.data.results))
        .catch(err => console.log("Error fetching genres: ", err))
    }

    //fetch API data from backend
    useEffect(() => {
        fetchGenres()
    }, [])

    return (
        <div>
            <Navbar msg="Fieros - Genres"></Navbar>
            <div className='genre-list'>
                <ul>
                    {genres.map(genre => (
                        <li key={genre.id} className='genre-card'>
                            <Link to={`/genre/${genre.name}`}>
                                <img src={genre.image_background} alt={genre.name}/>
                                <span>{genre.name}</span>
                            </Link>
                        </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default Genres

//use useParams (like you did for game page, also remember to update the router in app.jsx)
// then make a page for each, copy the ui from searchResults and fetch gaems list with that genre