import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import axios from 'axios'

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}></Route>
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