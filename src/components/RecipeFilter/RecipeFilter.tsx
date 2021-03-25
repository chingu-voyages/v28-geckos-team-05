import React, { useState } from 'react';
import { filterIncludedIngredients } from '../../utils';
import FilterCard from '../FilterCard/FilterCard';
import './RecipeFilter.scss';

// eslint-disable-next-line
export default function RecipeFilter(props: any) {
  const [ingredientsToInclude, setIngredientsToInclude] = useState('');
  const [ingredientsToExclude, setIngredientsToExclude] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIngredientsToInclude(
      filterIncludedIngredients(ingredientsToInclude, ingredientsToExclude)
    );

    props.handleFilter(
      'nutrientParams',
      filterIncludedIngredients(ingredientsToInclude, ingredientsToExclude),
      ingredientsToExclude
    );
  };

  return (
    <div className="recipefilter">
      <h3 className="recipefilter__header">
        Filter search results based on nutrients and ingredients
      </h3>
      <div className="filters">
        <form
          id="filtersForm"
          onSubmit={handleSubmit}
          className="filters__form"
        >
          <div className="filters__inputs">
            <FilterCard />

            <div className="filters__ingredients">
              <input
                className="filters__ingredients--input"
                type="text"
                placeholder="Ingredients to include"
                value={ingredientsToInclude}
                onChange={(e) => setIngredientsToInclude(e.target.value)}
                pattern="[\w\s]+(,[\w\s]+)*"
                title="Comma-separated list of ingredients (no trailing comma)"
              />
              <input
                className="filters__ingredients--input"
                type="text"
                placeholder="Ingredients to exclude"
                value={ingredientsToExclude}
                onChange={(e) => setIngredientsToExclude(e.target.value)}
                pattern="[\w\s]+(,[\w\s]+)*"
                title="Comma-separated list of ingredients (no trailing comma)"
              />
            </div>
          </div>
          <button type="submit" className="button--primary">
            Apply filters
          </button>
        </form>
      </div>
    </div>
  );
}
