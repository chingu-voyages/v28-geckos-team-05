import firebase from 'firebase/app';
import { Recipe } from './typescript/types';
import { db } from './firebase';
import { convertDateToString } from './utils';

export const stockCalendarData = async (
  date: Date | [Date, Date] | null,
  recipe: Recipe,
  userId: string
) => {
  const dateMeal = convertDateToString(date);

  try {
    const userRef = db.collection('user-data').doc(userId);
    const calendarRef = userRef.collection('calendar');
    const calendarData = await calendarRef.limit(1).get();

    if (calendarData.empty) {
      calendarRef.doc(dateMeal).set({});
    }

    const dayRef = calendarRef.doc(dateMeal);
    const dayDoc = await dayRef.get();
    const { id } = recipe;
    const recipeIdString: string = id.toString();

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

    const recipeRef = db.collection('recipes').doc(recipeIdString);
    const recipeDoc = await recipeRef.get();

    if (!recipeDoc.exists) {
      await recipeRef.set({
        ...recipe,
      });
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const removeRecipeFromCalendar = async (
  recipeId: number,
  userId: string,
  storedDate: string
) => {
  const userRef = db.collection('user-data').doc(userId);
  const calendarRef = userRef.collection('calendar');
  const dayRef = calendarRef.doc(storedDate);
  const dayDoc = await dayRef.get();

  await dayRef.update({
    recipes_list: firebase.firestore.FieldValue.arrayRemove(recipeId),
  });

  const datas = dayDoc.data();

  if (datas?.recipes_list.length === 1) {
    dayRef.delete();
  }
};
