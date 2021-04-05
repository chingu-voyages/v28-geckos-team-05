import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from './firebase';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import NotFound from './components/NotFound/NotFound';
import RecipeDetail from './pages/RecipeDetail/RecipeDetail';
import './App.scss';

// mockData
import { recipeDetail } from './mock/recipeDetail';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  auth.onAuthStateChanged((user) => {
    user ? setUserLoggedIn(true) : setUserLoggedIn(false);
  });

  return (
    <div className="app">
      <Router>
        <Header userLoggedIn={userLoggedIn} />
        <Switch>
          <Route
            path="/"
            exact
            render={() => <HomePage userLoggedIn={userLoggedIn} />}
          />
          <Route path="/about" exact component={AboutPage} />
          <Route
            path="/calendar"
            exact
            render={() => <CalendarPage userLoggedIn={userLoggedIn} />}
          />
          <Route path="/favorites" exact component={FavoritesPage} />
          <Route
            path="/recipe/:id"
            render={() => <RecipeDetail recipeList={recipeDetail} />}
          />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
