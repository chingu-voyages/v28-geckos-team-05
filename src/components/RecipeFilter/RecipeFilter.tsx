import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  filterIncludedIngredients,
  getNutrientParamsString,
} from '../../utils';
import FilterCard from '../FilterCard/FilterCard';
import './RecipeFilter.scss';

// eslint-disable-next-line
export default function RecipeFilter(props: any) {
  const [filters, setFilters] = useState([{ name: 'minCarbs', value: 0 }]);
  const [ingredientsToInclude, setIngredientsToInclude] = useState('');
  const [ingredientsToExclude, setIngredientsToExclude] = useState('');

  const handleChangeSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) => {
    const newFilters = [...filters];
    // eslint-disable-next-line
    newFilters[i].name = e.target.value.split(' ')[0];
    setFilters(newFilters);
  };

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newFilters = [...filters];
    newFilters[i].value = Number(e.target.value);
    setFilters(newFilters);
  };

  const handleAddNewMask = () => {
    filters.push({ name: 'minCarbs', value: 0 });
    setFilters([...filters]);
  };

  const handleRemoveMask = (i: number) => {
    console.log(i, filters);

    filters.splice(i, 1);
    setFilters([...filters]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIngredientsToInclude(
      filterIncludedIngredients(ingredientsToInclude, ingredientsToExclude)
    );

    props.handleFilter(
      getNutrientParamsString(filters),
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
            {filters.map((filter, i) => (
              <FilterCard
                // eslint-disable-next-line
                key={i}
                index={i}
                name={filter.name}
                value={filter.value}
                handleChangeSelect={handleChangeSelect}
                handleChangeInput={handleChangeInput}
                handleRemoveMask={handleRemoveMask}
              />
            ))}

            <div className="filters__ingredients">
              <h5 className="filters__ingredients--title">
                Ingredients filter
              </h5>
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
              className="button--tertiary"
              onClick={handleAddNewMask}
            >
              Add another filter
            </button>
            <button type="submit" className="button--secondary">
              Apply filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
