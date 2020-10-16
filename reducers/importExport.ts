import { ImportExportData } from "../interfaces/importExport";
import { AxiosError } from "axios";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";
import produce from "immer";

export const IMPORT_DATA_REQUEST = "IMPORT_DATA_REQUEST";
export const IMPORT_DATA_SUCCESS = "IMPORT_DATA_SUCCESS";
export const IMPORT_DATA_FAILURE = "IMPORT_DATA_FAILURE";

export const getImportDataAction = createAsyncAction(
  IMPORT_DATA_REQUEST,
  IMPORT_DATA_SUCCESS,
  IMPORT_DATA_FAILURE
)<string, ImportExportData, AxiosError>();

export const EXPORT_DATA_REQUEST = "EXPORT_DATA_REQUEST";
export const EXPORT_DATA_SUCCESS = "EXPORT_DATA_SUCCESS";
export const EXPORT_DATA_FAILURE = "EXPORT_DATA_FAILURE";

export const getExportDataAction = createAsyncAction(
  EXPORT_DATA_REQUEST,
  EXPORT_DATA_SUCCESS,
  EXPORT_DATA_FAILURE
)<string, ImportExportData, AxiosError>();

export type ImportExportAction = ActionType<
  typeof getImportDataAction | typeof getExportDataAction
>;

export interface ImportExportState {
  importData: ImportExportData | null;
  importDataLoading: boolean;
  importDataDone: boolean;
  importDataError: AxiosError | null;
  exportData: ImportExportData | null;
  exportDataLoading: boolean;
  exportDataDone: boolean;
  exportDataError: AxiosError | null;
}

export const initialState: ImportExportState = {
  importData: null,
  importDataLoading: false,
  importDataDone: false,
  importDataError: null,
  exportData: null,
  exportDataLoading: false,
  exportDataDone: false,
  exportDataError: null,
};

const importExport = createReducer<ImportExportState, ImportExportAction>(
  initialState,
  {
    [IMPORT_DATA_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.importDataLoading = true;
        draft.importDataError = null;
      }),
    [IMPORT_DATA_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.importDataLoading = false;
        draft.importData = action.payload;
        if (action.payload) {
          draft.importDataDone = true;
        } else {
          draft.importDataDone = false;
        }
      }),
    [IMPORT_DATA_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.importDataLoading = false;
        draft.importDataError = action.payload;
      }),
    [EXPORT_DATA_REQUEST]: (state) =>
      produce(state, (draft) => {
        draft.exportDataLoading = true;
        draft.exportDataError = null;
      }),
    [EXPORT_DATA_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.exportDataLoading = false;
        draft.exportData = action.payload;
        if (action.payload) {
          draft.exportDataDone = true;
        } else {
          draft.exportDataDone = false;
        }
      }),
    [EXPORT_DATA_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.exportDataLoading = false;
        draft.exportDataError = action.payload;
      }),
  }
);

export default importExport;
