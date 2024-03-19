import React from 'react';
import libraryItem from '../Types/Library';

import { useAppContext } from '../Utilities/AppContext';

function SearchResults(props: {searchTerm: string}) {
  const { initializedLibrary, playNextSong, getSearchSuggestion } = useAppContext();
  const { searchTerm } = props;
  const search = (searchTerm: string, song: libraryItem) => {
    const { title, artist} = song;
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artist.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const generateSearchResults = () => {
    if (searchTerm.length === 0) {
      return [];
    }
    const searchResults = initializedLibrary?.map((song: libraryItem, index: number) => {
      if (search(searchTerm, song)) {
        return (
          <div className="search__row-cont" key={index} onClick={() => {playNextSong(song.key)}}>
            <img className="search__artwork" src={`/album_covers/${song.album_art}`} alt="album art" />
            <div className="search__title-cont">
              <p className="search__item-title">{song.title}</p>
              <p className="search__item-title">{song.artist}</p>
            </div>
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
    <div>
      {generateSearchResults()}
    </div>
  );
}

export default SearchResults;