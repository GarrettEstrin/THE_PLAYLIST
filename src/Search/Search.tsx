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
      <p className="search__title">Search Coming Soon!</p>
      <input type='text' onChange={handleInputChange} value={inputValue} />
      <SearchResults searchTerm={inputValue} />
    </div>
  )
};

export default Search;
