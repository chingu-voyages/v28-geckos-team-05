import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { URL } from '../../typescript/types';
import { getURL, getIdsBulk } from '../../utils';
import { HomepageContext } from '../../context/GlobalContext';
import './HomePage.scss';
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
            <div className="splash">
              <p className="splash__paragraph">
                <strong>Meal planner</strong> helps you create a healthy eating
                habit no matter your constraints - be it your budget, food
                allergies, or monotony.
              </p>
              <div className="splash__maincontent">
                <div className="splash__item">
                  <div className="splash__paragraph">
                    <strong>Find</strong> healthy recipes that fit your budget
                    and dietary needs
                  </div>
                  <img
                    className="splash__image"
                    src={`${process.env.PUBLIC_URL}/images/splash1.jpg`}
                    alt="Find healthy recipes that fit your budget and dietary needs"
                  />
                </div>
                <div className="splash__item">
                  <img
                    className="splash__image"
                    src={`${process.env.PUBLIC_URL}/images/splash2.jpg`}
                    alt="Track your daily calorie and macronutrient intake"
                  />
                  <div className="splash__paragraph">
                    <strong>Track</strong> your daily calorie and macronutrient
                    intake
                  </div>
                </div>
                <div className="splash__item">
                  {' '}
                  <div className="splash__paragraph">
                    <strong>Generate</strong> your shopping list automatically
                  </div>
                  <img
                    className="splash__image"
                    src={`${process.env.PUBLIC_URL}/images/splash3.jpg`}
                    alt="Automatically generate your shopping list"
                  />
                </div>
                <div className="splash__item">
                  {' '}
                  <img
                    className="splash__image"
                    src={`${process.env.PUBLIC_URL}/images/splash4.jpg`}
                    alt="Learn new recipes step by step"
                  />
                  <div className="splash__paragraph">
                    <strong>Learn</strong> new recipes step by step
                  </div>
                </div>
              </div>
              <div className="splash__cta">
                <button type="button" className="button--primary">
                  Sign up
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {searchTerm && !recipesList.length && <Loader />}
            {searchTerm && !!recipesList.length && <RecipeCardList />}
            {searchError}
            {/* end test only code */}
          </>
        )}
      </div>
    </HomepageContext.Provider>
  );
}
