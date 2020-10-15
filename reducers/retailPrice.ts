import { RetailPrice } from "../interfaces/retailPrice";
import { AxiosError } from "axios";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";
import produce from "immer";

export const RECENT_RETAIL_PRICE_REQUEST = "RECENT_RETAIL_PRICE_REQUEST";
export const RECENT_RETAIL_PRICE_SUCCESS = "RECENT_RETAIL_PRICE_SUCCESS";
export const RECENT_RETAIL_PRICE_FAILURE = "RECENT_RETAIL_PRICE_FAILURE";

export const getRecentRetailPriceAction = createAsyncAction(
  RECENT_RETAIL_PRICE_REQUEST,
  RECENT_RETAIL_PRICE_SUCCESS,
  RECENT_RETAIL_PRICE_FAILURE
)<string, RetailPrice[], AxiosError>();

export const LAST_YEAR_RETAIL_PRICE_REQUEST = "LAST_YEAR_RETAIL_PRICE_REQUEST";
export const LAST_YEAR_RETAIL_PRICE_SUCCESS = "LAST_YEAR_RETAIL_PRICE_SUCCESS";
export const LAST_YEAR_RETAIL_PRICE_FAILURE = "LAST_YEAR_RETAIL_PRICE_FAILURE";

export const getLastYearRetailPriceAction = createAsyncAction(
  LAST_YEAR_RETAIL_PRICE_REQUEST,
  LAST_YEAR_RETAIL_PRICE_SUCCESS,
  LAST_YEAR_RETAIL_PRICE_FAILURE
)<string, RetailPrice[], AxiosError>();

export type RetailPriceAction = ActionType<
  typeof getRecentRetailPriceAction | typeof getLastYearRetailPriceAction
>;

export interface RetailPriceState {
  recentPriceData: RetailPrice[] | null;
  recentPriceDataLoading: boolean;
  recentPriceDataDone: boolean;
  recentPriceDataError: AxiosError | null;
  lastYearPriceData: RetailPrice[] | null;
  lastYearPriceDataLoading: boolean;
  lastYearPriceDataDone: boolean;
  lastYearPriceDataError: AxiosError | null;
}

export const initialState: RetailPriceState = {
  recentPriceData: null,
  recentPriceDataLoading: false,
  recentPriceDataDone: false,
  recentPriceDataError: null,
  lastYearPriceData: null,
  lastYearPriceDataLoading: false,
  lastYearPriceDataDone: false,
  lastYearPriceDataError: null,
};

const retailPrice = createReducer<RetailPriceState, RetailPriceAction>(
  initialState,
  {
    [RECENT_RETAIL_PRICE_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.recentPriceDataLoading = true;
        draft.recentPriceDataError = null;
      }),
    [RECENT_RETAIL_PRICE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.recentPriceDataLoading = false;
        draft.recentPriceDataDone = false;
        draft.recentPriceData = action.payload;
      }),
    [RECENT_RETAIL_PRICE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.recentPriceDataLoading = false;
        draft.recentPriceDataError = action.payload;
      }),
    [LAST_YEAR_RETAIL_PRICE_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.lastYearPriceDataLoading = true;
        draft.lastYearPriceDataError = null;
      }),
    [LAST_YEAR_RETAIL_PRICE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.lastYearPriceDataLoading = false;
        draft.lastYearPriceDataDone = false;
        draft.lastYearPriceData = action.payload;
      }),
    [LAST_YEAR_RETAIL_PRICE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.lastYearPriceDataLoading = false;
        draft.lastYearPriceDataError = action.payload;
      }),
  }
);

export default retailPrice;
