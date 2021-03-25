import React, { useState } from 'react';
import { filterIncludedIngredients } from '../../utils';
import FilterCard from '../FilterCard/FilterCard';
import './RecipeFilter.scss';

// eslint-disable-next-line
export default function RecipeFilter(props: any) {
  const [paramNames, setParamNames] = useState(['minCarbs']);
  const [paramValues, setParamValues] = useState([0]);
  const [ingredientsToInclude, setIngredientsToInclude] = useState('');
  const [ingredientsToExclude, setIngredientsToExclude] = useState('');

  const handleChangeSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) => {
    const newParams = paramNames;

    // eslint-disable-next-line
    newParams[i] = e.target.value.split(' ')[0];
    setParamNames(newParams);
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newParams = paramValues;

    newParams[i] = Number(e.target.value);
    setParamValues(newParams);
  };

  const handleAddNewMask = () => {
    console.log('add new mask');
  };

  const handleRemoveMask = (i: number) => {
    console.log('remove mask');
  };

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
            <FilterCard
              handleChangeSelect={handleChangeSelect}
              handleChangeInput={handleChangeInput}
              handleRemoveMask={handleRemoveMask}
            />

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
          <div className="filters__buttons">
            <button
              type="button"
              className="button--secondary"
              onClick={props.handleAddNewMask}
            >
              Add another filter
            </button>
            <button type="submit" className="button--primary">
              Apply filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
