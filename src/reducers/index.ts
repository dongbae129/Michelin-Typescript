import { combineReducers } from "redux";
import restaurant from "./restaurant";
const rootReducer = combineReducers({
  restaurant,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
