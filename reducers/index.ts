import { HYDRATE } from "next-redux-wrapper"; //  SSR 위해 필요
import { AnyAction, combineReducers } from "redux";
import search, { SearchState } from "./search";
import inquire, { InquireState } from "./inquire";
import media, { MediaState } from "./media";

/* const rootReducer = combineReducers({
  search,
  inquire,
  media,
});
 */
export type State = {
  search: SearchState;
  inquire: InquireState;
  media: MediaState;
};
const rootReducer = (state: State | undefined, action: AnyAction): State => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        search,
        inquire,
        media,
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
