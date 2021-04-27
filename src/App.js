import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';


function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route path="/item/:id" component={ItemPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
