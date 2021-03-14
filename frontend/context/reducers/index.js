import { combineReducers } from "redux";
import authReducer from "./auth";
import loading from "./loading";
import errorState from "./error";

export default combineReducers({
  authState: authReducer,
  loading,
  errorState,
});
