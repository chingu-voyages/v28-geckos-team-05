import React from 'react';
import FiltersContainer from './FiltersContainer/FiltersContainer';
import './RecipeFilter.scss';

export default function RecipeFilter() {
  return (
    <div className="recipefilter">
      <h2 className="recipefilter__header">Find recipes based on nutrients</h2>
      <FiltersContainer />
    </div>
  );
}
