import { useParams } from "react-router-dom";

function GamePage() {
  const { gameId } = useParams()
  return <h1>Welcome to {gameId}</h1>;
}

export default GamePage;

//we have the game id, use that to make an api call for all info for this specific game, display it all
// release date, platform, devs, etc...