import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons'

import { useAppContext } from '../Utilities/AppContext';
import './player.css';

function Player() {
  const [song, setSong] = useState<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const { currentSong } = useAppContext();

  useEffect(() => {
    setSong(new Audio('/audio/' + currentSong + '.mp3'))
  }, [currentSong]);

  const play = () => {
    if (song !== null) {
      song.play();
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
    if (song !== null) {
      song.pause();
      setPlaying(false);
    }
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
