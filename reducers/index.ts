import { AnyAction } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import search from "./search";

/* export interface State {
  tick: string;
} */

// create your reducer
const rootReducer = (state: any, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    default: {
      const combineReducer: any = combineReducers({
        search,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
/* 
// create a makeStore function
const makeStore: MakeStore<State> = (context: Context) =>
  createStore(rootReducer);

// export an assembled wrapper
export const wrapper = createWrapper<State>(makeStore, { debug: true }); */
