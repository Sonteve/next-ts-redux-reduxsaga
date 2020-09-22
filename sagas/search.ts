import { delay, takeLatest, throttle, put } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  searchWordAction,
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
  SEARCH_WORD_FAILURE,
} from "../reducers/search";

function* searchWordSaga(action: ActionType<typeof searchWordAction.request>) {
  console.log("searchWordAction", action);
  try {
    yield delay(500);
    /* const result = action.payload; */
    yield put({
      type: SEARCH_WORD_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: SEARCH_WORD_FAILURE,
      error: error.response.data,
    });
  }
}

export function* searchSaga() {
  yield takeLatest(SEARCH_WORD_REQUEST, searchWordSaga);
}
