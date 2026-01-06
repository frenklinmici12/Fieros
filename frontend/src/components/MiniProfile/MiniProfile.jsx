import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./MiniProfile.css"

import defaultPfp from "../../assets/default-pfp.avif"

function MiniProfile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState("")
    const [pfp, setPfp] = useState("")

    const checkLogin = () => {
        //fetch from backend
        const url = import.meta.env.VITE_SERVER_URL //where our backend lives (the Flask): CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

        axios.get(url + "/auth/check", {withCredentials: true})
        .then(response => {
            if(response.data.loggedIn) {
                setIsLoggedIn(true)
                setUsername(response.data.username)
                {/*set pfp too*/}
            }
        })
        .catch(err => alert(err.data.message))
    }

    //for login
    useEffect(() => {
        checkLogin()
    }, [])

    return (
        <div className='mini-profile'>
            <img className='pfp' src={defaultPfp}></img>
            <Link className='login' to={username == "" ? "/login" : "/profile"}>{username == "" ? "Not currently logged in" : username}</Link>
        </div>
    );
}

export default MiniProfile