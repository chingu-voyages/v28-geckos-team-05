import React, { createContext } from 'react';
import { HomepageContent } from '../typescript/types';

export const HomepageContext = createContext<HomepageContent>({
  searchTerm: '',
  searchEntered: false,
  recipesList: [],
  getSearchData: (e: React.FormEvent<HTMLFormElement>) => {},
  getRandomData: () => {},
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
});
