import { all } from "redux-saga/effects";
import { searchSaga } from "../sagas/search";
import { inquireSaga } from "../sagas/inquire";
import { mediaSaga } from "../sagas/media";
import axios from "axios";

axios.defaults.baseURL = "http://tapi.agripa.kr";

export function* rootSaga() {
  yield all([searchSaga(), inquireSaga(), mediaSaga()]);
}
