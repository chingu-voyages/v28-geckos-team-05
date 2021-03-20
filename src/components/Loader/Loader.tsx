import React from 'react';
import './Loader.scss';

export default function Loader() {
  return (
    <div className="loader">
      <div className="loader__text">Loading recipes...</div>
      <div className="loader__spinner" />
    </div>
  );
}
