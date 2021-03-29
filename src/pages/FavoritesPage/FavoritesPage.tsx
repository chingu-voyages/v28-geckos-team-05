import React, { useEffect, useRef } from 'react';
import { Recipe } from '../../typescript/types';
import { getUserId, getFavorites } from '../../firebase-favorites-utils';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

export default function FavoritesPage() {
  const rec: React.MutableRefObject<Recipe[] | boolean> = useRef([]);
  rec.current = [];
  const userId = getUserId();

  useEffect(() => {
    async function getStuff() {
      console.log('userID: ', userId);

      if (userId) {
        console.log('check passed');
        rec.current = await getFavorites(userId);
        console.log('curr: ', rec.current);
      }
    }

    getStuff();
  }, [userId, rec.current.length]);

  console.log('in favorites: ', rec.current);

  return (
    <div className="page">
      <h1>Favorites</h1>
      <div className="items">
        {rec.current.map((recipe: Recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
