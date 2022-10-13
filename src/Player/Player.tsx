import React from 'react';
import { useAppContext } from '../Utilities/AppContext';
import './player.css';

function Player() {
  const { library, currentSong } = useAppContext();
  console.log(library, currentSong);
  return (
    <div className="player">
      This is the player
    </div>
  )
};

export default Player;
