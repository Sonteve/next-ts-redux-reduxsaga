import { all } from "redux-saga/effects";
import { searchSaga } from "../sagas/search";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3005";

export function* rootSaga() {
  yield all([searchSaga()]);
}
