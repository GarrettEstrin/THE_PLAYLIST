import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import { useAppContext } from '../Utilities/AppContext';

import './player.css';


function Player() {
  const { currentSong } = useAppContext();
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (playing === true) {
      currentSong?.audio?.play();
    }
  }, [currentSong?.audio, currentSong?.title, currentSong?.unique, playing]);

  if (currentSong === null) {
    return null;
  }
  
  const play = () => {
    if (currentSong?.audio) {
      currentSong?.audio?.play();
      setPlaying(true);
    }
  };

  const pause = () => {
    currentSong?.audio?.pause();
    setPlaying(false);
  };
  return (
    <div className="player">
      <div className="player__album-cont">
        <img src={`/album_covers/${currentSong.album_art}`} alt="album cover" className="player__album" />
      </div>
      <div className="player__now-playing-cont">
        <p className="player__now-playing-title">{currentSong.title}</p>
        <p className="player__now-playing-artist">{currentSong.artist}</p>
      </div>
      {playing ?
        <div onClick={pause}><FontAwesomeIcon icon={faPause} /></div> :
        <div onClick={play}><FontAwesomeIcon icon={faPlay} /></div>
      }
    </div>
  )
};

export default Player;
