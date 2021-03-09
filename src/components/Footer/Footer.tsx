import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import './Footer.scss';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__link-container">
        <a href="https://github.com/chingu-voyages/v28-geckos-team-05">
          Github
        </a>
        <a href="https://spoonacular.com/food-api">Spoonacular API</a>
        <Link to="/about">Contact Us</Link>
      </div>
    </footer>
  );
}
