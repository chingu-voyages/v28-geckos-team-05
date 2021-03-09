import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <div className="header">
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </div>
  );
}

export default withRouter(Header);
