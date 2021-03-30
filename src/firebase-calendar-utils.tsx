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

    // if calendar subcollection doesn't exists for this user
    // create it with empty value
    const calendarData = await calendarRef.limit(1).get();
    if (calendarData.empty) {
      calendarRef.doc(dateMeal).set({});
    }

    const dayRef = calendarRef.doc(dateMeal);
    const dayDoc = await dayRef.get();

    const { id } = recipe;
    const recipeIdString = id.toString();

    // if doc for this date does not exists create it and
    //        initialize the array with the first id
    // if exists update the array adding the id
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

    // add the recipe datas to recipes collection
    await addRecipeToRecipes(recipeIdString, recipe);

    return true;
  } catch (error) {
    return false;
  }
};

export const addRecipeToRecipes = async (
  recipeIdString: string,
  recipe: Recipe
) => {
  const recipeRef = db.collection('recipes').doc(recipeIdString);
  const recipeDoc = await recipeRef.get();

  // add recipe only if doesn't exists
  if (!recipeDoc.exists) {
    await recipeRef.set({
      ...recipe,
    });
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

  // if the id is the last one of the recipes_list array
  // for this day
  // remove the parent document (the day)
  removeDayFromCalendar(dayDoc, dayRef);
};

export const removeDayFromCalendar = async (
  dayDoc: firebase.firestore.DocumentData | undefined,
  dayRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
) => {
  if (dayDoc) {
    const datas = dayDoc.data();
    if (datas?.recipes_list.length === 1) {
      dayRef.delete();
    }
  }
};
