import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../../UserContext';

import '../MiniProfile/MiniProfile.jsx'
import './Navbar.css'

import MiniProfile from '../MiniProfile/MiniProfile.jsx';
import fieros_logo from '/Users/frenklinmici/coding/Fieros/frontend/src/assets/fieros_logo.png'

function Navbar( props ) {
    const { user } = useContext(UserContext)

    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate() //set up navigator

    const handleSearch = () => { //when enter is pressed 
        if (searchQuery != "") {
            navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`)
        }
        else {
            alert("Please enter a valid search query.")
        } 
    }

    return (
        <div>
            <div className='upper'>
                <Link to="/" id='title'>
                    <img className='logo' src={fieros_logo}></img>
                    <h1>{props.msg}</h1>
                </Link>
              
                <MiniProfile></MiniProfile>
            </div>
            <nav className='navbar'>
                <Link to="/">Home</Link> |{" "}
                <Link to="/genres">Genres</Link> |{" "}
                {!user.loggedIn && (<><Link to="/login">Login</Link> |{" "}</>)}
                {!user.loggedIn && (<><Link to="/register">Register</Link> |{" "}</>)}
                {user.loggedIn && (<><Link to="/profile">My Profile</Link> | {" "}</>)}
                <Link to="/community">Community</Link> | {" "}
                <Link to="/about">About</Link> | {" "}
                <input 
                    type="search" 
                    placeholder='Search for games here...'
                    value = {searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch()
                        }
                    }}
                ></input>{" "}
                
                <button onClick={() => handleSearch()}>Search</button>
            </nav>
      </div>
    );
}

export default Navbar
