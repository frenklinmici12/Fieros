import { Link } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';

import "./Register.css"
import Navbar from "../../components/Navbar/Navbar"



function Register() {
    const [showPassword, setShowPassword] = useState(false)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // send user info to backend and create a user with this user and pass
    const submitForm = (user, pass) => {
        // validate requirements 
        if (user.length < 5 && pass.length < 5) {
            alert("Username and password must each be at least 5 characters long.")
            return
        }
        else if (user.length < 5) {
            alert("Username must be at least 5 characters long.")
            return
        }
        else if (pass.length < 5) {
            alert ("Password must be at least 5 characters long")
            return
        }    

        //send user info to backend 
        const url = import.meta.env.VITE_SERVER_URL //where our backend lives (the Flask): CHANGE THIS IF FETCHING FROM SOMEWHERE ELSE

        // "post" (send) the user and pass as a JSON object to the path in backend. tell us the response. should be either something went wrong or user succesfully created
        axios.post(url + "/auth/register", {
            username: user, 
            password: pass
        }).then(response => {
            alert(response.data.message);
            //set log in = true maybe?
        })
        .catch(error => {
            alert("Error: " + error.response?.data?.error);
        });
    }

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
                        <input id="username" name="username" type="text" autoComplete="username" required onChange={(e) => setUsername(e.target.value)}></input>
                    </div>

                    <div className="password">
                        <label>Password</label>
                        <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="password" required onChange={(e) => setPassword(e.target.value)}/>
                        <label id="show-pass">
                            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show Password
                        </label>

                    </div>

                    <div className='btns'>
                        <button onClick={() => submitForm(username, password)}>Create Account</button>
                        
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