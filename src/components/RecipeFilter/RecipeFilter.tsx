import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getNutrientParamsString } from '../../utils';
import FilterCard from '../FilterCard/FilterCard';
import Tag from '../Tag/Tag';
import './RecipeFilter.scss';

interface RecipeFilterProps {
  handleFilter: (
    nutritionFilters: string,
    ingredientsToInclude: string,
    ingredientsToExclude: string
  ) => Promise<void>;
}

export default function RecipeFilter(props: RecipeFilterProps) {
  const [filters, setFilters] = useState([
    { name: 'minCarbs', value: 0, key: uuidv4() },
  ]);
  const [ingredientsToInclude, setIngredientsToInclude] = useState('');
  const [ingredientsToExclude, setIngredientsToExclude] = useState('');
  const [includedIngredientsTags, setIncludedIngredientsTags] = useState<
    string[]
  >([]);
  const [excludedIngredientsTags, setExcludedIngredientsTags] = useState<
    string[]
  >([]);

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
    filters.push({ name: 'minCarbs', value: 0, key: uuidv4() });
    setFilters([...filters]);
  };

  const handleRemoveMask = (i: number) => {
    setFilters(filters.filter((el, idx) => i !== idx));
  };

  const isIngredientValid: (
    ingredient: string,
    filterArray1: string[],
    filterArray2: string[]
  ) => boolean = (ingredient, filterArray1, filterArray2) =>
    !!ingredient &&
    !filterArray1.includes(ingredient) &&
    !filterArray2.includes(ingredient);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      isIngredientValid(
        ingredientsToInclude,
        includedIngredientsTags,
        excludedIngredientsTags
      )
    ) {
      includedIngredientsTags.push(ingredientsToInclude);
    }

    if (
      isIngredientValid(
        ingredientsToExclude,
        includedIngredientsTags,
        excludedIngredientsTags
      )
    ) {
      excludedIngredientsTags.push(ingredientsToExclude);
    }

    setIngredientsToInclude('');
    setIngredientsToExclude('');

    props.handleFilter(
      getNutrientParamsString(filters),
      includedIngredientsTags.join(','),
      excludedIngredientsTags.join(',')
    );
  };

  const handleChangeIngredients = (
    e: React.ChangeEvent<HTMLInputElement>,
    changeInIncluded: boolean
  ) => {
    if (changeInIncluded) {
      setIngredientsToInclude(e.target.value);

      if (e.target.value[e.target.value.length - 1] === ',') {
        const newIngredient = e.target.value.slice(0, -1);
        setIngredientsToInclude('');

        if (
          isIngredientValid(
            newIngredient,
            includedIngredientsTags,
            excludedIngredientsTags
          )
        ) {
          setIncludedIngredientsTags([
            ...includedIngredientsTags,
            newIngredient,
          ]);
        }
      }
    } else {
      setIngredientsToExclude(e.target.value);

      if (e.target.value[e.target.value.length - 1] === ',') {
        const newIngredient = e.target.value.slice(0, -1);
        setIngredientsToExclude('');

        if (
          isIngredientValid(
            newIngredient,
            includedIngredientsTags,
            excludedIngredientsTags
          )
        ) {
          setExcludedIngredientsTags([
            ...excludedIngredientsTags,
            newIngredient,
          ]);
        }
      }
    }
  };

  const handleCloseTag: (key: string, deleteFromIncluded: boolean) => void = (
    key,
    deleteFromIncluded
  ) => {
    deleteFromIncluded
      ? setIncludedIngredientsTags(
          includedIngredientsTags.filter((ingredient) => ingredient !== key)
        )
      : setExcludedIngredientsTags(
          excludedIngredientsTags.filter((ingredient) => ingredient !== key)
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
                key={filter.key}
                index={i}
                value={filter.value}
                filters={filters}
                handleChangeSelect={handleChangeSelect}
                handleChangeInput={handleChangeInput}
                handleRemoveMask={handleRemoveMask}
              />
            ))}

            <div className="filters__ingredients">
              <h5 className="filters__ingredients--title">
                Ingredients filter
              </h5>
              {!!includedIngredientsTags.length && (
                <>
                  <h6>Include:</h6>
                  <div className="filters__ingredients--taglist">
                    {includedIngredientsTags.map((ingredient) => (
                      <Tag
                        key={ingredient}
                        text={ingredient}
                        isIncludedTag={true}
                        handleClick={handleCloseTag}
                      />
                    ))}
                  </div>
                </>
              )}
              <input
                className="filters__ingredients--input"
                type="text"
                placeholder="Enter ingredients to include"
                value={ingredientsToInclude}
                onChange={(e) => handleChangeIngredients(e, true)}
                pattern="[\w\s]+(,[\w\s]+)*"
                title="Comma-separated list of ingredients"
              />

              {!!excludedIngredientsTags.length && (
                <>
                  <h6>Exclude:</h6>
                  <div className="filters__ingredients--taglist">
                    {excludedIngredientsTags.map((ingredient) => (
                      <Tag
                        key={ingredient}
                        text={ingredient}
                        isIncludedTag={false}
                        handleClick={handleCloseTag}
                      />
                    ))}
                  </div>
                </>
              )}
              <input
                className="filters__ingredients--input"
                type="text"
                placeholder="Enter ingredients to exclude"
                value={ingredientsToExclude}
                onChange={(e) => handleChangeIngredients(e, false)}
                pattern="[\w\s]+(,[\w\s]+)*"
                title="Comma-separated list of ingredients"
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
