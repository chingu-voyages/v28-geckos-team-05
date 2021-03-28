import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faArrowRight,
  faClock,
  faUsers,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import { getUserId, stockCalendarData } from '../../firebase-calendar-utils';
import { RecipeProps } from '../../typescript/types';

import './RecipeCard.scss';

import DatePickerCalendar from '../DatePicker/DatePicker';

export default function RecipeCard(props: RecipeProps) {
  const { recipe } = props;
  const [userId, setUserId] = useState<string | null>(null);

  const onChangeDate = (date: Date | [Date, Date] | null) => {
    if (userId) stockCalendarData(date, recipe, userId);
  };

  useEffect(() => {
    setUserId(getUserId());
  }, []);

  return (
    <div className="recipe">
      <div className="recipe__image-wrapper">
        <img className="recipe__image" src={recipe.image} alt={recipe.title} />
      </div>
      <button type="button" className="recipe__button-wishlist">
        <FontAwesomeIcon icon={faHeart} />
      </button>

      {userId && (
        <div className="datePicker">
          <DatePickerCalendar onChangeDate={onChangeDate} />
        </div>
      )}

      <article className="recipe__content">
        <Link
          className="recipe__button-details"
          title="Detail of the recipe"
          to={`recipe-detail/${recipe.id}`}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
        <h2 className="recipe__title">{recipe.title}</h2>
        <p className="recipe__text" />
      </article>
      <aside className="recipe__infos">
        <span>
          <FontAwesomeIcon icon={faClock} />
          <span>{recipe.readyInMinutes}</span>
        </span>
        <span>
          <FontAwesomeIcon icon={faUsers} />
          <span>{recipe.servings}</span>
        </span>
        <span>
          <FontAwesomeIcon icon={faThumbsUp} />
          <span>{recipe.aggregateLikes}</span>
        </span>
      </aside>
    </div>
  );
}
