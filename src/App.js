import React from 'react';
import './App.css';
import './Assets/css/style.css';
import './Assets/css/icons.css';

import { BrowserRouter, Switch, Redirect, Router, Route } from 'react-router-dom';
import { SRoute } from './Ultis/CustomRoutes/CustomRoute';

import { history } from './Ultis/history/history';

import PersonalUsers from './Components/UsersManagement/PersonalUsers';
import BusinessUsers from './Components/UsersManagement/BusinessUsers';
import PendingJobs from './Components/JobsManagement/PendingJobs';
import Reports from './Components/ReviewsManagement/Reports';
import Home from './Components/Home';
import Tags from './Components/OtherManagement/Tags';
import UserDetail from './Components/UsersManagement/UserDetail';
import JobDetail from './Components/JobsManagement/JobDetail';
import Login from './Components/Account/Login';
import Topics from './Components/JobsManagement/Topic';
import TopicDetail from './Components/JobsManagement/TopicDetailTab/TopicDetail';
import EmployeeUsers from './Components/UsersManagement/EmployeeUsers';
import UpdateInfo from './Components/Account/UpdateInfo';
import AddTopic from './Components/JobsManagement/TopicDetailTab/AddTopic';
import TagDetail from './Components/OtherManagement/TagDetailTab/TagDetail';
import AddTag from './Components/OtherManagement/TagDetailTab/AddTag';
import JobReports from './Components/ReviewsManagement/JobReport';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <SRoute path='/' exact component={Home}></SRoute>

        <SRoute path='/personal-user-management' exact component={PersonalUsers}></SRoute>
        <SRoute path='/business-user-management' exact component={BusinessUsers}></SRoute>
        <SRoute path='/employee-user-management' exact component={EmployeeUsers}></SRoute>
        <SRoute path='/user-detail/id=:id_user' exact component={UserDetail}></SRoute>

        <SRoute path='/tags-management' exact component={Tags}></SRoute>
        <SRoute path='/tag-detail/id=:id_tag' exact component={TagDetail}></SRoute>
        <SRoute path='/add-tag' exact component={AddTag}></SRoute>

        <SRoute path='/job-management' exact component={PendingJobs}></SRoute>
        <SRoute path='/job-detail/id=:id_job' exact component={JobDetail}></SRoute>

        <SRoute path='/topic-management' exact component={Topics}></SRoute>
        <SRoute path='/topic-detail/id=:id_jobtopic' exact component={TopicDetail}></SRoute>
        <SRoute path='/add-topic' exact component={AddTopic}></SRoute>

        <SRoute path='/report-management' exact component={Reports}></SRoute>
        <SRoute path='/job-report-management' exact component={JobReports}></SRoute>

        <SRoute path='/user-profile' exact component={UpdateInfo}></SRoute>

        <Route path='/login' exact component={Login}></Route>
        {/* <Redirect to='/not-found'></Redirect> */}
      </Switch>
    </Router>
  );
}

export default App;
