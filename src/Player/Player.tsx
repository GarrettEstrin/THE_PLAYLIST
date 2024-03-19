import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

import { useAppContext } from '../Utilities/AppContext';

import './player.css';


function Player() {
  const { currentSong, isPlaying, play, pause, addFavorite, removeFavorite, favorites } = useAppContext();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => { 
    if (currentSong) {
      setIsFavorite(favorites.includes(currentSong.key));
    }
  }, [favorites, currentSong])

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
      {isFavorite ?
        <div className="player__favorite" onClick={() => {removeFavorite(currentSong.key)}}><FontAwesomeIcon icon={faHeart} /></div> :
        <div className="player__favorite" onClick={() => {addFavorite(currentSong.key)}}><FontAwesomeIcon icon={farHeart} /></div>
      }
      
      {isPlaying ?
        <div className="player__icon-cont" onClick={pause}><FontAwesomeIcon icon={faPause} /></div> :
        <div className="player__icon-cont" onClick={play}><FontAwesomeIcon icon={faPlay} /></div>
      }
    </div>
  )
};

export default Player;
