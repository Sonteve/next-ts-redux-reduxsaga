import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  getRecentRetailPriceAction,
  RECENT_RETAIL_PRICE_REQUEST,
  RECENT_RETAIL_PRICE_SUCCESS,
  RECENT_RETAIL_PRICE_FAILURE,
  getLastYearRetailPriceAction,
  LAST_YEAR_RETAIL_PRICE_REQUEST,
  LAST_YEAR_RETAIL_PRICE_SUCCESS,
  LAST_YEAR_RETAIL_PRICE_FAILURE,
} from "../reducers/retailPrice";

function getRecentRetailPriceAPI(data: string) {
  return axios.get(`http://tapi.agripa.kr/v2/retail/price/recent/${data}`);
}

function* getRecentRetailPriceSaga(
  action: ActionType<typeof getRecentRetailPriceAction.request>
) {
  try {
    const result = yield call(getRecentRetailPriceAPI, action.payload);
    yield put({
      type: RECENT_RETAIL_PRICE_SUCCESS,
      payload: result.data.data.length === 0 ? null : result.data.data,
    });
  } catch (error) {
    yield put({
      type: RECENT_RETAIL_PRICE_FAILURE,
      payload: error.response.data,
    });
  }
}

function getLastYearRetailPriceAPI(data: string) {
  return axios.get(
    `http://tapi.agripa.kr/v2/retail/price/previous-year/${data}`
  );
}

function* getLastYearRetailPriceSaga(
  action: ActionType<typeof getLastYearRetailPriceAction.request>
) {
  try {
    const result = yield call(getLastYearRetailPriceAPI, action.payload);
    yield put({
      type: LAST_YEAR_RETAIL_PRICE_SUCCESS,
      payload: result.data.data.length === 0 ? null : result.data.data,
    });
  } catch (error) {
    yield put({
      type: LAST_YEAR_RETAIL_PRICE_FAILURE,
      payload: error.response.data,
    });
  }
}

export function* retailPriceSaga() {
  yield takeLatest(RECENT_RETAIL_PRICE_REQUEST, getRecentRetailPriceSaga);
  yield takeLatest(LAST_YEAR_RETAIL_PRICE_REQUEST, getLastYearRetailPriceSaga);
}
