import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { auth } from './firebase';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import './App.scss';

const App = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

  auth.onAuthStateChanged((user) => {
    user ? setUserLoggedIn(true) : setUserLoggedIn(false);
  });

  return (
    <div className="app">
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/calendar" exact component={CalendarPage} />
            <Route path="/login" exact component={Login} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </div>
  );
};

export default App;
