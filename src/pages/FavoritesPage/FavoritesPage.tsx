import React, { useEffect, useState } from 'react';
import { Recipe } from '../../typescript/types';
import { getUserId } from '../../firebase/firebase';
import { getFavorites, removeFromFavorites } from '../../firebase/favorites';
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
      <div className="items__container">
        <div className="items">
          {recipesList.map((recipe: Recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              handleRemove={handleClickRemove}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
