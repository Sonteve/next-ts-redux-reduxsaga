import { combineReducers } from "redux";
import search from "./search";
import inquire from "./inquire";
import media from "./media";

const rootReducer = combineReducers({
  search,
  inquire,
  media,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
