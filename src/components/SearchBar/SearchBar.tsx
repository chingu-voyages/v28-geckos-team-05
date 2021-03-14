import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HomepageContext } from '../../context/GlobalContext';

import './SearchBar.scss';

export default function SearchBar() {
  const { searchTerm, getSearchData, getRandomData, handleChange } = useContext(
    HomepageContext
  );
  return (
    <div
      className="search"
      style={{
        backgroundImage: `url('${process.env.PUBLIC_URL}/images/bg-searchbar.jpg')`,
      }}
    >
      <div className="search__container">
        <h1>MEAL PLANNER</h1>
        <h2>FIND YOUR RECIPE</h2>
        <form onSubmit={getSearchData}>
          <div className="search__wrapper">
            <FontAwesomeIcon icon={faSearch} className="search__icon" />
            <input
              type="text"
              placeholder="Insert your search term..."
              value={searchTerm}
              onChange={handleChange}
              required
            />
            <button type="submit" className="search__submit" title={`start your research ${searchTerm && `for: ${searchTerm}`}`}>
              search
            </button>
          </div>
          <button
            type="button"
            onClick={getRandomData}
            className="search__random"
            title="start your random research"
          >
            I'm feeling lucky
          </button>
        </form>
      </div>
    </div>
  );
}
