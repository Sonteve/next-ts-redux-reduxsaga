import { all } from "redux-saga/effects";
import { searchSaga } from "../sagas/search";
import { inquireSaga } from "../sagas/inquire";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3005";

export function* rootSaga() {
  yield all([searchSaga(), inquireSaga()]);
}
