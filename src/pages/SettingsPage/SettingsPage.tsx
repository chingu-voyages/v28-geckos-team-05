import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SettingsPage.scss';

export default function SettingsPage() {
  const intoleranceStrings = [
    'Diary',
    'Egg',
    'Gluten',
    'Grain',
    'Peanut',
    'Seafood',
    'Sesame',
    'Shellfish',
    'Soy',
    'Sulfite',
    'Tree nut',
    'Wheat',
  ];
  const dietStrings = [
    'No diet',
    'Gluten free',
    'Ketogenic',
    'Vegetarian',
    'Lacto vegetarian',
    'Ovo vegetarian',
    'Vegan',
    'Pescetarian',
    'Paleo',
    'Primal',
    'Whole 30',
  ];
  const [intolerances, setIntolerances] = useState(
    intoleranceStrings.map((s) => ({ name: s, selected: false }))
  );
  const [diet, setDiet] = useState('');

  const handleChangeDiet = async (newDiet: string) => {
    console.log('Change diet to ', newDiet);
    setDiet(newDiet);
    // change on DB
  };

  const handleCheckboxClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIntolerances(
      intolerances.map((intoleranceObj) =>
        intoleranceObj.name === e.target.id
          ? { name: e.target.id, selected: e.target.checked }
          : intoleranceObj
      )
    );
  };

  return (
    <div className="page">
      <h1 className="page__title">User settings</h1>

      <h2 className="page__h2">Your Diet</h2>
      <p className="page__paragraph">
        Select a diet below by which to filter all your recipe search results
      </p>
      <div className="select-input">
        <label htmlFor="diet-select">
          <select
            id="diet-select"
            name="diet-select"
            value={diet}
            onChange={(e) => handleChangeDiet(e.target.value)}
          >
            {dietStrings.map((dietName) => (
              <>
                <option>{dietName}</option>
              </>
            ))}
          </select>
        </label>
      </div>

      <h2 className="page__h2">Your Intolerances</h2>
      <p className="page__paragraph">
        Select any number of food intolerances so we can filter out your search
        results appropriately (please see{' '}
        <Link to="/about">
          <strong>disclaimer</strong>
        </Link>
        )
      </p>
      <div className="checkbox__container">
        {intolerances.map((intoleranceObj) => (
          <div key={intoleranceObj.name} className="checkbox__item">
            <label htmlFor={intoleranceObj.name}>
              <input
                type="checkbox"
                name="intolerances"
                id={intoleranceObj.name}
                onChange={(e) => handleCheckboxClick(e)}
              />
              {intoleranceObj.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
