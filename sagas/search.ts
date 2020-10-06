import { throttle, put, call } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  searchWordAction,
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
  SEARCH_WORD_FAILURE,
} from "../reducers/search";
import axios from "axios";

function searchWordAPI(data: string) {
  return axios.get(`/v2/code/std-item-codes?query=${data}&countPerPage=5`);
}

function* searchWordSaga(action: ActionType<typeof searchWordAction.request>) {
  console.log("searchWordSaga", action);
  try {
    const result = yield call(searchWordAPI, action.payload);
    yield put({
      type: SEARCH_WORD_SUCCESS,
      payload: result.data.data,
    });
  } catch (error) {
    yield put({
      type: SEARCH_WORD_FAILURE,
      payload: error.response.data,
    });
  }
}

export function* searchSaga() {
  yield throttle(100, SEARCH_WORD_REQUEST, searchWordSaga);
}
