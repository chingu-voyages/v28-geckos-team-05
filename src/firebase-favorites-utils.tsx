import { Recipe } from './typescript/types';
import { db, auth } from './firebase';

export const getUserId = () => {
  if (auth.currentUser !== null) {
    return auth.currentUser?.uid;
  }
  return null;
};

export const storeFavorite = async (recipe: Recipe, userId: string) => {
  const userRef = await db.collection('user-data').doc(userId);
  const favoritesRef = await userRef.collection('favorites');
  const id = recipe.id.toString();

  await favoritesRef.doc(id).set({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    readyInMinutes: recipe.readyInMinutes,
    servings: recipe.servings,
    aggregateLikes: recipe.aggregateLikes,
  });
};

export const getFavorites = async (userId: string) => {
  const userRef = await db.collection('user-data').doc(userId);
  const favoritesRef = await userRef.collection('favorites');
  const snapshot = await favoritesRef.get();
  const favorites: Recipe[] = [];

  snapshot.forEach((doc) => {
    favorites.push(doc.data() as Recipe);
  });

  return favorites;
};
