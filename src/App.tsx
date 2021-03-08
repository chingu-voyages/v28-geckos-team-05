import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => (
  <>
    <Header />
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/about" exact component={AboutPage} />
    </Router>
    <Footer />
  </>
);

export default App;
