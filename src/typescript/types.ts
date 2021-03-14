type URL = {
  apiURL: string;
  mockURL: string;
};

type HomepageContent = {
  searchTerm: string;
  getSearchData: (e: React.FormEvent<HTMLFormElement>) => void;
  getRandomData: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type { URL, HomepageContent };
