import { URL } from './typescript/types';

/** Returns either the json-server mock URL or the Spoonacular api URL, depending on whether REACT_APP_MOCK_API is set to true.
 * @param url a URL object type with properties apiURL and mockURL (both strings)
 * @returns a string with value set to the desired url
 */
const getURL: (url: URL) => string = (url) =>
  process.env.REACT_APP_IS_API_MOCKED === 'true' ? url.mockURL : url.apiURL;

export { getURL };
