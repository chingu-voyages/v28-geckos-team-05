import { db } from './firebase';

export const storeSettings = async (
  userDiet: string,
  userIntolerances: string,
  userId: string
) => {
  const userRef = await db.collection('user-data').doc(userId);
  const settingsRef = await userRef.collection('settings');

  await settingsRef.doc('settings').set({
    userDiet,
    userIntolerances,
  });
};

export const loadUserSettings = async (userId: string) => {
  console.log('loading user settings...');

  const userRef = await db.collection('user-data').doc(userId);

  const settingsRef = await userRef.collection('settings');
  const snapshot = await settingsRef.get();
  const settings: string[] = [];

  snapshot.forEach((doc) => {
    // settings.push(doc.data() as string);
    console.log('loaded from DB: ', doc.data());
  });

  return settings;
};

export const removeFromFavorites = async (userId: string, recipeId: string) => {
  const userRef = await db.collection('user-data').doc(userId);
  await userRef.collection('favorites').doc(recipeId).delete();
};
