import React from 'react';
import './FilterCard.scss';

// eslint-disable-next-line
export default function FilterCard(props: any) {
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

  return (
    <div className="filters__mask-button-container">
      <div className="filters__mask">
        <div className="filters__mask--close">
          <button
            type="button"
            onClick={() => props.handleRemoveMask(props.index)}
          >
            X
          </button>
        </div>

        <label htmlFor={`mask${props.index}`} className="filters__mask--inputs">
          <select
            id={`mask${props.index}`}
            name={`mask${props.index}`}
            className="filter__select"
            onChange={(e) => props.handleChangeSelect(e, props.index)}
          >
            {paramLabels.map((nutrient) => (
              <React.Fragment key={nutrient}>
                <option
                  id={`min${nutrient}`}
                  key={`min${nutrient}`}
                  value={`min${nutrient}`}
                >{`min ${nutrient}`}</option>
                <option
                  id={`max${nutrient}`}
                  key={`max${nutrient}`}
                  value={`max${nutrient}`}
                >{`max ${nutrient}`}</option>
              </React.Fragment>
            ))}
          </select>
          <input
            type="text"
            name={`mask${props.index}`}
            id={`mask${props.index}`}
            onChange={(e) => props.handleChangeInput(e, props.index)}
            pattern="[0-9]{1,5}"
            title="Number up to five digits"
            required
          />
        </label>
      </div>
    </div>
  );
}
