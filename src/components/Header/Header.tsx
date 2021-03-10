import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';

import './Header.scss';

function Header() {
  const toggleMobileMenu = () => {};

  return (
    <nav className="navbar">
      <FontAwesomeIcon
        icon={faBars}
        size="2x"
        onClick={toggleMobileMenu}
        id="hamburgerMenu"
        className="navbar-menuIcon"
      />
      <div className="navbar-links">
        <div className="navbar-content--left">
          <Link to="/" className="navbar-menuItem">
            <FontAwesomeIcon icon={faHome} size="2x" />
          </Link>
          <Link to="/about" className="navbar-menuItem">
            ABOUT
          </Link>
          <Link to="/calendar" className="navbar-menuItem">
            CALENDAR
          </Link>
          <Link to="/favorites" className="navbar-menuItem">
            FAVORITES
          </Link>
        </div>

        <div className="navbar-content--right">
          <div className="navbar-menuItem">Hi, User123</div>
          <Link to="#" className="navbar-menuItem">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Header);
