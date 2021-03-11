import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import NavigationModal from '../NavigationModal/NavigationModal';

import './Header.scss';

function Header() {
  const [showModal, setShowModal] = useState(false);

  const resizeNavbarOnScroll = () => {
    const navbar = document.querySelector('.navbar');

    document.documentElement.scrollTop > 0
      ? navbar && navbar.classList.add('navbar--small')
      : navbar && navbar.classList.remove('navbar--small');
  };

  useEffect(() => {
    document.addEventListener('scroll', resizeNavbarOnScroll);
  }, []);

  return (
    <>
      {showModal && <NavigationModal onClose={() => setShowModal(false)} />}

      <nav className="navbar">
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          onClick={() => setShowModal(true)}
          id="hamburgerMenu"
          className="navbar__menuIcon"
        />

        <div className="navbar__links">
          <div className="navbar-container--left">
            <Link to="/" className="navbar__menuItem">
              <FontAwesomeIcon icon={faHome} size="2x" />
            </Link>
            <Link to="/about" className="navbar__menuItem">
              ABOUT
            </Link>
            <Link to="/calendar" className="navbar__menuItem">
              CALENDAR
            </Link>
            <Link to="/favorites" className="navbar__menuItem">
              FAVORITES
            </Link>
          </div>
          <div className="navbar-container--right">
            <div className="navbar__menuItem">Hi, User123</div>
            <Link to="#" className="navbar__menuItem">
              Login
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
