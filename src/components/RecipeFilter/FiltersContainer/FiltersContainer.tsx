import React, { useState } from 'react';
import './FiltersContainer.scss';

export default function FiltersContainer() {
  const [ingredientsToInclude, setIngredientsToInclude] = useState([]);
  const [ingredientsToExclude, setIngredientsToExclude] = useState([]);
  const paramLabels: string[] = [
    'Carbs (g)',
    'Protein (g)',
    'Calories',
    'Fat (g)',
    'Alcohol (g)',
    'Copper (mg)',
    'Calcium (mg)',
    'Choline (mg)',
    'Cholesterol (mg)',
    'Fluoride (mg)',
    'SaturatedFat (g)',
    'VitaminA (IU)',
    'VitaminC (mg)',
    'VitaminD (µg)',
    'VitaminE (mg)',
    'VitaminK (µg)',
    'VitaminB1 (mg)',
    'VitaminB2 (mg)',
    'VitaminB3 (mg)',
    'VitaminB5 (mg)',
    'VitaminB6 (mg)',
    'VitaminB12 (µg)',
    'Fiber (g)',
    'Folate (µg)',
    'FolicAcid (µg)',
    'Iodine (µg)',
    'Iron (mg)',
    'Magnesium (mg)',
    'Manganese (mg)',
    'Phosphorus (mg)',
    'Potassium (mg)',
    'Selenium (µg)',
    'Sodium (mg)',
    'Sugar (g)',
    'Zinc (mg)',
  ];
  const [paramNames, setParamNames] = useState([paramLabels[0]]);
  const [paramValues, setParamValues] = useState([0]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(paramNames, paramValues);
  };

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

  return (
    <div className="filters">
      <form id="filtersForm" onSubmit={handleSubmit} className="filters__form">
        <div className="filters__inputs">
          <div className="filters__mask-button-container">
            <div className="filters__mask">
              <div className="filters__mask--close">
                <button type="button">X</button>
              </div>

              <label htmlFor="mask1" className="filters__mask--inputs">
                <select
                  id="mask1"
                  name="mask"
                  className="filter__select"
                  onChange={(e) => handleChangeSelect(e, 0)}
                >
                  {paramLabels.map((nutrient) => (
                    <React.Fragment key={nutrient}>
                      <option
                        id={`min${nutrient}`}
                        key={`min${nutrient}`}
                        value={`min${nutrient}`}
                      >{`mininum ${nutrient}`}</option>
                      <option
                        id={`max${nutrient}`}
                        key={`max${nutrient}`}
                        value={`max${nutrient}`}
                      >{`maximum ${nutrient}`}</option>
                    </React.Fragment>
                  ))}
                </select>
                <input
                  type="text"
                  name="mask1"
                  id="mask1"
                  onChange={(e) => handleChangeInput(e, 0)}
                />
              </label>
            </div>
            <button type="button">Add</button>
          </div>
          <div className="filters__ingredients">
            <input
              className="filters__ingredients--input"
              type="text"
              placeholder="Ingredients to include"
            />
            <input
              className="filters__ingredients--input"
              type="text"
              placeholder="Ingredients to exclude"
            />
          </div>
        </div>
        <button type="submit" className="button--primary">
          Apply filters
        </button>
      </form>
    </div>
  );
}
