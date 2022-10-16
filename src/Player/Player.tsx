import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons'

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

  const back = () => {
    alert("You don't want to go back. Let's let this one ride out.");
  };

  const next = () => {
    alert("You don't want to skip this one. It's a banger!");
  };

  const pause = () => {
    currentSong?.audio?.pause();
    setPlaying(false);
  };
  return (
    <div className="player">
      <div onClick={back}><FontAwesomeIcon icon={faBackwardStep} /></div>
      {playing ?
        <div onClick={pause}><FontAwesomeIcon icon={faPause} /></div> :
        <div onClick={play}><FontAwesomeIcon icon={faPlay} /></div>
      }
      <div onClick={next}><FontAwesomeIcon icon={faForwardStep} /></div>
    </div>
  )
};

export default Player;
