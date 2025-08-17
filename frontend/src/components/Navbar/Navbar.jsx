import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';

import './Navbar.css'

//@app.route("/api/<string:search_query>")
function Navbar( props ) {
    const [searchQuery, setSearchQuery] = useState("")

    const navigate = useNavigate() //set up navigator

    const handleSearch = () => { //when enter is pr
        if (searchQuery != "") {
            navigate(`/results?search_query=${encodeURIComponent(searchQuery)}`)
        }
        else {
            alert("Please enter a valid search query.")
        } 
    }

    return (
        <div>
            <h1>{props.msg}</h1>
            <nav className='navbar'>
                <Link to="/">Home</Link> |{" "}
                <Link to="/genres">Genres</Link> |{" "}
                <Link to="/login">Login</Link> |{" "}
                <Link to="/register">Register</Link> |{" "}
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

