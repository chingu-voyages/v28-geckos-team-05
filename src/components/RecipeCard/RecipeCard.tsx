import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faArrowRight,
  faClock,
  faUsers,
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';

import { getUserId } from '../../firebase';
import { convertDateToString } from '../../utils';
import { stockCalendarData } from '../../firebase-calendar-utils';
import { RecipeProps } from '../../typescript/types';

import './RecipeCard.scss';

import BtnRemoveFromCalendar from '../BtnRemoveFromCalendar/BtnRemoveFromCalendar';
import AddCalendarNotification from '../AddCalendarNotification/AddCalendarNotification';
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

  useEffect(() => {
    setUserId(getUserId());

    if (props.storedDate) {
      setStoredDate(props.storedDate);
    }
  }, [props.storedDate, setStoredDate]);

  return (
    <div className="recipe">
      {activeNotification && (
        <AddCalendarNotification activeDate={activeDate} />
      )}
      <div className="recipe__image-wrapper">
        <img className="recipe__image" src={recipe.image} alt={recipe.title} />
      </div>

      <button type="button" className="recipe__button-wishlist">
        <FontAwesomeIcon icon={faHeart} />
      </button>

      {location.pathname === '/calendar' && userId && (
        <BtnRemoveFromCalendar
          recipeId={recipe.id}
          userId={userId}
          storedDate={storedDate}
        />
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
          to={{
            pathname: `/recipe/${recipe.id}`,
            state: recipe,
          }}
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
