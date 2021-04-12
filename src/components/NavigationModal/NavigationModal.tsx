import React, { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import './NavigationModal.scss';

interface Props {
  isLogged: boolean;
  onClose: MouseEventHandler;
}

export default function NavigationModal({ isLogged, onClose }: Props) {
  return (
    <div className="modal">
      <div className="modal-header">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
        <div
          className="modal__button"
          onClick={onClose}
          role="tab"
          tabIndex={-1}
        >
          &#10005;
        </div>
      </div>
      <div className="modal-content">
        <div className="modal-content-links">
          <div className="modal-content-links__link">
            <Link to="/" onClick={onClose}>
              Home
            </Link>
          </div>
          <div className="modal-content-links__link">
            <Link to="/about" onClick={onClose}>
              About
            </Link>
          </div>

          {isLogged && (
            <>
              <div className="modal-content-links__link">
                <Link to="/calendar" onClick={onClose}>
                  Calendar
                </Link>
              </div>
              <div className="modal-content-links__link">
                <Link to="/favorites" onClick={onClose}>
                  Favorites
                </Link>
              </div>
              <div className="modal-content-links__link">
                <Link to="/settings" onClick={onClose}>
                  Settings
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
