/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase/app';
import { Recipe } from '../typescript/types';
import { db } from './firebase';
import { convertDateToString } from '../utils';

export const stockCalendarData = async (
  date: Date | [Date, Date] | null,
  recipe: Recipe,
  userId: string
) => {
  const dateMeal = convertDateToString(date);

  try {
    const userRef = db.collection('user-data').doc(userId);
    const calendarRef = userRef.collection('calendar');
    const dayRef = calendarRef.doc(dateMeal);
    const dayDoc = await dayRef.get();
    const dayData = dayDoc.data();

    const calorieAmount = extractCalorieAmount(recipe);
    const { id, pricePerServing } = recipe;
    const recipeIdString = id.toString();
    const updatedRecipeList = firebase.firestore.FieldValue.arrayUnion(id);

    // if doc for this date does not exists create it and
    //        initialize the array with the first id
    //        and the price
    // if exists update the array adding the id
    //        and the price
    if (!dayDoc.exists) {
      await dayRef.set({
        date,
        recipes_list: updatedRecipeList,
        cost: pricePerServing,
        calories: calorieAmount,
      });
    } else {
      await dayRef.update({
        date,
        recipes_list: updatedRecipeList,
        cost: updateAmount(pricePerServing, id, dayData?.recipes_list),
        calories: updateAmount(calorieAmount, id, dayData?.recipes_list),
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

export const extractCalorieAmount = (recipe: any) => {
  const { nutrition: { nutrients } = { nutrients: [] } } = recipe;

  if (nutrients.length === 0) return 0;

  const calories = nutrients.filter((item: any) => item.name === 'Calories');

  return calories[0].amount;
};

export const removeRecipeFromCalendar = async (
  recipeId: number,
  userId: string,
  storedDate: string,
  recipePricePerServing: number = 0,
  calorieAmount: number = 0
) => {
  const userRef = db.collection('user-data').doc(userId);
  const calendarRef = userRef.collection('calendar');
  const dayRef = calendarRef.doc(storedDate);
  const dayDoc = await dayRef.get();

  await dayRef.update({
    recipes_list: firebase.firestore.FieldValue.arrayRemove(recipeId),
    cost: firebase.firestore.FieldValue.increment(-recipePricePerServing),
    calories: firebase.firestore.FieldValue.increment(-calorieAmount),
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

export const updateAmount = (
  price: number,
  id: number,
  recipes_list: number[]
) => {
  if (!recipes_list.includes(id)) {
    return firebase.firestore.FieldValue.increment(price);
  }

  return firebase.firestore.FieldValue.increment(0);
};
