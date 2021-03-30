import React, { useEffect, useState } from 'react';
import { Recipe } from '../../typescript/types';
import {
  getUserId,
  getFavorites,
  removeFromFavorites,
} from '../../firebase-favorites-utils';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import './FavoritesPage.scss';

export default function FavoritesPage() {
  const [recipesList, setRecipesList] = useState<Recipe[]>([]);
  const userId = getUserId();

  useEffect(() => {
    async function getFavoritesFromDB() {
      if (userId) {
        setRecipesList(await getFavorites(userId));
      }
    }

    getFavoritesFromDB();
  }, [userId]);

  const handleClickRemove = (recipeId: number) => {
    !!userId && removeFromFavorites(userId, String(recipeId));
    setRecipesList(recipesList.filter((recipe) => recipe.id !== recipeId));
  };

  return (
    <div className="page">
      <h1 className="page__title">Favorites</h1>
      <div className="recipes__container">
        {recipesList.map((recipe: Recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            showBinIcon={true}
            handleClickRemove={handleClickRemove}
          />
        ))}
      </div>
    </div>
  );
}