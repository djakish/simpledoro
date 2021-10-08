import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Pomodoro from './Pomodoro';
import './App.global.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Pomodoro} />
      </Switch>
    </Router>
  );
}
