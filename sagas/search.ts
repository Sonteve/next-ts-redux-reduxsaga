import { throttle, put, call } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  searchWordAction,
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
  SEARCH_WORD_FAILURE,
  /* getItemCodeMapAction,
  GET_ITEM_CODE_MAP_REQUEST,
  GET_ITEM_CODE_MAP_SUCCESS,
  GET_ITEM_CODE_MAP_FAILURE, */
} from "../reducers/search";
import axios from "axios";

function searchWordAPI(data: string) {
  return axios.get(`/v2/code/std-item-codes?query=${data}`);
}

function* searchWordSaga(action: ActionType<typeof searchWordAction.request>) {
  console.log("searchWordSaga", action);
  try {
    const result = yield call(searchWordAPI, action.payload);
    console.log("searchResult", result);
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
  yield throttle(50, SEARCH_WORD_REQUEST, searchWordSaga);
  /* yield takeLatest(GET_ITEM_CODE_MAP_REQUEST, getItemCodeMapSaga); */
}
