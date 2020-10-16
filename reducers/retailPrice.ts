import { RetailPrice, ChartData } from "../interfaces/price";
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

export const RETAIL_CHART_DATA_REQUEST = "RETAIL_CHART_DATA_REQUEST";
export const RETAIL_CHART_DATA_SUCCESS = "RETAIL_CHART_DATA_SUCCESS";
export const RETAIL_CHART_DATA_FAILURE = "RETAIL_CHART_DATA_FAILURE";

export const getRetailChartDataAction = createAsyncAction(
  RETAIL_CHART_DATA_REQUEST,
  RETAIL_CHART_DATA_SUCCESS,
  RETAIL_CHART_DATA_FAILURE
)<string, ChartData, AxiosError>();

export type RetailPriceAction = ActionType<
  | typeof getRecentRetailPriceAction
  | typeof getLastYearRetailPriceAction
  | typeof getRetailChartDataAction
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
  retailChartData: ChartData | null;
  retailChartDataLoading: boolean;
  retailChartDataDone: boolean;
  retailChartDataError: AxiosError | null;
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
  retailChartData: null,
  retailChartDataLoading: false,
  retailChartDataDone: false,
  retailChartDataError: null,
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
        draft.recentPriceData = action.payload;
        if (action.payload) {
          draft.recentPriceDataDone = true;
        } else {
          draft.recentPriceDataDone = false;
        }
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
        draft.lastYearPriceData = action.payload;
        if (action.payload) {
          draft.lastYearPriceDataDone = true;
        } else {
          draft.lastYearPriceDataDone = false;
        }
      }),
    [LAST_YEAR_RETAIL_PRICE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.lastYearPriceDataLoading = false;
        draft.lastYearPriceDataError = action.payload;
      }),
    [RETAIL_CHART_DATA_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.retailChartDataLoading = true;
        draft.retailChartDataError = null;
      }),
    [RETAIL_CHART_DATA_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.retailChartDataLoading = false;
        draft.retailChartData = action.payload;
        if (action.payload) {
          draft.retailChartDataDone = true;
        } else {
          draft.retailChartDataDone = false;
        }
      }),
    [RETAIL_CHART_DATA_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.retailChartDataLoading = false;
        draft.retailChartDataError = action.payload;
      }),
  }
);

export default retailPrice;
