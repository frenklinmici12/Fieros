import { Link } from 'react-router-dom';
import { useState } from 'react'

import Navbar from "../../components/Navbar/Navbar";
import "./Login.css"

function Login() {
  const [showPassword, setShowPassword] = useState(false)

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
                      <input id="username" name="username" type="text" autoComplete="username" required></input>
                  </div>

                  <div className="password">
                      <label>Password</label>
                      <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="password" required />
                      <label id="show-pass">
                          <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show Password
                      </label>

                  </div>

                  <div className='btns'>
                      <button>Login</button>
                      
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
