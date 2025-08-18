import axios from 'axios';
import parse from 'html-react-parser'; // the api gives some weird imbedded html in the strings so i use this to clean it
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from '../../components/Navbar/Navbar.jsx';
import AddToListPopup from '../../components/AddToListPopup/AddToListPopup.jsx';
import "./GamePage.css";

function GamePage() {
  const { gameId } = useParams()

  const [game, setGame] = useState(null);

  const [showPopup, setShowPopup] = useState(false)

  //maybe then for suggestions...
  //const [similarGames, setSimilarGames] = useState([])

  //fetch game details from backend
  const fetchGame = () => {
      const url = import.meta.env.VITE_SERVER_URL

      // fetch game by id
      axios.get(url + '/api/' + gameId)
      .then(response => {
        setGame(response.data)
      })
      .catch(err => console.log("Error fetching game: ", err))
  }

  //fetch API data from backend
  useEffect(() => {
      fetchGame()
  }, [])
  
  // it won't get the game data instantly, so until then (that very miniscule amount of time), it will display loading
  if (!game) return <p id='loading-msg'>Loading...</p>

  return (
    <>
      <Navbar msg={`Fieros - ${game.name}`} />

      <div className="GamePage">
        <div className="quick-info">
            <h1>{game.name}</h1>
            <img src={game.background_image} alt={game.name}></img>
          
            <p>Released on {game.released}</p>
            <p>Metacritic Score: {game.metacritic ? (game.metacritic + "/100") : "N/A"}</p>          
            <p>
              Platforms: {game.platforms.map(p => p.platform.name).join(", ")} 
            </p>

        </div>

        <div className="user-info">
            <p>Added by {game.added} users!</p>
            <p>User Score: {game.rating * 2} / 10</p>
            <button onClick={() => setShowPopup(true)}>Add to My List</button> 

            {/*Add a section for discussion board maybe?*/}


        </div>

        <div className="detailed-info">
          <h2>Description</h2>
          {parse(game.description)} {/*i can use description_raw to not have to use parse but then i have to fiugure out how to make the indents and shiet*/}
        </div>

        

        {showPopup && (<AddToListPopup onClose={() => setShowPopup(false)}></AddToListPopup>)/*If showPopUp is true (from pressing Add to List), then dispay the popup */}

      </div>
    </>
  );
}
//the Add to My List wll give a pop uop and let you give it a rating out of 10 and make a review and give a status (played, dropped, etc)
export default GamePage;

//we have the game id, use that to make an api call for all info for this specific game, display it all
// release date, platform, devs, etc...  {game ? <h1>{game.name}</h1> : <p>Loading...</p>}