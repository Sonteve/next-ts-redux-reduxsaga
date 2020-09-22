import { all } from "redux-saga/effects";
import { searchSaga } from "../sagas/search";

export function* rootSaga() {
  yield all([searchSaga()]);
}
