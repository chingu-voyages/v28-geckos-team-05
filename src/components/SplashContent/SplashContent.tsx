import React from 'react';
import './SplashContent.scss';

export default function SplashContent() {
  return (
    <div className="splash">
      <p className="splash__paragraph">
        <strong>Meal planner</strong> helps you create a healthy eating habit no
        matter your constraints - be it your budget, food allergies, or
        monotony.
      </p>
      <div className="splash__maincontent">
        <div className="splash__item">
          <div className="splash__paragraph">
            <strong>Find</strong> healthy recipes that fit your budget and
            dietary needs
          </div>
          <img
            className="splash__image"
            src={`${process.env.PUBLIC_URL}/images/splash1.jpg`}
            alt="Find healthy recipes that fit your budget and dietary needs"
          />
        </div>
        <div className="splash__item">
          <img
            className="splash__image"
            src={`${process.env.PUBLIC_URL}/images/splash2.jpg`}
            alt="Track your daily calorie and macronutrient intake"
          />
          <div className="splash__paragraph">
            <strong>Track</strong> your daily calorie and macronutrient intake
          </div>
        </div>
        <div className="splash__item">
          {' '}
          <div className="splash__paragraph">
            <strong>Generate</strong> your shopping list automatically
          </div>
          <img
            className="splash__image"
            src={`${process.env.PUBLIC_URL}/images/splash3.jpg`}
            alt="Automatically generate your shopping list"
          />
        </div>
        <div className="splash__item">
          {' '}
          <img
            className="splash__image"
            src={`${process.env.PUBLIC_URL}/images/splash4.jpg`}
            alt="Learn new recipes step by step"
          />
          <div className="splash__paragraph">
            <strong>Learn</strong> new recipes step by step
          </div>
        </div>
      </div>
      <div className="splash__cta">
        <button type="button" className="button--primary">
          Sign up
        </button>
      </div>
    </div>
  );
}
