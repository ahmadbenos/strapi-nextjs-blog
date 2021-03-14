import { combineReducers } from "redux";
import authReducer from "./auth";
import loading from "./loading";

export default combineReducers({
  authState: authReducer,
  loading,
});
