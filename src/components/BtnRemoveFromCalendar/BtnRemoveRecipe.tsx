import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './BtnRemoveRecipe.scss';

import { removeRecipeFromCalendar } from '../../firebase-calendar-utils';
import { removeFromFavorites } from '../../firebase-favorites-utils';
import { BtnRemoveProps } from '../../typescript/types';

export default function BtnRemoveRecipe({
  userId,
  recipeId,
  storedDate,
}: BtnRemoveProps) {
  const onRemoveRecipe = () => {
    if (userId) {
      !!storedDate && removeRecipeFromCalendar(recipeId, userId, storedDate);
      !storedDate && removeFromFavorites(userId, String(recipeId));
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
