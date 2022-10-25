import React from 'react';
import { useAppContext } from '../Utilities/AppContext';
import './home.css';

function Home() {
  const { currentSong } = useAppContext();
  const generateRow = (type: string) => {
    const title = type === 'time' ? 'Good Evening' : type;
    return (
      <div className="row">
        <p className="row__title">{title}</p>
        <div className="row__cont">
          <div className="row__item-cont">
            <img className="row__artwork" src={`/album_covers/${currentSong.album_art}`} alt="album art"/>
            <p className="row__item-title">{currentSong.title}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='view'>
      {generateRow('time')}
    </div>
  )
};

export default Home;
