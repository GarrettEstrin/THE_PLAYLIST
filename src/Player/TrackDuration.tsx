import React, { useEffect, useState } from 'react';
import { useAppContext } from '../Utilities/AppContext';

import "./track-duration.css";

function TrackDuration() {
  const { currentSong } = useAppContext();
  const [currentPercentage, setCurrentPercentage] = useState(0);


  useEffect(() => { 
    const localCurrentPercentage = (currentSong.audio?.currentTime || 0) / (currentSong.audio?.duration || 0) * 100;
    if (localCurrentPercentage < 100) {
      setCurrentPercentage(localCurrentPercentage);
    }
  }, [currentSong])

  setInterval(() => { 
    const localCurrentPercentage = (currentSong.audio?.currentTime || 0) / (currentSong.audio?.duration || 0) * 100;
    if (localCurrentPercentage < 100) {
      setCurrentPercentage(localCurrentPercentage);
    }
    console.log(currentPercentage)
  }, 250)

  return (
    <div className="track-duration">
      <div className="track-duration__base track-duration__bar"></div>
      <div className="track-duration__bar" style={{width: currentPercentage + "%"}}></div>
    </div>
  );
}

export default TrackDuration;