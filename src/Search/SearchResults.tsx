import React, { useEffect, useState } from 'react';
import libraryItem from '../Types/Library';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

import { useAppContext } from '../Utilities/AppContext';

function SearchResults(props: {searchTerm: string}) {
  const { initializedLibrary, playNextSong, getSearchSuggestion, viewHeight, isKeyboardActive, removeFavorite, addFavorite, favorites } = useAppContext();
  const { searchTerm } = props;
  const [searchResultStyle, setSearchResultStyle] = useState({});
  const heightOfInput = 70;
  
  const search = (searchTerm: string, song: libraryItem) => {
    const { title, artist, tags} = song;
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tags.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  useEffect(() => { 
    if (isKeyboardActive) {
      setSearchResultStyle({ height:   viewHeight - heightOfInput + "px"});
    } else {
      setSearchResultStyle({});
    }
  }, [viewHeight, isKeyboardActive])

  const generateSearchResults = () => {
    if (searchTerm.length === 0) {
      return [];
    }
    const searchResults = initializedLibrary?.map((song: libraryItem, index: number) => {
      if (search(searchTerm, song)) {
        return (
          <div className="search__row-cont" key={index}>
            <img
              className="search__artwork"
              src={`/album_covers/${song.album_art}`}
              alt="album art"
              onClick={() => { playNextSong(song.key) }}
            />
            <div className="search__title-cont" onClick={() => {playNextSong(song.key)}}>
              <p className="search__item-title">{song.title}</p>
              <p className="search__item-title">{song.artist}</p>
            </div>
            {favorites.includes(song.key) ?
              <div className="search__favorite" onClick={() => {removeFavorite(song.key)}}><FontAwesomeIcon icon={faHeart} /></div> :
              <div className="search__favorite" onClick={() => {addFavorite(song.key)}}><FontAwesomeIcon icon={farHeart} /></div>
      }
          </div>
        );
      }
      return null;
    });
    const filteredResults = searchResults?.filter(result => {
      return result;
    });
    return filteredResults?.length ? filteredResults :
      (
        <div className="search__row-cont">
          <p>Nothing Found! Try: {getSearchSuggestion()}</p>
        </div>
      );
  };

  return (
    <div className="search__results" style={searchResultStyle}>
      {generateSearchResults()}
    </div>
  );
}

export default SearchResults;