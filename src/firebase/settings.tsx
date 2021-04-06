import { UserSettings } from '../typescript/types';
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
  let settings: UserSettings = {
    userDiet: 'initial',
    userIntolerances: 'initial',
  };

  snapshot.forEach((doc) => {
    settings = doc.data() as UserSettings;
  });

  console.log('loaded from DB: ', settings);
  return settings;
};
