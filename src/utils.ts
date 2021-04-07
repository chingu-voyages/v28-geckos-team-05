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

const getNutrientParamsString: (
  filters: { name: string; value: number }[]
) => string = (filters) =>
  filters.map((filter) => `${filter.name}=${filter.value}`).join('&');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertDateFromTimestamp: ({ seconds }: any) => string = ({
  seconds,
}) => {
  const a = new Date(seconds * 1000);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = `${month} ${date}, ${year}`;

  return time;
};

const convertDateToString: (date: Date | [Date, Date] | null) => string = (
  date
) => {
  let dateString = '';

  if (Array.isArray(date)) {
    const firstDate = date[0];
    [dateString] = firstDate.toISOString().split('T');
  } else if (date instanceof Date) {
    [dateString] = date.toISOString().split('T');
  } else {
    [dateString] = new Date().toISOString().split('T');
  }

  return dateString;
};

const convertCentsToDollars: (cents: number) => string = (cents) => {
  const dollarsNumber = cents / 100;
  const dollarsString = dollarsNumber.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return dollarsString;
};

export {
  getURL,
  getIdsBulk,
  getNutrientParamsString,
  convertDateFromTimestamp,
  convertDateToString,
  convertCentsToDollars,
};
