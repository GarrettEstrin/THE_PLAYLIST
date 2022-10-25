import React, { useEffect, useState } from 'react';
import { useAppContext } from '../Utilities/AppContext';
import { randomIndex } from '../Utilities/getRandomSong';
import timeOfDay from '../Utilities/timeOfDay';
import './home.css';
import { rowTitles } from './rowTitles';

function Home() {
  const { currentSong, initializedLibrary, playNextSong } = useAppContext();
  const [rows, setRows] = useState<JSX.Element[]>([]);

  useEffect(() => {    
    const generateRandomItem = () => {
      const randomItems = [];
      if (initializedLibrary === null) {
        return [];
      }
      for (let i = 0; i < 10; i++) {
        const song = initializedLibrary[randomIndex(initializedLibrary.length)]
        const item = (
          <div className="row__item-cont" key={i}>
            <img className="row__artwork" src={`/album_covers/${song.album_art}`} alt="album art" />
            <p className="row__item-title">{song.title}</p>
          </div>
        );
        randomItems.push(item);
      }
      return randomItems;
    };
    
    const generateSingleRow = (type: string, index: number) => {
      const title = type === 'time' ? timeOfDay() : type;
      return (
        <div className="row" key={index}>
          <p className="row__title">{title}</p>
          <div className="row__cont">
            {generateRandomItem()}
          </div>
        </div>
      )
    };
    
    const generateRows = (numberOfRows: number) => {
    const rows = [];
    for (let i = 0; i < numberOfRows; i++) {
      const row = (
        <div key={i}>
          {generateSingleRow(rowTitles[i], i)}
        </div>
      );
      rows.push(row);
    }
    return rows;
    }
    if (rows.length === 0 && initializedLibrary != null) {
      setRows(generateRows(10));
    }
  }, [setRows, initializedLibrary, playNextSong, rows.length, currentSong]);
  
  return (
    <>
      {rows}
    </>
  );
};

export default Home;
