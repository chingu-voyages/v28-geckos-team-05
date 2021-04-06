type URL = {
  apiURL: string;
  mockURL: string;
};

type UserSettings = {
  userDiet: string;
  userIntolerances: string;
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
  storedDate?: string;
  handleRemove?: (recipeId: number) => void;
};

type DatePickerProps = {
  onChangeDate: (date: Date | [Date, Date] | null) => void;
};

type CalendarCustomInputProps = {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type CalendarDay = {
  dateString: string;
  timeStamp: Date;
  recipes: string[];
};

type CalendarDayListProps = {
  date: string;
  recipeList: string[];
};

type BtnRemoveProps = {
  userId: string;
  recipeId: number;
  storedDate?: string;
  handleRemove?: (recipeId: number) => void;
};

export type {
  URL,
  HomepageContent,
  Recipe,
  RecipeProps,
  DatePickerProps,
  CalendarCustomInputProps,
  CalendarDay,
  CalendarDayListProps,
  BtnRemoveProps,
  UserSettings,
};
