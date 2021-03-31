/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import './RecipeDetail.scss';

export default function RecipeDetail(props: any) {
  const { id } = useParams<Record<string, string | undefined>>();
  const location = useLocation();
  const recipe: any = location.state;

  console.log(recipe);

  return (
    <div className="recipe-detail">
      <div className="recipe-detail__title">{recipe.title}</div>
      <div className="recipe-detail__header-container">
        <img
          className="recipe-detail__header-container__image"
          src={recipe.image}
          alt={recipe.title}
        />
        <div className="recipe-detail__header-container__info">
          <span>$ {recipe.pricePerServing} per serving</span>
          <span className="recipe-detail__dot" />
          <span>{recipe.readyInMinutes} minutes</span>
        </div>
      </div>
      <div className="recipe-detail__section-container">
        <div className="recipe-detail__section-title">ingredients</div>
        <div className="recipe-detail__ingredients-content-container">
          {recipe.extendedIngredients.map((ingredient: any) => (
            <div className="recipe-detail__ingredient" key="">
              <span>{ingredient.measures.us.amount}</span>
              <span>{ingredient.measures.us.unitShort}</span>
              <span>{ingredient.nameClean}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="recipe-detail__section-container">
        <div className="recipe-detail__section-title">instructions</div>
        <div className="recipe-detail__instructions-content-container">
          {recipe.analyzedInstructions[0].steps.map((step: any) => (
            <div className="recipe-detail__instruction-step" key={step.number}>
              <label className="recipe-detail__checkbox">
                <input
                  className="recipe-detail__checkbox__input"
                  type="checkbox"
                  defaultChecked={false}
                />
                <span className="recipe-detail__checkbox__checkmark" />
              </label>
              <span>{step.step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
