import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  getTop3AuctionVolumeAction,
  getTop3ExportationAction,
  getTop3ImportationAction,
  TOP3_IMPORT_INFO_REQUEST,
  TOP3_IMPORT_INFO_SUCCESS,
  TOP3_IMPORT_INFO_FAILURE,
  TOP3_EXPORT_INFO_REQUEST,
  TOP3_EXPORT_INFO_SUCCESS,
  TOP3_EXPORT_INFO_FAILURE,
  TOP3_AUCTION_INFO_REQUEST,
  TOP3_AUCTION_INFO_SUCCESS,
  TOP3_AUCTION_INFO_FAILURE,
} from "../reducers/top3Contents";

function getT3ImportDataAPI() {
  console.log("되어야함");
  return axios.get(
    "http://tapi.agripa.kr/v2/trade/importation/recent-top-three"
  );
}

function* getT3ImportDataSaga(
  action: ActionType<typeof getTop3ImportationAction.request>
) {
  console.log("getT3ImportDataSaga 들어옴");
  try {
    const result = yield call(getT3ImportDataAPI);
    yield put({
      type: TOP3_IMPORT_INFO_SUCCESS,
      payload: result.data.data.length === 0 ? null : result.data.data,
    });
  } catch (error) {
    console.log("실패");
    console.log(error);
    yield put({
      type: TOP3_IMPORT_INFO_FAILURE,
      payload: error.response.data,
    });
  }
}

function getT3ExportDataAPI() {
  return axios.get(
    "http://tapi.agripa.kr/v2/trade/exportation/recent-top-three"
  );
}

function* getT3ExportDataSaga(
  action: ActionType<typeof getTop3ExportationAction.request>
) {
  try {
    const result = yield call(getT3ExportDataAPI);
    yield put({
      type: TOP3_EXPORT_INFO_SUCCESS,
      payload: result.data.data.length === 0 ? null : result.data.data,
    });
  } catch (error) {
    yield put({
      type: TOP3_EXPORT_INFO_FAILURE,
      payload: error.response.data,
    });
  }
}

function getT3AuctionDataAPI() {
  return axios.get(
    "http://tapi.agripa.kr/v2/auction/adj/quantity/recent-top-three"
  );
}

function* getT3AuctionDataSaga(
  action: ActionType<typeof getTop3AuctionVolumeAction.request>
) {
  try {
    const result = yield call(getT3AuctionDataAPI);
    yield put({
      type: TOP3_AUCTION_INFO_SUCCESS,
      payload: result.data.data.length === 0 ? null : result.data.data,
    });
  } catch (error) {
    yield put({
      type: TOP3_AUCTION_INFO_FAILURE,
      payload: error.response.data,
    });
  }
}

export function* top3ContentsSaga() {
  yield takeLatest(TOP3_IMPORT_INFO_REQUEST, getT3ImportDataSaga);
  yield takeLatest(TOP3_EXPORT_INFO_REQUEST, getT3ExportDataSaga);
  yield takeLatest(TOP3_AUCTION_INFO_REQUEST, getT3AuctionDataSaga);
}
