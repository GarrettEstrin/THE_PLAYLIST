import React, { useLayoutEffect, useState } from 'react';
import { useAppContext } from '../Utilities/AppContext';
import logo from '../assets/img/logo-no-background.svg';
import './header.css';

function Header() {
  const { setHeaderHeight } = useAppContext();
  const [headerLoaded, setHeaderLoaded] = useState(false);
  useLayoutEffect(() => {
    const clientHeight = document.getElementsByClassName('header')[0].clientHeight;
    if (headerLoaded) {
      setHeaderHeight(clientHeight);
    }
  }, [headerLoaded, setHeaderHeight])
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" onLoad={() => {setHeaderLoaded(true)}}/>
    </header>
  );
}

export default Header;
