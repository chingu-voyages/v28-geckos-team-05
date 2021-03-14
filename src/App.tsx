import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import NotFound from './components/NotFound/NotFound';
import './App.scss';

const App = () => (
  <div className="app">
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/calendar" exact component={CalendarPage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  </div>
);

export default App;
