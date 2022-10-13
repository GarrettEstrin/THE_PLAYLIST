import React from 'react';
import logo from '../assets/img/logo-no-background.svg';
import './header.css';

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="logo" />
    </header>
  );
}

export default Header;
