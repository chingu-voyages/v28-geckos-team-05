import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { URL } from '../../typescript/types';
import {
  getURL,
  getIdsBulk,
  areIngredientsListsIncompatible,
} from '../../utils';
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

  const limit = 12;
  const baseUrl = process.env.REACT_APP_API_BASE_RECIPES_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const searchUrl: URL = {
    apiURL: `${baseUrl}/complexSearch?apiKey=${apiKey}&number=${limit}&query=${textInput}&addRecipeNutrition=true`,
    mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/search`,
  };
  const bulkUrl: URL = {
    apiURL: `${baseUrl}/informationBulk?apiKey=${apiKey}`,
    mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/bulkinfo`,
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
      bulkUrl.apiURL += `&ids=${idsBulk}`;

      try {
        const responseBulk = await fetch(getURL(bulkUrl));
        const jsonDataBulk = await responseBulk.json();
        setRecipesList(jsonDataBulk);
      } catch (error) {
        setSearchError(error);
      }
    } else {
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

  const handleFilter = async (
    nutritionFilters: string,
    ingredientsToInclude: string,
    ingredientsToExclude: string
  ) => {
    // Check that no ingredient is both included and excluded. If so, remove it from includeIngredients
    if (
      areIngredientsListsIncompatible(
        ingredientsToInclude,
        ingredientsToExclude
      )
    ) {
      setSearchError(
        'You have both included and excluded an ingredient from the search parameters!'
      );
    } else {
      const url: URL = {
        apiURL: `${baseUrl}/complexSearch?apiKey=${apiKey}&number=${limit}&query=${textInput}&${nutritionFilters}&includeIngredients=${ingredientsToInclude}&excludeIngredients=${ingredientsToExclude}`,
        mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/search`,
      };

      try {
        setSearchTerm(textInput);
        setRecipesList([]);
        const response = await fetch(getURL(url));
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
        setSearchError(
          `no results for the search term: ${textInput} (minCalories: , include ingredients: , exclude ingredients: )`
        );
      }
    }
  };

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
            {searchTerm && !!recipesList.length && (
              <RecipeCardList handleFilter={handleFilter} />
            )}
            {searchError}
            {/* end test only code */}
          </>
        )}
      </div>
    </HomepageContext.Provider>
  );
}
