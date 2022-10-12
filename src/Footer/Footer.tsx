import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faMagnifyingGlass, faBookOpen } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__icon-cont">
        <FontAwesomeIcon icon={faHome} />
        <p>Home</p>
      </div>
      <div className="footer__icon-cont">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <p>Search</p>
      </div>
      <div className="footer__icon-cont">
        <FontAwesomeIcon icon={faBookOpen} />
        <p>Library</p>
      </div>
    </footer>
  )
};

export default Footer;
