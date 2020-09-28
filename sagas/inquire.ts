import { call, put, takeLatest } from "redux-saga/effects";
import {
  SEND_INQUIRE_REQUEST,
  SEND_INQUIRE_SUCCESS,
  SEND_INQUIRE_FAILURE,
  sendInquireAction,
} from "../reducers/inquire";
import { Inquire } from "../interfaces/inquire";
import axios from "axios";

function sendInquireAPI(data: Inquire) {
  console.log("inquireDAta", data);
  return axios.post("/inquire", data);
}

function* sendInquireSaga(
  action: ReturnType<typeof sendInquireAction.request>
) {
  try {
    const result = yield call(sendInquireAPI, action.payload);
    yield put({
      type: SEND_INQUIRE_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    yield put({
      type: SEND_INQUIRE_FAILURE,
      payload: error.response.data,
    });
  }
}

export function* inquireSaga() {
  yield takeLatest(SEND_INQUIRE_REQUEST, sendInquireSaga);
}
