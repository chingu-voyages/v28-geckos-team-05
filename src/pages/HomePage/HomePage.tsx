import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { HomepageContext } from '../../context/GlobalContext';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipesList, setRecipesList] = useState([]);
  const [searchError, setSearchError] = useState('');

  const limit = 1;
  const baseUrl = process.env.REACT_APP_API_BASE_RECIPES_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const searchUrl = `${baseUrl}/search?apiKey=${apiKey}&number=${limit}&query=${searchTerm}`;
  const randomUrl = `${baseUrl}/random?apiKey=${apiKey}&number=${limit}`;

  const getSearchData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(searchUrl);
      const jsonData = await response.json();
      setRecipesList(jsonData.results);
      setSearchTerm('');
    } catch (error) {
      setSearchError(error);
    }
  };

  const getRandomData = async () => {
    try {
      const response = await fetch(randomUrl);
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
        getSearchData,
        getRandomData,
        handleChange
      }}
    >
      <div className="page">
        <SearchBar />

        {/* this code is for tests only --- to remove */}
        { 
          recipesList.length          
          ? recipesList.map((el: { title: string }) => (
              <div key={el.title}>{el.title}</div>
            ))
          : 'Empty array :( '
        }
        {/* end test only code */}  
      </div>
    </ HomepageContext.Provider>
  );
}
