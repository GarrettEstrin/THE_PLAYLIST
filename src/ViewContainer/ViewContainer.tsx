import React from 'react';
import { useAppContext } from '../Utilities/AppContext';

import Home from '../Home/Home';
import Search from '../Search/Search';
import Library from '../Library/Library';

import './viewContainer.css';

function ViewContainer() {
  const { currentView } = useAppContext();
  const getCurrentView = (currentView: string) => {
    switch (currentView) {
      case 'home':
        return <Home />
      case 'search':
        return <Search />
      case 'library':
        return <Library />
      default:
        return <Home />
    }
  }
  return (
    <div className="view">
      {getCurrentView(currentView)}
    </div>
  );
};

export default ViewContainer;
