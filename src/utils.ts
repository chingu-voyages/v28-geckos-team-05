import { URL, Recipe } from './typescript/types';

/** Returns either the json-server mock URL or the Spoonacular api URL, depending on whether REACT_APP_MOCK_API is set to true.
 * @param url a URL object type with properties apiURL and mockURL (both strings)
 * @returns a string with value set to the desired url
 */
const getURL: (url: URL) => string = (url) =>
  process.env.REACT_APP_IS_API_MOCKED === 'true' ? url.mockURL : url.apiURL;

const getIdsBulk: (recipes: Recipe[]) => string = (recipes) => {
  const idsString = recipes.map((recipe) => recipe.id).join(',');

  return idsString;
};

const areIngredientsListsIncompatible: (s1: string, s2: string) => boolean = (
  s1,
  s2
) => s1.split(',').some((el1) => s2.split(',').some((el2) => el1 === el2));

export { getURL, getIdsBulk, areIngredientsListsIncompatible };
