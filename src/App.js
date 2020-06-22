import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Assets/css/sb-admin-2.min.css';

import {history} from './Ultis/history/history';

import { BrowserRouter, Switch, Redirect, Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import { SRoute } from './Ultis/CustomRoutes/CustomRoute';

function App() {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <SRoute path='/' exact component={Home}></SRoute>
          <Redirect to='/not-found'></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
