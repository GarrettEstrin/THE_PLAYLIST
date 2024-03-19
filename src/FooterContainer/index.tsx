import React, { useEffect } from 'react';
import { useAppContext } from '../Utilities/AppContext';
import Player from '../Player/Player';
import Footer from '../Footer/Footer';

import './footerContainer.css';

function FooterContainer() {
  const { setFooterHeight } = useAppContext();
  
  useEffect(() => {
    setFooterHeight(document.getElementsByClassName('footer-cont')[0].clientHeight)
  })
  return (
    <div className="footer-cont">
      <Player />
      <Footer />
    </div>
  )
};

export default FooterContainer;
