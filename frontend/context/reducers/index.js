import { combineReducers } from "redux";
import authReducer from "./auth";
import loading from "./loading";
import errorState from "./error";

//we export the combineReducers function destructed from 'redux' module
//and we put all the reducers in an object
export default combineReducers({
  authState: authReducer,
  loading,
  errorState,
});
