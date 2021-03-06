import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserSettings } from '../../typescript/types';
import { getUserId } from '../../firebase/firebase';
import { storeSettings, loadUserSettings } from '../../firebase/settings';
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

  type IntoleranceObj = {
    name: string;
    selected: boolean;
  };

  const userId = getUserId();

  const [intolerances, setIntolerances] = useState<IntoleranceObj[]>(
    intoleranceStrings.map((s) => ({ name: s, selected: false }))
  );
  const [diet, setDiet] = useState('');

  const getIntoleranceString = (intoleranceObjArray: IntoleranceObj[]) =>
    intoleranceObjArray
      .filter((intObj) => intObj.selected)
      .map((intObj) => encodeURI(intObj.name.toLowerCase()))
      .join(',');

  const handleChangeDiet = async (newDiet: string) => {
    setDiet(newDiet);

    // change on DB
    !!userId &&
      storeSettings(
        encodeURI(newDiet.toLowerCase()),
        getIntoleranceString(intolerances),
        userId
      );
  };

  const handleCheckboxClick = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newIntolerances = intolerances.map((intoleranceObj) =>
      intoleranceObj.name === e.target.id
        ? { name: e.target.id, selected: e.target.checked }
        : intoleranceObj
    );

    setIntolerances(newIntolerances);

    // change on DB
    !!userId &&
      storeSettings(diet, getIntoleranceString(newIntolerances), userId);
  };

  const populateLocalUserSettings = (settings: UserSettings) => {
    // populate diet
    dietStrings.forEach((dietString) => {
      if (encodeURI(dietString.toLowerCase()) === settings.userDiet) {
        setDiet(dietString);
      }
    });

    // populate intolerances
    const intoleranceArr = settings.userIntolerances.split(',');
    let newIntolerances = [...intolerances];

    intoleranceStrings.forEach((intoleranceString) => {
      intoleranceArr.forEach((intolerance) => {
        if (encodeURI(intoleranceString.toLowerCase()) === intolerance) {
          // set corresponding checkbox to true
          newIntolerances = newIntolerances.map((intoleranceObj) =>
            intoleranceObj.name === intoleranceString
              ? { name: intoleranceString, selected: true }
              : intoleranceObj
          );
        }
      });
    });

    setIntolerances(newIntolerances);
  };

  useEffect(() => {
    const loadSettings = async () => {
      const result = !!userId && (await loadUserSettings(userId));
      return result;
    };

    !!userId &&
      loadSettings().then((res) => {
        res && populateLocalUserSettings(res);
      });
    // eslint-disable-next-line
  }, [userId]);

  return (
    <div className="page">
      <div className="page__content-wrapper">
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
                <option key={dietName}>{dietName}</option>
              ))}
            </select>
          </label>
        </div>

        <h2 className="page__h2">Your Intolerances</h2>
        <p className="page__paragraph">
          Select any number of food intolerances so we can filter out your
          search results appropriately (please see{' '}
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
                  checked={intoleranceObj.selected}
                />
                <span className="checkbox__label">{intoleranceObj.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
