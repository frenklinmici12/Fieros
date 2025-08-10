import { useParams } from "react-router-dom";

function GamePage() {
  const { gameId } = useParams()

  const [game, setGame] = useState(null);

  //maybe then for suggestions...
  //const [similarGames, setSimilarGames] = useState([])

  //fetch game details from backend
  const fetchGame = () => {
      const url = import.meta.env.VITE_SERVER_URL

      // fetch game by id
      axios.get(url + '/api/' + gameId)
      .then(response => setGame(response.data.results))
      .catch(err => console.log("Error fetching featured games: ", err))
  }

  //fetch API data from backend, might add it to fetch on an interval
  useEffect(() => {
      fetchGame()
  }, [])
  
  
  return (
    <div>
      <h1>{game.name}</h1>
    </div>
  );
}

export default GamePage;

//we have the game id, use that to make an api call for all info for this specific game, display it all
// release date, platform, devs, etc...