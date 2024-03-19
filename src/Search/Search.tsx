import React, { useState } from 'react';

import './search.css';
import SearchResults from './SearchResults';

function Search() {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (evt: any) => {
    setInputValue(evt.target.value)
  }

  return (
    <div className="view search">
      <input type='text' className="search__input" onChange={handleInputChange} value={inputValue} placeholder="What do you want to listen to?"/>
      <SearchResults searchTerm={inputValue} />
    </div>
  )
};

export default Search;
