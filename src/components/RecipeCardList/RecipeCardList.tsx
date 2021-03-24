import React, { useContext } from 'react';
import { HomepageContext } from '../../context/GlobalContext';
import RecipeFilter from '../RecipeFilter/RecipeFilter';
import { Recipe } from '../../typescript/types';
import RecipeCard from '../RecipeCard/RecipeCard';
import './RecipeCardList.scss';

// eslint-disable-next-line
export default function RecipeCardList(props: any) {
  const { recipesList, searchTerm } = useContext(HomepageContext);

  return (
    <div className="list__wrapper">
      <h2>{`Results for: ${searchTerm}`}</h2>
      <p>
        There are <strong>{recipesList.length}</strong> recipes that match your
        search parameters
      </p>
      <RecipeFilter handleFilter={props.handleFilter} />
      <div className="items">
        {recipesList &&
          recipesList.map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </div>
  );
}
