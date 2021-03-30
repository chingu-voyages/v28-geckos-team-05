import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './BtnRemoveFromCalendar.scss';

import { removeRecipeFromCalendar } from '../../firebase-calendar-utils';
import { BtnRemoveProps } from '../../typescript/types';

export default function BtnRemoveFromCalendar({
  userId,
  recipeId,
  storedDate,
}: BtnRemoveProps) {
  const onRemoveRecipe = () => {
    if (userId) removeRecipeFromCalendar(recipeId, userId, storedDate);
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
