import React from 'react';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FilterCard.scss';

interface FilterCardProps {
  index: number;
  value: number;
  filters: {
    name: string;
    value: number;
    key: string;
  }[];
  handleChangeSelect: (
    e: React.ChangeEvent<HTMLSelectElement>,
    i: number
  ) => void;
  handleChangeInput: (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => void;
  handleRemoveMask: (i: number) => void;
}

export default function FilterCard(props: FilterCardProps) {
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

  const filters = [...props.filters];
  filters.splice(props.index, 1);
  const filterNames = filters.map((filter) => filter.name);

  return (
    <div className="filters__container">
      <div className="filters__mask">
        <div className="filters__mask--close">
          <button
            type="button"
            onClick={() => props.handleRemoveMask(props.index)}
            title="Remove this filter"
            className="filters__mask--close-button"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>

        <label htmlFor={`mask${props.index}`} className="filters__mask--inputs">
          <select
            id={`mask${props.index}`}
            name={`mask${props.index}`}
            className="filters__mask--select"
            onChange={(e) => props.handleChangeSelect(e, props.index)}
          >
            {paramLabels.map((nutrient) => (
              <React.Fragment key={nutrient}>
                <option
                  id={`min${nutrient}`}
                  key={`min${nutrient}`}
                  value={`min${nutrient}`}
                  disabled={filterNames.includes(
                    `min${nutrient}`.split(' ')[0]
                  )}
                >{`min ${nutrient}`}</option>
                <option
                  id={`max${nutrient}`}
                  key={`max${nutrient}`}
                  value={`max${nutrient}`}
                  disabled={filterNames.includes(
                    `max${nutrient}`.split(' ')[0]
                  )}
                >{`max ${nutrient}`}</option>
              </React.Fragment>
            ))}
          </select>
          <input
            className="filters__ingredients--input"
            type="text"
            name={`mask${props.index}`}
            id={`mask${props.index}`}
            onChange={(e) => props.handleChangeInput(e, props.index)}
            placeholder="Enter amount"
            pattern="[0-9]{1,5}"
            title="Number up to five digits"
            defaultValue={props.value}
            required
          />
        </label>
      </div>
    </div>
  );
}
