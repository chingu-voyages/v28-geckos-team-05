import React from 'react';

export default function AboutPage() {
  return (
    <div className="page">
      <h2>About Meal Planner</h2>
      <p>
        Developed by <a href="https://github.com/JakubKepak">@JakubKepak</a>,{' '}
        <a href="https://github.com/davide-ravasi">@davide-ravasi</a> and{' '}
        <a href="https://github.com/theborgh">@theborgh</a>
      </p>
      <h2>Disclaimer</h2>
      <p>
        Ingredient prices are estimates. All recipe information including
        nutrient, ingredient, and calorie breakdowns are provided "as is" and
        are not guaranteed to be accurate. If you suffer from food allergies or
        intolerances, please make sure to double-check the ingredients list on
        the package you purchased and do not rely solely on our data.
      </p>
    </div>
  );
}
