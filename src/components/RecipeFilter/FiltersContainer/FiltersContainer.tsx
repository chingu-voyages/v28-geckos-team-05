import React from 'react';
import './FiltersContainer.scss';

export default function FiltersContainer() {
  const paramNames: string[] = [
    'Carbs',
    'Protein',
    'Calories',
    'Fat',
    'Alcohol',
    'Caffeine',
    'Copper',
    'Calcium',
    'Choline',
    'Cholesterol',
    'Fluoride',
    'SaturatedFat',
    'VitaminA',
    'VitaminC',
    'VitaminD',
    'VitaminE',
    'VitaminK',
    'VitaminB1',
    'VitaminB2',
    'VitaminB3',
    'VitaminB5',
    'VitaminB6',
    'VitaminB12',
    'Fiber',
    'Folate',
    'FolicAcid',
    'Iodine',
    'Iron',
    'Magnesium',
    'Manganese',
    'Phosphorus',
    'Potassium',
    'Selenium',
    'Sodium',
    'Sugar',
    'Zinc',
  ];

  return (
    <div className="filters">
      <div className="filters__container">
        <div className="filters__mask">
          <button type="button" className="filters__mask--close">
            X
          </button>
          <label htmlFor="mask1" className="filters__mask--inputs">
            <select id="mask1" name="mask">
              {paramNames.map((nutrient) => (
                <>
                  <option value={`min${nutrient}`}>{`min${nutrient}`}</option>
                  <option value={`max${nutrient}`}>{`max${nutrient}`}</option>
                </>
              ))}
            </select>
            <input type="text" name="mask1" id="mask1" />
          </label>
        </div>
      </div>
    </div>
  );
}
