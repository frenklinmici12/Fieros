import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

import "./MiniProfile.css"
import defaultPfp from "../../assets/default-pfp.avif"

function MiniProfile() {
    const { user } = useContext(UserContext)
    const { setUser } = useContext(UserContext)

    return (
        <div className='mini-profile'>
            <img className='pfp' src={defaultPfp}></img>
            <Link className='login' to={user.loggedIn ? "/profile" : "/login"}>{user.loggedIn ? user.username : "Login"}</Link>
        </div>
    );
}

export default MiniProfile