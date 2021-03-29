import React, { useContext } from 'react';
import { HomepageContext } from '../../context/GlobalContext';
import { Recipe } from '../../typescript/types';
import RecipeCard from '../RecipeCard/RecipeCard';
import './RecipeCardList.scss';

export default function RecipeCardList() {
  const { recipesList, searchTerm } = useContext(HomepageContext);

  return (
    <div className="list__wrapper">
      <h2>{`Results for: ${searchTerm}`}</h2>
      <p>
        There are <strong>{recipesList.length}</strong> recipes that match your
        search parameters
      </p>
      <div className="items">
        {recipesList &&
          recipesList.map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} showBinIcon={false} />
          ))}
      </div>
    </div>
  );
}
