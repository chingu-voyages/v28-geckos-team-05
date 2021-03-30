import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faArrowRight,
  faClock,
  faUsers,
  faThumbsUp,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { getUserId } from '../../firebase';
import { convertDateToString } from '../../utils';
import {
  stockCalendarData,
  removeRecipeFromCalendar,
} from '../../firebase-calendar-utils';
import { RecipeProps } from '../../typescript/types';

import './RecipeCard.scss';

import DatePickerCalendar from '../DatePicker/DatePicker';

export default function RecipeCard(props: RecipeProps) {
  const { recipe } = props;
  const [userId, setUserId] = useState<string | null>(null);
  const [storedDate, setStoredDate] = useState<string>('');
  const [activeDate, setActiveDate] = useState<string>('');
  const [activeNotification, setActiveNotification] = useState(false);
  const location = useLocation();

  const onChangeDate = async (date: Date | [Date, Date] | null) => {
    if (userId) {
      const stocked = await stockCalendarData(date, recipe, userId);

      if (stocked) {
        setActiveNotification(true);
        setActiveDate(convertDateToString(date));

        setTimeout(() => {
          setActiveNotification(false);
        }, 2000);
      }
    }
  };

  const onRemoveRecipe = () => {
    if (userId) removeRecipeFromCalendar(recipe.id, userId, storedDate);
  };

  useEffect(() => {
    setUserId(getUserId());

    if (props.storedDate) {
      setStoredDate(props.storedDate);
    }
  }, [props.storedDate, setStoredDate]);

  return (
    <div className="recipe">
      {activeNotification && (
        <div className="calendar__notification">
          Recipe added to calendar <br /> on Date <strong>{activeDate}</strong>
        </div>
      )}
      <div className="recipe__image-wrapper">
        <img className="recipe__image" src={recipe.image} alt={recipe.title} />
      </div>
      <button type="button" className="recipe__button-wishlist">
        <FontAwesomeIcon icon={faHeart} />
      </button>
      {location.pathname === '/calendar' && (
        <button
          type="button"
          className="recipe__button-remove"
          onClick={onRemoveRecipe}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}

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
