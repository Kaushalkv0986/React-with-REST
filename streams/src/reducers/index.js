import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import authReducer from "./authReducer";
import streamsReducer from "./streamsReducer";

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  streams: streamsReducer
});