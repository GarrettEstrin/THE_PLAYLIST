import React from 'react';
import { useAppContext } from '../Utilities/AppContext';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMagnifyingGlass, faBookOpen } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  const { setCurrentView } = useAppContext();
  return (
    <footer className="footer">
      <div className="footer__icon-cont" onClick={() => setCurrentView('home')}>
        <FontAwesomeIcon icon={faHome} />
        <p>Home</p>
      </div>
      <div className="footer__icon-cont" onClick={() => setCurrentView('search')}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <p>Search</p>
      </div>
      <div className="footer__icon-cont">
        <FontAwesomeIcon icon={faBookOpen} onClick={() => setCurrentView('library')}/>
        <p>Library</p>
      </div>
    </footer>
  )
};

export default Footer;
