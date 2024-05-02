import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { useAppContext } from '../Utilities/AppContext';

import './library.css';
import libraryItem from '../Types/Library';

function Library() {
  const { favorites, initializedLibrary, removeFavorite, playNextSong } = useAppContext();

  const generateFavoriteSongsList = (): ReactElement[] => {
    if (favorites.length === 0 || !initializedLibrary) {
      return [
        (<div className="library__subtitle" key={1}>Add some favorites!</div>)
      ]
    }

    return initializedLibrary.reduce((favoriteSongElementsAgg: ReactElement[], song: libraryItem) => { 
      if (favorites.includes(song.key)) {
        const favoriteElement = (
          <div className="search__row-cont" key={song.key}>
            <img
              className="search__artwork"
              src={`/album_covers/${song.album_art}`}
              alt="album art"
              onClick={() => { playNextSong(song.key) }}
            />
            <div className="search__title-cont" onClick={() => { playNextSong(song.key) }}>
              <p className="search__item-title">{song.title}</p>
              <p className="search__item-title">{song.artist}</p>
            </div>
            <div className="library__favorite" onClick={() => {removeFavorite(song.key)}}><FontAwesomeIcon icon={faHeart} /></div>
          </div>
        );
        favoriteSongElementsAgg.push(favoriteElement);
      }
      return favoriteSongElementsAgg
    }, [])
  };
  return (
    <div className='view library'>
      <p className="library__title">Favorite Songs</p>
      {generateFavoriteSongsList()}
    </div>
  );
};

export default Library;
