import React, { useLayoutEffect, useState } from 'react';
import { useAppContext } from '../Utilities/AppContext';
import Views from '../Types/views';

import HomeView from '../Home/Home';
import SearchView from '../Search/Search';
import LibraryView from '../Library/Library';

import './viewContainer.css';

function ViewContainer() {
  const [viewHeight, setViewHeight] = useState(0)
  useLayoutEffect(() => {
    const headerHeight = document.getElementsByClassName('header')[0].clientHeight;
    const footerHeight = document.getElementsByClassName('footer-cont')[0].clientHeight;
    const bodyHeight = document.documentElement.clientHeight;
    const viewHeight = bodyHeight - headerHeight - footerHeight;
    setViewHeight(viewHeight);
  }, [viewHeight])

  const { Home, Search, Library } = Views;
  const { currentView } = useAppContext();
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
    <div className="view" style={{maxHeight: viewHeight + "px"}}>
      {getCurrentView(currentView)}
    </div>
  );
};

export default ViewContainer;
