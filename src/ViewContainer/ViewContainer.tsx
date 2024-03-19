import React from 'react';
import { useAppContext } from '../Utilities/AppContext';
import Views from '../Types/views';

import HomeView from '../Home/Home';
import SearchView from '../Search/Search';
import LibraryView from '../Library/Library';

import './viewContainer.css';

function ViewContainer() {
  const { Home, Search, Library } = Views;
  const { currentView, viewHeight } = useAppContext();
  const getCurrentView = (currentView: string) => {
    switch (currentView) {
      case Home:
        return <HomeView />
      case Search:
        return <SearchView />
      case Library:
        return <LibraryView />
      default:
        return <HomeView />
    }
  }
  return (
    <div className="view" style={{height: viewHeight + "px"}}>
      {getCurrentView(currentView)}
    </div>
  );
};

export default ViewContainer;
