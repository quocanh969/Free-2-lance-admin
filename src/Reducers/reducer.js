import { combineReducers } from "redux";
import AccountReducer from './GeneralReducers/Account.reducer';
import SignInReducer from './GeneralReducers/SignIn.reducer';
import UserListReducer from './GeneralReducers/UserList.reducer';
import TopicListReducer from './GeneralReducers/TopicList.reducer';

const reducer = combineReducers({    
    AccountReducer,
    SignInReducer,
    UserListReducer,
    TopicListReducer,
  });
  
  export default reducer;