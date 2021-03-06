import { combineReducers } from "redux";
import AccountReducer from './GeneralReducers/Account.reducer';
import SignInReducer from './GeneralReducers/SignIn.reducer';
import UserListReducer from './GeneralReducers/UserList.reducer';
import TopicListReducer from './GeneralReducers/TopicList.reducer';
import TopicDetailReducer from './GeneralReducers/TopicDetail.reducer';
import UserDetailReducer from './GeneralReducers/UserDetail.reducer';
import JobsListReducer from './GeneralReducers/JobList.reducer';
import JobDetailReducer from './GeneralReducers/JobDetail.reducer';
import TagListReducer from './GeneralReducers/TagList.reducer';
import TagDetailReducer from './GeneralReducers/TagDetail.reducer'
import EmployeeListReducer from './GeneralReducers/EmployeeList.reducer';
import HomeReducer from './GeneralReducers/Home.reducer';
import ReportsReducer from './GeneralReducers/Report.reducer';

const reducer = combineReducers({
    AccountReducer,
    SignInReducer,
    UserListReducer,
    TopicListReducer,
    TopicDetailReducer,
    UserDetailReducer,
    EmployeeListReducer,
    JobsListReducer,
    JobDetailReducer,
    TagListReducer,
    TagDetailReducer,
    HomeReducer,
    ReportsReducer,
});

export default reducer;