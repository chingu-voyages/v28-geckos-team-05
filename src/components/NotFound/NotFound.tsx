import React from 'react';

import './NotFound.scss';

import toaster from '../../assets/toaster.png';

export default function NotFound() {
  return (
    <div className="notfound__container">
      <img className="notfound__image" src={toaster} alt="not found" />
      <div className="notfound__text">
        <p>404</p>
        <p>This page is burnt to a crisp.</p>
      </div>
    </div>
  );
}
