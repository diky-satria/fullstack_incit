import { combineReducers } from "redux";
import authReducer from "./auth/reducer";

const reducer: any = combineReducers({
  auth: authReducer,
});

export default reducer;
