import React, { useEffect, useState } from 'react';
import { useAppContext } from '../Utilities/AppContext';
import Player from '../Player/Player';
import Footer from '../Footer/Footer';

import './footerContainer.css';

function FooterContainer() {
  const { setFooterHeight, htmlHeight, currentView } = useAppContext();
  const [localFooterTop, setFooterTop] = useState(0);

  useEffect(() => {
    const height = document.getElementsByClassName('footer-cont')[0].clientHeight;
    setFooterTop(htmlHeight - height);
    setFooterHeight(height);
  }, [localFooterTop, setFooterHeight, htmlHeight])

  let style = {}
  if (currentView === "search") {
    style={top: localFooterTop + "px"}
  }
  return (
    <div className="footer-cont" style={style}>
      <Player />
      <Footer />
    </div>
  )
};

export default FooterContainer;
