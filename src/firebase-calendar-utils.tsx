import firebase from 'firebase/app';
import { Recipe } from './typescript/types';
import { db, auth } from './firebase';

export const getUserId = () => {
  if (auth.currentUser !== null) {
    return auth.currentUser?.uid;
  }
  return null;
};

export const stockCalendarData = async (
  date: Date | [Date, Date] | null,
  recipe: Recipe,
  userId: string
) => {
  let dateMeal = '';

  // serve solo per gestire le date del datepicker
  // che possono essere di differenti tipi
  // lo sposterò in una funzione esterna domani
  if (Array.isArray(date)) {
    const firstDate = date[0];
    [dateMeal] = firstDate.toISOString().split('T');
  } else if (date instanceof Date) {
    [dateMeal] = date.toISOString().split('T');
  } else {
    [dateMeal] = new Date().toISOString().split('T');
  }

  const userRef = await db.collection('user-data').doc(userId);
  // const userDoc = await userRef.get();

  /* const dayRef = await userRef.collection(dateMeal);
  const id = recipe.id.toString();

  await dayRef.doc(id).set({
    title: recipe.title,
    image: recipe.image,
    readyInMinutes: recipe.readyInMinutes,
    servings: recipe.servings,
    aggregateLikes: recipe.aggregateLikes,
  }); */

  const calendarRef = await userRef.collection('calendar');

  const calendarData = await calendarRef.limit(1).get();

  if (calendarData.empty) {
    calendarRef.doc(dateMeal).set({});
  }

  const dayRef = await calendarRef.doc(dateMeal);
  const dayDoc = await dayRef.get();
  const id = recipe.id.toString();

  if (!dayDoc.exists) {
    await dayRef.set({
      date,
      recipes_list: firebase.firestore.FieldValue.arrayUnion(id),
    });
  } else {
    await dayRef.update({
      date,
      recipes_list: firebase.firestore.FieldValue.arrayUnion(id),
    });
  }
};
