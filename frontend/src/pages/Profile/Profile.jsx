import axios from 'axios';
import { useEffect, useState } from 'react';

import GameCard from '../../components/GameCard/GameCard.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Profile.css';

function Profile() {
    //fetch from backend
    const fetchProfile = () => {
        const url = import.meta.env.VITE_SERVER_URL //where our backend lives (the Flask): CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

        axios.get(url + "/profile", {withCredentials: true})
        .then(response => {})
        .catch(err => alert(err.data.message))
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const logout = () => {
        const url = import.meta.env.VITE_SERVER_URL //where our backend lives (the Flask): CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

        axios.get(url + "/logout", {withCredentials: true})
        .then(response => alert(response.data.message))
        .catch(err => alert(err.data.message))
    }
    
    //the actual page
    return (
        <div className='Home'>
            <Navbar msg="Fieros - Profile"></Navbar>    
            <button onClick={() => logout()}>Logout</button>
        </div>
    );
}

export default Profile;
