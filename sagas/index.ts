import { all } from "redux-saga/effects";
import { searchSaga } from "./search";
import { inquireSaga } from "./inquire";
import { mediaSaga } from "./media";
import { wholePriceSaga } from "./wholePrice";
import axios from "axios";

axios.defaults.baseURL = "http://tapi.agripa.kr";

export function* rootSaga() {
  yield all([searchSaga(), inquireSaga(), mediaSaga(), wholePriceSaga()]);
}
