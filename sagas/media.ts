import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAILURE,
  getNewsAction,
} from "../reducers/media";
import { MediaParams } from "../interfaces/media";
import axios from "axios";
import moment from "moment";

function getNewsAPI(data: MediaParams) {
  const { itemCode, start, countPerPage } = data;
  console.log(
    `http://tapi.agripa.kr/media/news?itemCode=${itemCode}&baseDateTime=${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}&start=${start}&countPerPage=${countPerPage}`
  );
  return axios.get(
    `http://tapi.agripa.kr/media/news?itemCode=${itemCode}&baseDateTime=${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}&start=${start}&countPerPage=${countPerPage}`
  );
}

function* getNewsSaga(action: ReturnType<typeof getNewsAction.request>) {
  try {
    const result = yield call(getNewsAPI, action.payload);
    yield put({
      type: GET_NEWS_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    yield put({
      type: GET_NEWS_FAILURE,
      payload: error.response.data,
    });
  }
}

export function* mediaSaga() {
  yield takeLatest(GET_NEWS_REQUEST, getNewsSaga);
}
