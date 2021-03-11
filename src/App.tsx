import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';

const App = () => (
  <div className="app">
    <Router>
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/about" exact component={AboutPage} />
      <Route path="/calendar" exact component={CalendarPage} />
      <Footer />
    </Router>
  </div>
);

export default App;
