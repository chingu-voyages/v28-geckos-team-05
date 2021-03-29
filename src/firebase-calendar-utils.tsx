import firebase from 'firebase/app';
import { Recipe } from './typescript/types';
import { db, auth } from './firebase';

// questo credo che andrà messo in un file più 
// generico come utility per avere lo user id dell'utente connesso
// o null se non c'è connessione e poter avere la verifica (importando la funzione) in ogni componente
// per ora l'ho messa qui per evitare conflitti
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

  // questo codice lo tengo per ora perché 
  // l'ho usato perun'altra struttura e ho scoperto delle cose
  // che mi portebbero essere utili
  // lo toglierò nel codice finale

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

  // verifica che la sottocollezione calendar esista
  // se no la crea più sotto
  // quando l'utente si connette per la prima volta la sua parte di db 
  // ancora non esiste e quindi bisogna aggiungerla
  const calendarData = await calendarRef.limit(1).get();

  // setta la sottocollezione calendar per quell'utente 
  // con un oggetto iniziale vuoto
  // lo riempie dopo
  if (calendarData.empty) {
    calendarRef.doc(dateMeal).set({});
  }

  const dayRef = await calendarRef.doc(dateMeal);
  const dayDoc = await dayRef.get();
  const id = recipe.id.toString();

  // se il giorno esiste già fa un'update dell'array con l'id che gli viene passato
  // se non esiste fa un set iniziale dell'array con l'id che gli viene passato
  if (!dayDoc.exists) {
    await dayRef.set({
      date,
      recipes_list: firebase.firestore.FieldValue.arrayUnion(id), // sono funzione proprie a firestore che ho appena scoperto per gestire gli array
    });
  } else {
    await dayRef.update({
      date,
      recipes_list: firebase.firestore.FieldValue.arrayUnion(id),
    });
  }
};
