import { Link } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

import Navbar from "../../components/Navbar/Navbar";
import "./Login.css"

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submitForm = (user, pass) => {
    if (user == "" || pass == "") {
        alert("Username and/or password is blank.")
        return
    }

    //send user info to backend 
    const url = import.meta.env.VITE_SERVER_URL //where our backend lives (the Flask): CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

    axios.post(url + "/auth/login", {
        username: user, 
        password: pass
    },{ withCredentials: true}).then(response => {
        alert(response.data.message);
        //set log in = true maybe?
    })
    .catch(error => {
        alert("Error: " + error.response?.data?.error);
    });
  }

  return (
      <div>
          <Navbar msg="Fieros - Login"></Navbar>
          <div>
              <div className="login-container">
                  <div id="heading">
                      <h2>Welcome Back to Fieros</h2>
                      <p>Enjoy browsing and rating a catalog of over 350,000 games.</p>
                  </div>

                  <div className="user-name">
                      <label htmlFor="username">Username</label>
                      <input id="username" name="username" type="text" autoComplete="username" onChange={(e) => setUsername(e.target.value)} required></input>
                  </div>

                  <div className="password">
                      <label>Password</label>
                      <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="password" onChange={(e) => setPassword(e.target.value)} required />
                      <label id="show-pass">
                          <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show Password
                      </label>
                  </div>

                  <div className='btns'>
                      <button onClick={() => submitForm(username, password)}>Login</button>
                      
                      <h5>Don't have an account?</h5>
                      <Link to="/register">Go to Register</Link>
                  </div>

                  <div className='foot-note'>
                      <p>2025 Fieros</p>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Login;
