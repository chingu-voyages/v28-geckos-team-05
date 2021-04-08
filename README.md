# Meal Planner 

Meal planner is a single-page app that helps users find healthy recipes and plan your meals while keeping track of shopping costs and daily calorie intake.

Stack: React, Typescript, Sass, Firestore

## Setup instructions

Clone the repository to your local machine:

`git clone https://github.com/chingu-voyages/v28-geckos-team-05.git`

Install the dependencies locally:

`cd v28-geckos-team-05/ && npm i`

Create an .env file (see .env.sample). The `REACT_APP_MOCK_API` variable determines whether the api calls are being mocked locally. If the variable is not set to true, `REACT_APP_API_KEYS` will need to be set to a list of comma-separated Spoonacular Api keys (you will need to create an account at https://spoonacular.com/food-api)

You will also need to create a Firestore database and set the related environment variables accordingly.

## Running the app

If `REACT_APP_MOCK_API` is set to true, then run the command `npm run start-server` to start the mock server and then `npm start` to start the app. If the api is not being mocked, you can simply run the `npm start` command.

## Deployments

* https://yourmealplan.netlify.app/ - production build of main branch
* https://yourmealplandev.netlify.app/  - production build of the develop branch
* https://yourmealplan.herokuapp.com/ - development build of the develop branch

## Contributing

Meal Planner was developed by [@davide-ravasi](https://github.com/davide-ravasi), [@JakubKepak](https://github.com/JakubKepak) and [@theborgh](https://github.com/theborgh).

If you like the app, feel free to fork this repository or open a pull request