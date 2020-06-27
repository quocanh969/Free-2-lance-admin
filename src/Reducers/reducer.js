import { combineReducers } from "redux";
import AccountReducer from './GeneralReducers/Account.reducer';
import SignInReducer from './GeneralReducers/SignIn.reducer';
import UserListReducer from './GeneralReducers/UserList.reducer';
import UserDetailReducer from './GeneralReducers/UserDetail.reducer';
import JobsListReducer from './GeneralReducers/JobList.reducer';

const reducer = combineReducers({    
    AccountReducer,
    SignInReducer,
    UserListReducer,
    UserDetailReducer,
    JobsListReducer,
  });
  
  export default reducer;