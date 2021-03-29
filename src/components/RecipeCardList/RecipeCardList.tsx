import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
        There are <strong>{recipesList.length}</strong> recipes that matches
        your research
      </p>
      <div className="items">
        {recipesList &&
          recipesList.map((recipe: Recipe) => (
            <Link
              to={{
                pathname: `/recipe/${recipe.id}`,
                state: recipe,
              }}
              key={recipe.id}
            >
              <RecipeCard key={recipe.id} recipe={recipe} />
            </Link>
          ))}
      </div>
    </div>
  );
}
