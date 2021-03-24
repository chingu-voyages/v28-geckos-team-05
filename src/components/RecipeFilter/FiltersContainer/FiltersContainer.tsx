import React, { FormEvent } from 'react';
import './FiltersContainer.scss';

export default function FiltersContainer() {
  const paramNames: string[] = [
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.dir(e.target);
  };

  return (
    <div className="filters">
      <div className="filters__container">
        <form id="filtersForm" onSubmit={handleSubmit}>
          <div className="filters__mask-button-container">
            <div className="filters__mask">
              <div className="filters__mask--close">
                <button type="button">X</button>
              </div>

              <label htmlFor="mask1" className="filters__mask--inputs">
                <select id="mask1" name="mask" className="filter__select">
                  {paramNames.map((nutrient) => (
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
                <input type="text" name="mask1" id="mask1" />
              </label>
            </div>
            <button type="button">Add</button>
          </div>
          <button type="submit" className="button--primary">
            Apply filters
          </button>
        </form>
      </div>
    </div>
  );
}
