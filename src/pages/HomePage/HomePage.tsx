import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { URL } from '../../typescript/types';
import { getURL } from '../../utils';
import { HomepageContext } from '../../context/GlobalContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomePage({ userLoggedIn }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipesList, setRecipesList] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [searchEntered, setSearchEntered] = useState(false);

  const limit = 1;
  const baseUrl = process.env.REACT_APP_API_BASE_RECIPES_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const searchUrl: URL = {
    apiURL: `${baseUrl}/search?apiKey=${apiKey}&number=${limit}&query=${searchTerm}`,
    mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/search`,
  };
  const randomUrl: URL = {
    apiURL: `${baseUrl}/random?apiKey=${apiKey}&number=${limit}`,
    mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/random`,
  };

  const getSearchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchEntered(true);
    try {
      const response = await fetch(getURL(searchUrl));
      const jsonData = await response.json();
      setRecipesList(jsonData.results);
      setSearchTerm('');
    } catch (error) {
      setSearchError(error);
    }
  };

  const getRandomData = async () => {
    try {
      const response = await fetch(getURL(randomUrl));
      const jsonData = await response.json();
      setRecipesList(jsonData.recipes);
    } catch (error) {
      setSearchError(error);
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  return (
    <HomepageContext.Provider
      value={{
        searchTerm,
        searchEntered,
        getSearchData,
        getRandomData,
        handleChange,
      }}
    >
      <div className="page">
        <SearchBar />

        {!userLoggedIn && !searchEntered ? (
          <>
            {/* Splash page displayed when user is not logged in and no search has been entered yet */}
            <div className="splash">
              <p className="splash__paragraph">
                Meal planner helps you create a healthy eating habit no matter
                your constraints - be it your budget, food allergies, or
                monotony.
              </p>
              <div className="splash__images">images</div>
              <div className="splash__cta">
                <button type="button" className="button--primary">
                  Sign up
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* this code is for tests only --- to remove */}
            {recipesList.length
              ? recipesList.map((el: { title: string }) => (
                  <div key={el.title}>{el.title}</div>
                ))
              : 'Empty array :( '}
            {searchError && 'There was an error with the network request'}
            {/* end test only code */}
          </>
        )}
      </div>
    </HomepageContext.Provider>
  );
}
