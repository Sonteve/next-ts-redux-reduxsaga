import { combineReducers } from "redux";
import search from "./search";
import inquire from "./inquire";

const rootReducer = combineReducers({
  search,
  inquire,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
