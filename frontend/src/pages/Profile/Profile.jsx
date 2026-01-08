import axios from 'axios';
import { useEffect, useState } from 'react';

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';

import GameCard from '../../components/GameCard/GameCard.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './Profile.css';

function Profile() {
    //context
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext)

    // navigation
    const navigate = useNavigate() //set up navigator

    //fetch from backend
    const fetchProfile = () => {
        const url = import.meta.env.VITE_SERVER_URL //where our backend lives (the Flask): CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

        axios.get(url + "/profile", {withCredentials: true})
        .then(response => {/*WHAT DO WE DO AFTER GETTING IT? */})
        .catch(err => alert(err.data.message))
    }

    useEffect(() => {
        fetchProfile()
    }, [])

    const logout = () => {
        const url = import.meta.env.VITE_SERVER_URL //where our backend lives (the Flask): CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

        axios.get(url + "/logout", {withCredentials: true})
        .then(response => {
            //alert(response.data.message)
            setUser({
                loggedIn: false,
                username: "",
                pfp: ""
            })
            navigate(`/`) // go back to home page

        })
        .catch(err => alert(err.data.message))
    }
    
    //the actual page
    return (
        <>
            <Navbar msg={"Fieros - Profile - " + user.username}></Navbar>    
            
            <button onClick={() => logout()}>Logout</button>
        </>
    );
}

export default Profile;
