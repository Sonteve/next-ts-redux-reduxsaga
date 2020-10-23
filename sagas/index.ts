import { all } from "redux-saga/effects";
import { searchSaga } from "./search";
import { inquireSaga } from "./inquire";
import { mediaSaga } from "./media";
import { wholePriceSaga } from "./wholePrice";
import { retailPriceSaga } from "./retailPrice";
import { importExportSaga } from "./importExport";
import { top3ContentsSaga } from "./top3Contents";
import axios from "axios";

axios.defaults.baseURL = "http://tapi.agripa.kr";

export function* rootSaga() {
  yield all([
    searchSaga(),
    inquireSaga(),
    mediaSaga(),
    wholePriceSaga(),
    retailPriceSaga(),
    importExportSaga(),
    top3ContentsSaga(),
  ]);
}
