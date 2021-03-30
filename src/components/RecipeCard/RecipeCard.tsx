import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faArrowRight,
  faClock,
  faUsers,
  faThumbsUp,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Recipe, RecipeProps } from '../../typescript/types';
import {
  getUserId,
  removeFromFavorites,
  storeFavorite,
} from '../../firebase-favorites-utils';

import './RecipeCard.scss';

export default function RecipeCard(props: RecipeProps) {
  const { recipe } = props;

  const addToFavorites = (rec: Recipe) => {
    const userId = getUserId();
    !!userId && storeFavorite(rec, userId);
  };

  const handleClickRemove = (recipeId: number) => {
    const userId = getUserId();
    !!userId && removeFromFavorites(userId, String(recipeId));
    // document.location.reload();
  };

  return (
    <div className="recipe">
      <div className="recipe__image-wrapper">
        <img className="recipe__image" src={recipe.image} alt={recipe.title} />
      </div>

      {props.showBinIcon ? (
        <button
          type="button"
          className="recipe__button recipe__button-remove"
          onClick={() => handleClickRemove(recipe.id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      ) : (
        <button
          type="button"
          className="recipe__button recipe__button-wishlist"
          onClick={() => addToFavorites(recipe)}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
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
