import { HYDRATE } from "next-redux-wrapper"; //  SSR 위해 필요
import { AnyAction, combineReducers } from "redux";
import search, { SearchState } from "./search";
import inquire, { InquireState } from "./inquire";
import media, { MediaState } from "./media";
import wholePrice, { WholePriceState } from "./wholePrice";
import retailPrice, { RetailPriceState } from "./retailPrice";
import importExport, { ImportExportState } from "./importExport";
import top3Contents, { Top3ContentsState } from "./top3Contents";
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
  wholePrice: WholePriceState;
  retailPrice: RetailPriceState;
  importExport: ImportExportState;
  top3Contents: Top3ContentsState;
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
        wholePrice,
        retailPrice,
        importExport,
        top3Contents,
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
