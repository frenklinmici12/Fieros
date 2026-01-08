import { useState , useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./MiniProfile.css"
import { UserContext } from '../../UserContext';

import defaultPfp from "../../assets/default-pfp.avif"

function MiniProfile() {
    const { user } = useContext(UserContext)

    return (
        <div className='mini-profile'>
            <img className='pfp' src={defaultPfp}></img>
            <Link className='login' to={user.loggedIn ? "/profile" : "/login"}>{user.loggedIn ? user.username : "Not currently logged in"}</Link>
        </div>
    );
}

export default MiniProfile