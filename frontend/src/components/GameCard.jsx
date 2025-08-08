import React from 'react';
import './GameCard.css'; 
import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className='game-card'>
        <img src={game.background_image} alt={game.name}/>
        <p>{game.name}</p>
    </Link>
  );
}

export default GameCard;
