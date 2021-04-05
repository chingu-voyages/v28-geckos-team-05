import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SettingsPage() {
  const intoleranceStrings = [
    'diary',
    'egg',
    'gluten',
    'grain',
    'peanut',
    'seafood',
    'sesame',
    'shellfish',
    'soy',
    'sulfite',
    'tree nut',
    'wheat',
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
  const [diets, setDiets] = useState(
    dietStrings.map((s) => ({ name: s, selected: false }))
  );

  return (
    <div className="page">
      <h1 className="page__title">User settings</h1>

      <h2 className="page__h2">Your Diet</h2>
      <p className="page__paragraph">
        Select a page below by which to filter all your recipe search results
      </p>
      <h2 className="page__h2">Your Intolerances</h2>
      <p className="page__paragraph">
        Select any number of food intolerances so we can filter out your search
        results appropriately (please see{' '}
        <Link to="/about">
          <strong>disclaimer</strong>
        </Link>
        )
      </p>
    </div>
  );
}
