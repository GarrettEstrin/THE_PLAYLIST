import React, { useState } from 'react';

import './search.css';
import SearchResults from './SearchResults';
import { useAppContext } from '../Utilities/AppContext';

function Search() {
  const { setIsKeyboardActive } = useAppContext();
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (evt: any) => {
    setInputValue(evt.target.value)
  }

  return (
    <div className="view__search">
      <div className="search__input-cont">
        <input
          type='text'
          className="search__input"
          onChange={handleInputChange}
          value={inputValue}
          onFocus={() => setIsKeyboardActive(true)}
          onBlur={() => setIsKeyboardActive(false)}
          placeholder="What do you want to listen to?" />
      </div>
      <SearchResults searchTerm={inputValue} />
    </div>
  )
};

export default Search;
