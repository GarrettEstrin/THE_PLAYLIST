import React from 'react';
import libraryItem from '../Types/Library';

import { useAppContext } from '../Utilities/AppContext';

function SearchResults(props: {searchTerm: string}) {
  const { initializedLibrary } = useAppContext();
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
      return <p>Start Searching!</p>
    }
    const searchResults = initializedLibrary?.map((song: libraryItem, index: number) => {
      if (search(searchTerm, song)) {
        return (
          <div className="row__item-cont" key={index}>
            <img className="row__artwork" src={`/album_covers/${song.album_art}`} alt="album art" />
            <p className="row__item-title">{song.title}</p>
            <p className="row__item-title">{song.artist}</p>
          </div>
        );
      }
      return null;
    });
    const filteredResults = searchResults?.filter(result => {
      return result;
    });
    return filteredResults?.length ? filteredResults : <p>Nothing Found!</p>
  };

  return (
    <div>
      {generateSearchResults()}
    </div>
  );
}

export default SearchResults;