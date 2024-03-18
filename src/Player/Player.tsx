import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import { useAppContext } from '../Utilities/AppContext';

import './player.css';


function Player() {
  const { currentSong, isPlaying, play, pause } = useAppContext();

  if (currentSong === null) {
    return null;
  }
  
  return (
    <div className="player">
      <div className="player__album-cont">
        <img src={`/album_covers/${currentSong.album_art}`} alt="album cover" className="player__album" />
      </div>
      <div className="player__now-playing-cont">
        <p className="player__now-playing-title">{currentSong.title}</p>
        <p className="player__now-playing-artist">{currentSong.artist}</p>
      </div>
      {isPlaying ?
        <div onClick={pause}><FontAwesomeIcon icon={faPause} /></div> :
        <div onClick={play}><FontAwesomeIcon icon={faPlay} /></div>
      }
    </div>
  )
};

export default Player;
