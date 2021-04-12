import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { URL, UserSettings } from '../../typescript/types';
import { getURL, getIdsBulk, getRandomApiKey } from '../../utils';
import { HomepageContext } from '../../context/GlobalContext';
import SplashContent from '../../components/SplashContent/SplashContent';
import RecipeFilter from '../../components/RecipeFilter/RecipeFilter';
import RecipeCardList from '../../components/RecipeCardList/RecipeCardList';
import Loader from '../../components/Loader/Loader';
import { loadUserSettings } from '../../firebase/settings';
import { getUserId } from '../../firebase/firebase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HomePage({ userLoggedIn }: any) {
  const [textInput, setTextInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [recipesList, setRecipesList] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [searchEntered, setSearchEntered] = useState(false);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    userDiet: 'starting',
    userIntolerances: 'starting',
  });

  const limit = 12;
  const baseUrl = process.env.REACT_APP_API_BASE_RECIPES_URL;
  const userId = getUserId();

  const getSearchUrl: () => URL = () => ({
    apiURL: `${baseUrl}/complexSearch?apiKey=${getRandomApiKey()}&number=${limit}&query=${textInput}&addRecipeNutrition=true&diet=${
      userSettings.userDiet
    }&intolerances=${userSettings.userIntolerances}`,
    mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/search`,
  });

  const bulkUrl: URL = {
    apiURL: `${baseUrl}/informationBulk?apiKey=${getRandomApiKey()}&includeNutrition=true`,
    mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/bulkinfo`,
  };
  const randomUrl: URL = {
    apiURL: `${baseUrl}/complexSearch?apiKey=${getRandomApiKey()}&number=${limit}&addRecipeNutrition=true&sort=random`,
    // apiURL: `${baseUrl}/random?apiKey=${getRandomApiKey()}&number=${limit}`,
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

      const response = await fetch(getURL(getSearchUrl()));

      const jsonData = await response.json();
      idsBulk = getIdsBulk(jsonData.results);
    } catch (error) {
      setSearchError(error.toString());
    }

    if (idsBulk.length) {
      bulkUrl.apiURL += `&ids=${idsBulk}`;

      try {
        const responseBulk = await fetch(getURL(bulkUrl));
        const jsonDataBulk = await responseBulk.json();
        setRecipesList(jsonDataBulk);
      } catch (error) {
        setSearchError(error.toString());
      }
    } else {
      setSearchTerm('');
      setSearchError(`no results for the search term: ${textInput}`);
    }
  };

  const getRandomData = async () => {
    setSearchError('');
    setSearchEntered(true);

    try {
      setSearchTerm('random recipes');
      setRecipesList([]);
      const response = await fetch(getURL(randomUrl));
      const jsonData = await response.json();
      setRecipesList(jsonData.results);
    } catch (error) {
      setSearchError(error.toString());
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
    // Check that no ingredient is both included and excluded. If so, remove it from includedIngredients
    const url: URL = {
      apiURL: `${baseUrl}/complexSearch?apiKey=${getRandomApiKey()}&number=${limit}&query=${textInput}&${nutritionFilters}&includeIngredients=${ingredientsToInclude}&excludeIngredients=${ingredientsToExclude}`,
      mockURL: `${process.env.REACT_APP_MOCK_BASE_URL}/search`,
    };

    try {
      setSearchTerm(textInput);
      setRecipesList([]);
      const response = await fetch(getURL(url));
      const jsonData = await response.json();
      idsBulk = getIdsBulk(jsonData.results);
    } catch (error) {
      setSearchError(error.toString());
    }

    if (idsBulk.length) {
      bulkUrl.apiURL += `&ids=${idsBulk}`;

      try {
        const responseBulk = await fetch(getURL(bulkUrl));
        const jsonDataBulk = await responseBulk.json();
        setRecipesList(jsonDataBulk);
      } catch (error) {
        setSearchError(error.toString());
      }
    } else {
      setSearchTerm('');
      setSearchError(`no results for the search term: ${textInput}`);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      const result = !!userId && (await loadUserSettings(userId));
      return result;
    };

    !!userId &&
      loadSettings().then((res) => {
        res && setUserSettings(res);
      });
  }, [userId]);

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

        {!searchEntered ? (
          <>
            {/* Splash page displayed when user is not logged in and no search has been entered yet */}
            <SplashContent userLoggedIn={userLoggedIn} />
          </>
        ) : (
          <>
            {searchTerm && <RecipeFilter handleFilter={handleFilter} />}
            {searchTerm && !recipesList.length && <Loader />}
            {searchTerm && !!recipesList.length && <RecipeCardList />}
            {searchError}
          </>
        )}
      </div>
    </HomepageContext.Provider>
  );
}
