/*
  Author: Frenklin Mici
  This file's purpose is to be the router. All it does
  is set up the structure
*/

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './variables.css'

//import pages here as i do them
import Home from './pages/Home';
import Login from './pages/Login';
import GamePage from './pages/GamePage'


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}></Route>
        {/*Keep adding routes ex: register, my profile, etc...*/}
        <Route path="/game/:gameId" element={<GamePage/>}></Route>
        {/*<Route path="/user/:userName" element={<UserProfile/>}></Route>*/}
      </Routes>
    </Router>
  );
}

export default App


 /*

 Example for using axios for fetch request.

  const [msg, setMsg] = useState('Loading...')

  useEffect(() => {
    axios.get('http://localhost:5001/')
      .then(res => setMsg(res.data.message))
      .catch(err => setMsg('Error connecting to backend: ', err.data.message))
  }, [])

  return <h1>{msg}</h1>
  */