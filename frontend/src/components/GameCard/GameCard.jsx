import { Link } from 'react-router-dom';
import './GameCard.css'; 

import noImgAvail from './no-image-available.jpg';

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className='game-card'>
        <img src={game.background_image || noImgAvail} alt={game.name}/>
        <p>{game.name}</p>
    </Link>
  );
}

export default GameCard;
