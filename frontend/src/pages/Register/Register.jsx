import { Link } from 'react-router-dom';
import { useState } from 'react'

import "./Register.css"
import Navbar from "../../components/Navbar/Navbar"


function Register() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <Navbar msg="Fieros - Register"></Navbar>
            <div>
                <div className="register-container">
                    <div id="heading">
                        <h2>Start Using Fieros</h2>
                        <p>Join Fieros now to log your gaming journey. It's 100% Free!</p>
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
                        <button>Create Account</button>
                        
                        <h5>Already have an account?</h5>
                        <Link to="/login">Go to Login</Link>
                    </div>

                    <div className='foot-note'>
                        <p>2025 Fieros</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register