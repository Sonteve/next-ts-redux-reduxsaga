import { RecentWholePrice, LastYearWholePrice } from "../interfaces/wholePrice";
import { AxiosError } from "axios";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";
import produce from "immer";

export const RECENT_WHOLE_PRICE_REQUEST = "RECENT_WHOLE_PRICE_REQUEST";
export const RECENT_WHOLE_PRICE_SUCCESS = "RECENT_WHOLE_PRICE_SUCCESS";
export const RECENT_WHOLE_PRICE_FAILURE = "RECENT_WHOLE_PRICE_FAILURE";

export const getRecentWholePriceAction = createAsyncAction(
  RECENT_WHOLE_PRICE_REQUEST,
  RECENT_WHOLE_PRICE_SUCCESS,
  RECENT_WHOLE_PRICE_FAILURE
)<string, RecentWholePrice[], AxiosError>();

export const LAST_YEAR_WHOLE_PRICE_REQUEST = "LAST_YEAR_WHOLE_PRICE_REQUEST";
export const LAST_YEAR_WHOLE_PRICE_SUCCESS = "LAST_YEAR_WHOLE_PRICE_SUCCESS";
export const LAST_YEAR_WHOLE_PRICE_FAILURE = "LAST_YEAR_WHOLE_PRICE_FAILURE";

export const getLastYearWholePriceAction = createAsyncAction(
  LAST_YEAR_WHOLE_PRICE_REQUEST,
  LAST_YEAR_WHOLE_PRICE_SUCCESS,
  LAST_YEAR_WHOLE_PRICE_FAILURE
)<string, LastYearWholePrice[], AxiosError>();

export interface WholePriceState {
  recentPriceData: RecentWholePrice[] | null;
  recentPriceDataLoading: boolean;
  recentPriceDataDone: boolean;
  recentPriceDataError: AxiosError | null;
  lastYearPriceData: LastYearWholePrice[] | null;
  lastYearPriceDataLoading: boolean;
  lastYearPriceDataDone: boolean;
  lastYearPriceDataError: AxiosError | null;
}

export const initialState: WholePriceState = {
  recentPriceData: null,
  recentPriceDataLoading: false,
  recentPriceDataDone: false,
  recentPriceDataError: null,
  lastYearPriceData: null,
  lastYearPriceDataLoading: false,
  lastYearPriceDataDone: false,
  lastYearPriceDataError: null,
};

export type WholePriceAction = ActionType<
  typeof getRecentWholePriceAction | typeof getLastYearWholePriceAction
>;

const wholePrice = createReducer<WholePriceState, WholePriceAction>(
  initialState,
  {
    [RECENT_WHOLE_PRICE_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.recentPriceDataLoading = true;
        draft.recentPriceDataError = null;
      }),
    [RECENT_WHOLE_PRICE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.recentPriceDataLoading = false;
        draft.recentPriceDataDone = false;
        draft.recentPriceData = action.payload;
      }),
    [RECENT_WHOLE_PRICE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.recentPriceDataLoading = false;
        draft.recentPriceDataError = action.payload;
      }),
    [LAST_YEAR_WHOLE_PRICE_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.lastYearPriceDataLoading = true;
        draft.lastYearPriceDataError = null;
      }),
    [LAST_YEAR_WHOLE_PRICE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.lastYearPriceDataLoading = false;
        draft.lastYearPriceDataDone = false;
        draft.lastYearPriceData = action.payload;
      }),
    [LAST_YEAR_WHOLE_PRICE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.lastYearPriceDataLoading = false;
        draft.lastYearPriceDataError = action.payload;
      }),
  }
);

export default wholePrice;
