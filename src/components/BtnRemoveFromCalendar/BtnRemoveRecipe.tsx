import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './BtnRemoveRecipe.scss';

import { removeRecipeFromCalendar } from '../../firebase/calendar';
import { removeFromFavorites } from '../../firebase/favorites';
import { BtnRemoveProps } from '../../typescript/types';

export default function BtnRemoveRecipe({
  userId,
  recipeId,
  recipePricePerServing,
  storedDate,
  handleRemove,
}: BtnRemoveProps) {
  const onRemoveRecipe = () => {
    if (userId) {
      !!storedDate && removeRecipeFromCalendar(recipeId, userId, recipePricePerServing, storedDate);
      !storedDate &&
        handleRemove &&
        removeFromFavorites(userId, String(recipeId)) &&
        handleRemove(recipeId);
    }
  };

  return (
    <button
      type="button"
      className="recipe__button-remove"
      onClick={onRemoveRecipe}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
}
