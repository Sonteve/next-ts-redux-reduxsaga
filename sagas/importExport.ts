import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  getImportDataAction,
  IMPORT_DATA_REQUEST,
  IMPORT_DATA_SUCCESS,
  IMPORT_DATA_FAILURE,
  getExportDataAction,
  EXPORT_DATA_REQUEST,
  EXPORT_DATA_SUCCESS,
  EXPORT_DATA_FAILURE,
} from "../reducers/importExport";

function getImportDataAPI(data: string) {
  return axios.get(`http://tapi.agripa.kr/v2/trade/importation/${data}`);
}

function* getImportDataSaga(
  action: ActionType<typeof getImportDataAction.request>
) {
  try {
    const result = yield call(getImportDataAPI, action.payload);
    yield put({
      type: IMPORT_DATA_SUCCESS,
      payload: result.data.data.GraphLine ? result.data.data : null,
    });
  } catch (error) {
    yield put({
      type: IMPORT_DATA_FAILURE,
      payload: error.response.data,
    });
  }
}

function getExportDataAPI(data: string) {
  return axios.get(`http://tapi.agripa.kr/v2/trade/exportation/${data}`);
}

function* getExportDataSaga(
  action: ActionType<typeof getExportDataAction.request>
) {
  try {
    const result = yield call(getExportDataAPI, action.payload);
    yield put({
      type: EXPORT_DATA_SUCCESS,
      payload: result.data.data.GraphLine ? result.data.data : null,
    });
  } catch (error) {
    yield put({
      type: EXPORT_DATA_FAILURE,
      payload: error.response.data,
    });
  }
}

export function* importExportSaga() {
  yield takeLatest(IMPORT_DATA_REQUEST, getImportDataSaga);
  yield takeLatest(EXPORT_DATA_REQUEST, getExportDataSaga);
}
