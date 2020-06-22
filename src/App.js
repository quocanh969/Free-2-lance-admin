import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Assets/css/style.css';
import './Assets/css/icons.css';

import {history} from './Ultis/history/history';

import { BrowserRouter, Switch, Redirect, Router, Route } from 'react-router-dom';
import { SRoute } from './Ultis/CustomRoutes/CustomRoute';

import PersonalUsers from './Components/UsersManagement/PersonalUsers';
import BusinessUsers from './Components/UsersManagement/BusinessUsers';
import PendingJobs from './Components/JobsManagement/PendingJobs';
import Reports from './Components/ReviewsManagement/Reports';
import Home from './Components/Home';

function App() {
  console.log()
  return (
    <div>
      <BrowserRouter>      
        <Switch>
          <SRoute path='/' exact component={Home}></SRoute>
          <SRoute path='/personal-user-management' exact component={PersonalUsers}></SRoute>
          <SRoute path='/business-user-management' exact component={BusinessUsers}></SRoute>
          <SRoute path='/pending-job-management' exact component={PendingJobs}></SRoute>
          <SRoute path='/report-management' exact component={Reports}></SRoute>
          <Redirect to='/not-found'></Redirect>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
