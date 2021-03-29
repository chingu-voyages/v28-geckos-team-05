import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { Recipe } from '../../typescript/types';
import RecipeCard from '../RecipeCard/RecipeCard';

type CalProps = {
  date: string;
  recipeList: string[];
};

export default function CalendarDayList(props: CalProps) {
  const { recipeList, date } = props;
  const [recipeDayList, setRecipeDayList] = useState<Recipe[]>([]);

  useEffect(() => {
    const recipes: Recipe[] = [];

    const getRecipeDayList = async () => {
      const recipeRef = db.collection('recipes').where("id", "in", recipeList);
      const recipeSnapshot = await recipeRef.get();

      recipeSnapshot.forEach(doc => {
        const recipeData = doc.data() as Recipe;
        recipes.push(recipeData);
      })

      setRecipeDayList(recipes);
    };
    getRecipeDayList();
  }, [recipeList, setRecipeDayList]);

  return (
    <div className="items">
      {recipeDayList &&
        recipeDayList.map((recipe) => (
          <RecipeCard key={`${recipe.id}-${date}`} recipe={recipe} />
        ))}
    </div>
  );
}
