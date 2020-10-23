import produce from "immer";
import {
  T3ExportData,
  T3ImportData,
  T3AuctionVolumeData,
} from "../interfaces/top3Contents";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";
import { AxiosError } from "axios";

export const TOP3_EXPORT_INFO_REQUEST = "TOP3_EXPORT_INFO_REQUEST";
export const TOP3_EXPORT_INFO_SUCCESS = "TOP3_EXPORT_INFO_SUCCESS";
export const TOP3_EXPORT_INFO_FAILURE = "TOP3_EXPORT_INFO_FAILURE";

export const getTop3ExportationAction = createAsyncAction(
  TOP3_EXPORT_INFO_REQUEST,
  TOP3_EXPORT_INFO_SUCCESS,
  TOP3_EXPORT_INFO_FAILURE
)<undefined, T3ExportData[], AxiosError>();

export const TOP3_IMPORT_INFO_REQUEST = "TOP3_IMPORT_INFO_REQUEST";
export const TOP3_IMPORT_INFO_SUCCESS = "TOP3_IMPORT_INFO_SUCCESS";
export const TOP3_IMPORT_INFO_FAILURE = "TOP3_IMPORT_INFO_FAILURE";
export const getTop3ImportationAction = createAsyncAction(
  TOP3_IMPORT_INFO_REQUEST,
  TOP3_IMPORT_INFO_SUCCESS,
  TOP3_IMPORT_INFO_FAILURE
)<undefined, T3ImportData[], AxiosError>();

export const TOP3_AUCTION_INFO_REQUEST = "TOP3_AUCTION_INFO_REQUEST";
export const TOP3_AUCTION_INFO_SUCCESS = "TOP3_AUCTION_INFO_SUCCESS";
export const TOP3_AUCTION_INFO_FAILURE = "TOP3_AUCTION_INFO_FAILURE";

export const getTop3AuctionVolumeAction = createAsyncAction(
  TOP3_AUCTION_INFO_REQUEST,
  TOP3_AUCTION_INFO_SUCCESS,
  TOP3_AUCTION_INFO_FAILURE
)<undefined, T3AuctionVolumeData[], AxiosError>();

export type Top3ContentsAction = ActionType<
  | typeof getTop3ImportationAction
  | typeof getTop3ExportationAction
  | typeof getTop3AuctionVolumeAction
>;

export interface Top3ContentsState {
  t3ImportData: T3ImportData[] | null;
  getT3ImportDataLoading: boolean;
  getT3ImportDataDone: boolean;
  getT3ImportDataError: AxiosError | null;
  t3ExportData: T3ExportData[] | null;
  getT3ExportDataLoading: boolean;
  getT3ExportDataDone: boolean;
  getT3ExportDataError: AxiosError | null;
  t3AuctionData: T3AuctionVolumeData[] | null;
  getT3AuctionDataLoading: boolean;
  getT3AuctionDataDone: boolean;
  getT3AuctionDataError: AxiosError | null;
}

export const initialState: Top3ContentsState = {
  t3ImportData: null,
  getT3ImportDataLoading: false,
  getT3ImportDataDone: false,
  getT3ImportDataError: null,
  t3ExportData: null,
  getT3ExportDataLoading: false,
  getT3ExportDataDone: false,
  getT3ExportDataError: null,
  t3AuctionData: null,
  getT3AuctionDataLoading: false,
  getT3AuctionDataDone: false,
  getT3AuctionDataError: null,
};

const top3Contents = createReducer<Top3ContentsState, Top3ContentsAction>(
  initialState,
  {
    [TOP3_IMPORT_INFO_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.getT3ImportDataLoading = true;
        draft.getT3ImportDataError = null;
      }),
    [TOP3_IMPORT_INFO_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.getT3ImportDataLoading = false;
        draft.t3ImportData = action.payload;
        if (action.payload) {
          draft.getT3ImportDataDone = true;
        } else {
          draft.getT3ImportDataDone = false;
        }
      }),
    [TOP3_IMPORT_INFO_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.getT3ImportDataLoading = false;
        draft.getT3ImportDataError = action.payload;
      }),
    [TOP3_EXPORT_INFO_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.getT3ExportDataLoading = true;
        draft.getT3ExportDataError = null;
      }),
    [TOP3_EXPORT_INFO_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.getT3ExportDataLoading = false;
        draft.t3ExportData = action.payload;
        if (action.payload) {
          draft.getT3ExportDataDone = true;
        } else {
          draft.getT3ExportDataDone = false;
        }
      }),
    [TOP3_EXPORT_INFO_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.getT3ExportDataLoading = false;
        draft.getT3ExportDataError = action.payload;
      }),
    [TOP3_AUCTION_INFO_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.getT3AuctionDataLoading = true;
        draft.getT3AuctionDataError = null;
      }),
    [TOP3_AUCTION_INFO_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.getT3AuctionDataLoading = false;
        draft.t3AuctionData = action.payload;
        if (action.payload) {
          draft.getT3AuctionDataDone = true;
        } else {
          draft.getT3AuctionDataDone = false;
        }
      }),
    [TOP3_AUCTION_INFO_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.getT3AuctionDataLoading = false;
        draft.getT3AuctionDataError = action.payload;
      }),
  }
);

export default top3Contents;
