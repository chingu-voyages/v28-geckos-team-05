type URL = {
  apiURL: string;
  mockURL: string;
};

type HomepageContent = {
  searchTerm: string;
  searchEntered: boolean;
  recipesList: Recipe[];
  getSearchData: (e: React.FormEvent<HTMLFormElement>) => void;
  getRandomData: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type Recipe = {
  id: number;
  image: string;
  readyInMinutes: number;
  servings: number;
  title: string;
  aggregateLikes: string;
};

type RecipeProps = {
  recipe: Recipe;
};

export type { URL, HomepageContent, Recipe, RecipeProps };
