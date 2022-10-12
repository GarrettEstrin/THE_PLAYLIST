import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMagnifyingGlass, faBookOpen } from '@fortawesome/free-solid-svg-icons'

import { useAppContext } from '../Utilities/AppContext';
import Views from '../Types/views';
import './footer.css';

function Footer() {
  const { setCurrentView } = useAppContext();
  const { Home, Search, Library } = Views;
  return (
    <footer className="footer">
      <div className="footer__icon-cont" onClick={() => setCurrentView(Home)}>
        <FontAwesomeIcon icon={faHome} />
        <p>Home</p>
      </div>
      <div className="footer__icon-cont" onClick={() => setCurrentView(Search)}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <p>Search</p>
      </div>
      <div className="footer__icon-cont">
        <FontAwesomeIcon icon={faBookOpen} onClick={() => setCurrentView(Library)}/>
        <p>Library</p>
      </div>
    </footer>
  )
};

export default Footer;
