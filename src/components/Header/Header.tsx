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
        <Link to="/">
          <FontAwesomeIcon
            icon={faHome}
            size="2x"
            className="navbar-menuItem"
          />
        </Link>
        <Link to="/about" className="navbar-menuItem">
          About
        </Link>
        <Link to="/calendar" className="navbar-menuItem">
          Calendar
        </Link>
        <Link to="/favorites" className="navbar-menuItem">
          Favorites
        </Link>

        <div className="navbar-content--right">
          Hi, User123
          <Link to="#">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Header);
