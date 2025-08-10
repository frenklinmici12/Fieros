import { Link } from 'react-router-dom';
import './GameCard.css'; 

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className='game-card'>
        <img src={game.background_image} alt={game.name}/>
        <p>{game.name}</p>
    </Link>
  );
}

export default GameCard;
