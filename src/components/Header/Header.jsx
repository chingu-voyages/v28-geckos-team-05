import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';

function Header() {
  const toggleMobileMenu = () => {};

  const resizeNavbarOnScroll = (evt) => {
    const navbar = document.querySelector('.navbar');

    if (document.documentElement.scrollTop > 0) {
      navbar.classList.add('navbar--small');
    } else {
      navbar.classList.remove('navbar--small');
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', resizeNavbarOnScroll);
  }, []);

  return (
    <nav className="navbar">
      <FontAwesomeIcon
        icon={faBars}
        size="2x"
        onClick={toggleMobileMenu}
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
  );
}

export default withRouter(Header);
