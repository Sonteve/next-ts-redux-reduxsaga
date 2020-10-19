import { throttle, put, call, takeLatest } from "redux-saga/effects";
import { ActionType } from "typesafe-actions";
import {
  searchWordAction,
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
  SEARCH_WORD_FAILURE,
  /* getRecentNewsListAction, */
  RECENT_NEWS_LIST_REQUEST,
  RECENT_NEWS_LIST_SUCCESS,
  RECENT_NEWS_LIST_FAILURE,
} from "../reducers/search";
import axios from "axios";
import convert from "xml-js";

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

const newsOrigin = [
  `http://www.amnews.co.kr/rss/clickTop.xml`,
  `http://www.nongup.net/rss/clickTop.xml`,
  `http://www.livero.co.kr/rss/clickTop.xml`,
  `http://www.nongupin.co.kr/rss/clickTop.xml`,
  `http://www.agrinet.co.kr/rss/clickTop.xml`,
];

async function getRecentNewsListAPI(url: string) {
  const extractedData: any = [];
  const result = await axios.get(url);
  var xmlToJson = await convert.xml2json(result.data, {
    compact: true,
    spaces: 4,
  });
  const newsList = await JSON.parse(xmlToJson).rss.channel.item;

  newsList.map((news: any) => {
    const { title, link, description, author, pubDate } = news;
    extractedData.push({
      title: title._text,
      link: link._text,
      description: description._cdata,
      author: author._text,
      pubDate: pubDate._text,
    });
  });
  return extractedData;
}

export function* getRecentNewsListSaga() {
  /* action: ActionType<typeof getRecentNewsListAction.request> */
  const list = [];
  try {
    for (let i = 0; i < newsOrigin.length; i++) {
      const data = yield call(getRecentNewsListAPI, newsOrigin[i]);
      list.push(...data);
    }

    const result = list
      .sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      })
      .slice(0, 10);

    yield put({
      type: RECENT_NEWS_LIST_SUCCESS,
      payload: result,
    });
  } catch (error) {
    yield put({
      type: RECENT_NEWS_LIST_FAILURE,
      payload: error.response.data,
    });
  }
}

export function* searchSaga() {
  yield throttle(50, SEARCH_WORD_REQUEST, searchWordSaga);
  yield takeLatest(RECENT_NEWS_LIST_REQUEST, getRecentNewsListSaga);
  /* yield takeLatest(GET_ITEM_CODE_MAP_REQUEST, getItemCodeMapSaga); */
}
