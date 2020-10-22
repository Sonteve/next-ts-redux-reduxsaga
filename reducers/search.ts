import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from "typesafe-actions";
import produce from "immer";
import { AxiosError } from "axios";
import { SearchItem, SearchCookie, RecentNewsData } from "../interfaces/search";

export const SET_PREV_SEARCH_COOKIE = "SET_PREV_SEARCH_COOKIE";

export const SEARCH_FORM_INIT = "SEARCH_FORM_INIT";

export const SET_CURRENT_ITEM = "SET_CURRENT_ITEM";
export const SET_CURRENT_ITEM_IMAGE_SRC = "SET_CURRENT_ITEM_IMAGE_SRC";

export const SEARCH_WORD_REQUEST = "SEARCH_WORD_REQUEST";
export const SEARCH_WORD_SUCCESS = "SEARCH_WORD_SUCCESS";
export const SEARCH_WORD_FAILURE = "SEARCH_WORD_FAILURE";

export const SET_WHOLE_OFFSET = "SET_WHOLE_OFFSET";
export const SET_RETAIL_OFFSET = "SET_RETAIL_OFFSET";
export const SET_PORT_OFFSET = "SET_PORT_OFFSET";

export const searchWordAction = createAsyncAction(
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
  SEARCH_WORD_FAILURE
)<string, SearchItem[], AxiosError>();

export const RECENT_NEWS_LIST_REQUEST = "RECENT_NEWS_LIST_REQUEST";
export const RECENT_NEWS_LIST_SUCCESS = "RECENT_NEWS_LIST_SUCCESS";
export const RECENT_NEWS_LIST_FAILURE = "RECENT_NEWS_LIST_FAILURE";

export const getRecentNewsListAction = createAsyncAction(
  RECENT_NEWS_LIST_REQUEST,
  RECENT_NEWS_LIST_SUCCESS,
  RECENT_NEWS_LIST_FAILURE
)<undefined, RecentNewsData[], AxiosError>();

export const setPrevSearchCookie = createAction(SET_PREV_SEARCH_COOKIE)<any>();

export const setCurrentItem = createAction(SET_CURRENT_ITEM)<SearchItem>();

export const searchFormInitAction = createAction(SEARCH_FORM_INIT)();

export const setWholeOffset = createAction(SET_WHOLE_OFFSET)<number>();
export const setRetailOffset = createAction(SET_RETAIL_OFFSET)<number>();
export const setPortOffset = createAction(SET_PORT_OFFSET)<number>();

//test
export const setCurrentItemImageSrc = createAction(SET_CURRENT_ITEM_IMAGE_SRC)<
  string
>();

export interface SearchState {
  currentItem: SearchItem | null;
  currentItemImageSrc: string | null;
  prevSearchList: SearchCookie[] | null;
  searchList: SearchItem[];
  searchLoading: boolean;
  searchDone: boolean;
  searchError: AxiosError | null;
  recentNewsList: any;
  recentNewsListDone: boolean;
  recentNewsListLoading: boolean;
  recentNewsListError: AxiosError | null;
  wholeOffset: number | null;
  retailOffset: number | null;
  importExportOffset: number | null;
}

export const initialState: SearchState = {
  currentItem: null,
  currentItemImageSrc: null,
  prevSearchList: null,
  searchList: [],
  searchLoading: false,
  searchDone: false,
  searchError: null,
  recentNewsList: null,
  recentNewsListDone: false,
  recentNewsListLoading: false,
  recentNewsListError: null,
  wholeOffset: null,
  retailOffset: null,
  importExportOffset: null,
};

export type SearchAction = ActionType<
  | typeof searchWordAction
  | typeof searchFormInitAction
  | typeof setPrevSearchCookie
  | typeof setCurrentItem
  | typeof setCurrentItemImageSrc
  | typeof getRecentNewsListAction
  | typeof setWholeOffset
  | typeof setRetailOffset
  | typeof setPortOffset
  /* | typeof getItemCodeMapAction */
>;

const search = createReducer<SearchState, SearchAction>(initialState, {
  [SET_CURRENT_ITEM]: (state, action) =>
    produce(state, (draft) => {
      draft.currentItem = action.payload;
    }),
  [SET_PREV_SEARCH_COOKIE]: (state, action) =>
    produce(state, (draft) => {
      draft.prevSearchList = action.payload;
    }),
  [SEARCH_FORM_INIT]: (state) =>
    produce(state, (draft) => {
      draft.searchList = [];
    }),
  [SEARCH_WORD_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.searchLoading = true;
      draft.searchError = null;
    }),
  [SEARCH_WORD_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.searchLoading = false;
      draft.searchDone = false;
      draft.searchList = action.payload;
    }),
  [SEARCH_WORD_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.searchLoading = false;
      draft.searchError = action.payload;
    }),
  [SET_CURRENT_ITEM_IMAGE_SRC]: (state, action) =>
    produce(state, (draft) => {
      draft.currentItemImageSrc = action.payload;
    }),
  [RECENT_NEWS_LIST_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.recentNewsListLoading = true;
      draft.recentNewsListError = null;
    }),
  [RECENT_NEWS_LIST_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.recentNewsListLoading = false;
      draft.recentNewsListDone = false;
      draft.recentNewsList = action.payload;
    }),
  [RECENT_NEWS_LIST_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.recentNewsListLoading = false;
      draft.recentNewsListError = action.payload;
    }),
  [SET_WHOLE_OFFSET]: (state, action) =>
    produce(state, (draft) => {
      draft.wholeOffset = action.payload;
    }),
  [SET_RETAIL_OFFSET]: (state, action) =>
    produce(state, (draft) => {
      draft.retailOffset = action.payload;
    }),
  [SET_PORT_OFFSET]: (state, action) =>
    produce(state, (draft) => {
      draft.importExportOffset = action.payload;
    }),
});

export default search;
