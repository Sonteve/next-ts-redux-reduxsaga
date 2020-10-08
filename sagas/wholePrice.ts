import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  getRecentWholePriceAction,
  RECENT_WHOLE_PRICE_REQUEST,
  RECENT_WHOLE_PRICE_SUCCESS,
  RECENT_WHOLE_PRICE_FAILURE,
  LAST_YEAR_WHOLE_PRICE_REQUEST,
  LAST_YEAR_WHOLE_PRICE_SUCCESS,
  LAST_YEAR_WHOLE_PRICE_FAILURE,
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
  action: ActionType<typeof getRecentWholePriceAction.request>
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

export function* wholePriceSaga() {
  yield takeLatest(RECENT_WHOLE_PRICE_REQUEST, getRecentWholePriceSaga);
  yield takeLatest(LAST_YEAR_WHOLE_PRICE_REQUEST, getLastYearWholePriceSaga);
  /* yield takeLatest(GET_ITEM_CODE_MAP_REQUEST, getItemCodeMapSaga); */
}
