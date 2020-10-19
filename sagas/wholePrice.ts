import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  getRecentWholePriceAction,
  RECENT_WHOLE_PRICE_REQUEST,
  RECENT_WHOLE_PRICE_SUCCESS,
  RECENT_WHOLE_PRICE_FAILURE,
  getLastYearWholePriceAction,
  LAST_YEAR_WHOLE_PRICE_REQUEST,
  LAST_YEAR_WHOLE_PRICE_SUCCESS,
  LAST_YEAR_WHOLE_PRICE_FAILURE,
  getWholeChartDataAction,
  WHOLE_CHART_DATA_REQUEST,
  WHOLE_CHART_DATA_SUCCESS,
  WHOLE_CHART_DATA_FAILURE,
  getAuctionVolumeDataAction,
  AUCTION_VOLUME_DATA_REQUEST,
  AUCTION_VOLUME_DATA_SUCCESS,
  AUCTION_VOLUME_DATA_FAILURE,
} from "../reducers/wholePrice";

function getRecentWholePriceAPI(data: string) {
  return axios.get(`http://tapi.agripa.kr/v2/whole/price/recent/${data}`);
}

function* getRecentWholePriceSaga(
  action: ActionType<typeof getRecentWholePriceAction.request>
) {
  try {
    const result = yield call(getRecentWholePriceAPI, action.payload);
    yield put({
      type: RECENT_WHOLE_PRICE_SUCCESS,
      payload: result.data.data.length === 0 ? null : result.data.data,
    });
  } catch (error) {
    yield put({
      type: RECENT_WHOLE_PRICE_FAILURE,
      payload: error.response.data,
    });
  }
}

function getLastYearWholePriceAPI(data: string) {
  return axios.get(
    `http://tapi.agripa.kr/v2/whole/price/previous-year/${data}`
  );
}

function* getLastYearWholePriceSaga(
  action: ActionType<typeof getLastYearWholePriceAction.request>
) {
  try {
    const result = yield call(getLastYearWholePriceAPI, action.payload);
    yield put({
      type: LAST_YEAR_WHOLE_PRICE_SUCCESS,
      payload: result.data.data.length === 0 ? null : result.data.data,
    });
  } catch (error) {
    yield put({
      type: LAST_YEAR_WHOLE_PRICE_FAILURE,
      payload: error.response.data,
    });
  }
}

function getWholeChartDataAPI(data: string) {
  return axios.get(`http://tapi.agripa.kr/v2/whole/price/line-graph/${data}`);
}

function* getWholeChartDataSaga(
  action: ActionType<typeof getWholeChartDataAction.request>
) {
  try {
    const result = yield call(getWholeChartDataAPI, action.payload);
    yield put({
      type: WHOLE_CHART_DATA_SUCCESS,
      payload: result.data.data.GraphLine ? result.data.data : null,
    });
  } catch (error) {
    yield put({
      type: WHOLE_CHART_DATA_FAILURE,
      payload: error.response.data,
    });
  }
}

function getAuctionVolumeDataAPI(data: string) {
  console.log(
    `http://tapi.agripa.kr/v2/auction/adj/quantity/bar-graph/${data}`
  );
  return axios.get(
    `http://tapi.agripa.kr/v2/auction/adj/quantity/bar-graph/${data}`
  );
}

function* getAuctionVolumeDataSaga(
  action: ActionType<typeof getAuctionVolumeDataAction.request>
) {
  console.log("옥션데이터");
  try {
    const result = yield call(getAuctionVolumeDataAPI, action.payload);
    yield put({
      type: AUCTION_VOLUME_DATA_SUCCESS,
      payload: result.data.data.RangeLabel ? result.data.data : null,
    });
  } catch (error) {
    yield put({
      type: AUCTION_VOLUME_DATA_FAILURE,
      payload: error.response.data,
    });
  }
}

export function* wholePriceSaga() {
  yield takeLatest(RECENT_WHOLE_PRICE_REQUEST, getRecentWholePriceSaga);
  yield takeLatest(LAST_YEAR_WHOLE_PRICE_REQUEST, getLastYearWholePriceSaga);
  yield takeLatest(WHOLE_CHART_DATA_REQUEST, getWholeChartDataSaga);
  yield takeLatest(AUCTION_VOLUME_DATA_REQUEST, getAuctionVolumeDataSaga);
}
