import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from "typesafe-actions";
import produce from "immer";
import { AxiosError } from "axios";
import { SearchItem, SearchCookie, ItemCodeMap } from "../interfaces/search";

export const SET_PREV_SEARCH_COOKIE = "SET_PREV_SEARCH_COOKIE";

export const SEARCH_FORM_INIT = "SEARCH_FORM_INIT";

export const SET_CURRENT_ITEM = "SET_CURRENT_ITEM";

export const GET_ITEM_CODE_MAP_REQUEST = "GET_ITEM_CODE_MAP_REQUEST";
export const GET_ITEM_CODE_MAP_SUCCESS = "GET_ITEM_CODE_MAP_SUCCESS";
export const GET_ITEM_CODE_MAP_FAILURE = "GET_ITEM_CODE_MAP_FAILURE";

export const SEARCH_WORD_REQUEST = "SEARCH_WORD_REQUEST";
export const SEARCH_WORD_SUCCESS = "SEARCH_WORD_SUCCESS";
export const SEARCH_WORD_FAILURE = "SEARCH_WORD_FAILURE";

export const searchWordAction = createAsyncAction(
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
  SEARCH_WORD_FAILURE
)<string, SearchItem[], AxiosError>();

export const getItemCodeMapAction = createAsyncAction(
  GET_ITEM_CODE_MAP_REQUEST,
  GET_ITEM_CODE_MAP_SUCCESS,
  GET_ITEM_CODE_MAP_FAILURE
)<string, ItemCodeMap, AxiosError>();

export const setPrevSearchCookie = createAction(SET_PREV_SEARCH_COOKIE)<any>();

export const setCurrentItem = createAction(SET_CURRENT_ITEM)<SearchItem>();

export const searchFormInitAction = createAction(SEARCH_FORM_INIT)();

export interface SearchState {
  currentItem: SearchItem | null;
  itemCodeMap: ItemCodeMap | null;
  itemCodeMapLoading: boolean;
  itemCodeMapDone: boolean;
  itemCodeMapError: AxiosError | null;
  prevSearchList: SearchCookie[] | null;
  searchList: SearchItem[];
  searchLoading: boolean;
  searchDone: boolean;
  searchError: AxiosError | null;
}

export const initialState: SearchState = {
  currentItem: null,
  itemCodeMap: null,
  itemCodeMapLoading: false,
  itemCodeMapDone: false,
  itemCodeMapError: null,
  prevSearchList: null,
  searchList: [],
  searchLoading: false,
  searchDone: false,
  searchError: null,
};

export type SearchAction = ActionType<
  | typeof searchWordAction
  | typeof getItemCodeMapAction
  | typeof searchFormInitAction
  | typeof setPrevSearchCookie
  | typeof setCurrentItem
>;

const search = createReducer<SearchState, SearchAction>(initialState, {
  [SET_CURRENT_ITEM]: (state, action) =>
    produce(state, (draft) => {
      draft.currentItem = action.payload;
    }),
  [GET_ITEM_CODE_MAP_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.itemCodeMapLoading = true;
      draft.itemCodeMapError = null;
    }),
  [GET_ITEM_CODE_MAP_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.itemCodeMapLoading = false;
      draft.itemCodeMapDone = false;
      draft.itemCodeMap = action.payload;
    }),
  [GET_ITEM_CODE_MAP_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.itemCodeMapLoading = false;
      draft.itemCodeMapError = action.payload;
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
});

export default search;
