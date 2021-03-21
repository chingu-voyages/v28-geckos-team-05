import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { URL } from '../../typescript/types';
import { getURL, getIdsBulk } from '../../utils';
import { HomepageContext } from '../../context/GlobalContext';
import SplashContent from '../../components/SplashContent/SplashContent';
import RecipeCardList from '../../components/RecipeCardList/RecipeCardList';
import Loader from '../../components/Loader/Loader';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomePage({ userLoggedIn }: any) {
  const [textInput, setTextInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [recipesList, setRecipesList] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [searchEntered, setSearchEntered] = useState(false);

  const limit = 1;
  const baseUrl = process.env.REACT_APP_API_BASE_RECIPES_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const searchUrl: URL = {
    apiURL: `${baseUrl}/search?apiKey=${apiKey}&number=${limit}&query=${textInput}`,
    mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/search`,
  };
  const bulkUrl: URL = {
    apiURL: `${baseUrl}/informationBulk?apiKey=${apiKey}`,
    mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/random`,
  };
  const randomUrl: URL = {
    apiURL: `${baseUrl}/random?apiKey=${apiKey}&number=${limit}`,
    mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/random`,
  };

  let idsBulk = '';

  const getSearchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchEntered(true);
    setSearchError('');
    try {
      setSearchTerm(textInput);
      setRecipesList([]);
      const response = await fetch(getURL(searchUrl));
      const jsonData = await response.json();
      idsBulk = getIdsBulk(jsonData.results);
    } catch (error) {
      setSearchError(error);
    }
    if (idsBulk.length) {
      try {
        const responseBulk = await fetch(`${getURL(bulkUrl)}&ids=${idsBulk}`);
        const jsonDataBulk = await responseBulk.json();
        setRecipesList(jsonDataBulk);
        setTextInput('');
      } catch (error) {
        setSearchError(error);
      }
    } else {
      setTextInput('');
      setSearchTerm('');
      setSearchError(`no results for the search term : ${textInput}`);
    }
  };

  const getRandomData = async () => {
    setSearchError('');

    try {
      setSearchTerm('random recipes');
      setRecipesList([]);
      const response = await fetch(getURL(randomUrl));
      const jsonData = await response.json();
      setRecipesList(jsonData.recipes);
    } catch (error) {
      setSearchError(error);
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTextInput(e.target.value);
  }

  return (
    <HomepageContext.Provider
      value={{
        searchTerm,
        searchEntered,
        recipesList,
        getSearchData,
        getRandomData,
        handleChange,
      }}
    >
      <div className="page">
        <SearchBar textInput={textInput} />

        {!userLoggedIn && !searchEntered ? (
          <>
            {/* Splash page displayed when user is not logged in and no search has been entered yet */}
            <SplashContent />
          </>
        ) : (
          <>
            {searchTerm && !recipesList.length && <Loader />}
            {searchTerm && !!recipesList.length && <RecipeCardList />}
            {searchError}
            {/* end test only code */}
            Find recipes by filter
          </>
        )}
      </div>
    </HomepageContext.Provider>
  );
}
