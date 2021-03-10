import React, { createContext } from 'react';

interface HomepageContent {
  searchTerm: string;
  getSearchData: (e: React.FormEvent<HTMLFormElement>) => void;
  getRandomData: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const HomepageContext = createContext<HomepageContent>({
  searchTerm: '',
  getSearchData: (e: React.FormEvent<HTMLFormElement>) => {},
  getRandomData: () => {},
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {}
});
