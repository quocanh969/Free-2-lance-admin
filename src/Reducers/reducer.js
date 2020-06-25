import { combineReducers } from "redux";
import AccountReducer from './GeneralReducers/Account.reducer';
import SignInReducer from './GeneralReducers/SignIn.reducer';

const reducer = combineReducers({    
    AccountReducer,
    SignInReducer,
  });
  
  export default reducer;