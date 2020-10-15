import {
  WholePrice,
  ChartData,
  AuctionVolumeData,
} from "../interfaces/wholePrice";
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
)<string, WholePrice[], AxiosError>();

export const LAST_YEAR_WHOLE_PRICE_REQUEST = "LAST_YEAR_WHOLE_PRICE_REQUEST";
export const LAST_YEAR_WHOLE_PRICE_SUCCESS = "LAST_YEAR_WHOLE_PRICE_SUCCESS";
export const LAST_YEAR_WHOLE_PRICE_FAILURE = "LAST_YEAR_WHOLE_PRICE_FAILURE";

export const getLastYearWholePriceAction = createAsyncAction(
  LAST_YEAR_WHOLE_PRICE_REQUEST,
  LAST_YEAR_WHOLE_PRICE_SUCCESS,
  LAST_YEAR_WHOLE_PRICE_FAILURE
)<string, WholePrice[], AxiosError>();

export const WHOLE_CHART_DATA_REQUEST = "WHOLE_CHART_DATA_REQUEST";
export const WHOLE_CHART_DATA_SUCCESS = "WHOLE_CHART_DATA_SUCCESS";
export const WHOLE_CHART_DATA_FAILURE = "WHOLE_CHART_DATA_FAILURE";

export const getWholeChartDataAction = createAsyncAction(
  WHOLE_CHART_DATA_REQUEST,
  WHOLE_CHART_DATA_SUCCESS,
  WHOLE_CHART_DATA_FAILURE
)<string, ChartData, AxiosError>();

export const AUCTION_VOLUME_DATA_REQUEST = "AUCTION_VOLUME_DATA_REQUEST";
export const AUCTION_VOLUME_DATA_SUCCESS = "AUCTION_VOLUME_DATA_SUCCESS";
export const AUCTION_VOLUME_DATA_FAILURE = "AUCTION_VOLUME_DATA_FAILURE";

export const getAuctionVolumeDataAction = createAsyncAction(
  AUCTION_VOLUME_DATA_REQUEST,
  AUCTION_VOLUME_DATA_SUCCESS,
  AUCTION_VOLUME_DATA_FAILURE
)<string, AuctionVolumeData, AxiosError>();

export interface WholePriceState {
  recentPriceData: WholePrice[] | null;
  recentPriceDataLoading: boolean;
  recentPriceDataDone: boolean;
  recentPriceDataError: AxiosError | null;
  lastYearPriceData: WholePrice[] | null;
  lastYearPriceDataLoading: boolean;
  lastYearPriceDataDone: boolean;
  lastYearPriceDataError: AxiosError | null;
  wholeChartData: ChartData | null;
  wholeChartDataLoading: boolean;
  wholeChartDataDone: boolean;
  wholeChartDataError: AxiosError | null;
  auctionVolumeData: AuctionVolumeData | null;
  auctionVolumeDataLoading: boolean;
  auctionVolumeDataDone: boolean;
  auctionVolumeDataError: AxiosError | null;
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
  wholeChartData: null,
  wholeChartDataLoading: false,
  wholeChartDataDone: false,
  wholeChartDataError: null,
  auctionVolumeData: null,
  auctionVolumeDataLoading: false,
  auctionVolumeDataDone: false,
  auctionVolumeDataError: null,
};

export type WholePriceAction = ActionType<
  | typeof getRecentWholePriceAction
  | typeof getLastYearWholePriceAction
  | typeof getWholeChartDataAction
  | typeof getAuctionVolumeDataAction
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
    [WHOLE_CHART_DATA_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.wholeChartDataLoading = true;
        draft.wholeChartDataError = null;
      }),
    [WHOLE_CHART_DATA_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.wholeChartDataLoading = false;
        draft.wholeChartDataDone = false;
        draft.wholeChartData = action.payload;
      }),
    [WHOLE_CHART_DATA_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.wholeChartDataLoading = false;
        draft.wholeChartDataError = action.payload;
      }),
    [AUCTION_VOLUME_DATA_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.auctionVolumeDataLoading = true;
        draft.auctionVolumeDataError = null;
      }),
    [AUCTION_VOLUME_DATA_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.auctionVolumeDataLoading = false;
        draft.auctionVolumeDataDone = false;
        draft.auctionVolumeData = action.payload;
      }),
    [AUCTION_VOLUME_DATA_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.auctionVolumeDataLoading = false;
        draft.auctionVolumeDataError = action.payload;
      }),
  }
);

export default wholePrice;
