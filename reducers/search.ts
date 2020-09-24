import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from "typesafe-actions";
import produce from "immer";
import { AxiosError } from "axios";
import { SearchItem, SearchCookie } from "../interfaces/search";

export const SET_PREV_SEARCH_COOKIE = "SET_PREV_SEARCH_COOKIE";

export const SEARCH_FORM_INIT = "SEARCH_FORM_INIT";

export const SEARCH_WORD_REQUEST = "SEARCH_WORD_REQUEST";
export const SEARCH_WORD_SUCCESS = "SEARCH_WORD_SUCCESS";
export const SEARCH_WORD_FAILURE = "SEARCH_WORD_FAILURE";

export const searchWordAction = createAsyncAction(
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
  SEARCH_WORD_FAILURE
)<string, SearchItem[], AxiosError>();

export const setPrevSearchCookie = createAction(SET_PREV_SEARCH_COOKIE)<any>();

export const searchFormInitAction = createAction(SEARCH_FORM_INIT)();

export interface SearchState {
  prevSearchList: SearchCookie[] | null;
  searchList: SearchItem[];
  searchLoading: boolean;
  searchDone: boolean;
  searchError: AxiosError | null;
}

export const initialState: SearchState = {
  prevSearchList: null,
  searchList: [],
  searchLoading: false,
  searchDone: false,
  searchError: null,
};

export type SearchAction = ActionType<
  | typeof searchWordAction
  | typeof searchFormInitAction
  | typeof setPrevSearchCookie
>;

const search = createReducer<SearchState, SearchAction>(initialState, {
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
