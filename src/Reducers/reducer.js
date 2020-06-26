import { combineReducers } from "redux";
import AccountReducer from './GeneralReducers/Account.reducer';
import SignInReducer from './GeneralReducers/SignIn.reducer';
import UserListReducer from './GeneralReducers/UserList.reducer';
import UserDetailReducer from './GeneralReducers/UserDetail.reducer';

const reducer = combineReducers({    
    AccountReducer,
    SignInReducer,
    UserListReducer,
    UserDetailReducer,
  });
  
  export default reducer;