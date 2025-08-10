import { Link } from 'react-router-dom';

import './Navbar.css'

function Navbar( props ) {
    return (
        <div className="nav-bar">
            <h1>{props.msg}</h1>
            <nav className='navbar'>
                <Link to="/">Home</Link> |{" "}
                <Link to="/login">Login</Link> |{" "}
                <Link to="/register">Register</Link> |{" "}
                <Link to="/about">About</Link> | {" "}
                <input type="search" placeholder='Search for games here...'></input>{" "}
                <button>Search</button>
            </nav>
      </div>
    );
}

export default Navbar