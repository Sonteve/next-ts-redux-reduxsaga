import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer,
} from "typesafe-actions";
import produce from "immer";
import { AxiosError } from "axios";

export const SEARCH_WORD_REQUEST = "SEARCH_WORD_REQUEST";
export const SEARCH_WORD_SUCCESS = "SEARCH_WORD_SUCCESS";
export const SEARCH_WORD_FAILURE = "SEARCH_WORD_FAILURE";

export const searchWordAction = createAsyncAction(
  SEARCH_WORD_REQUEST,
  SEARCH_WORD_SUCCESS,
  SEARCH_WORD_FAILURE
)<string, string, AxiosError>();

interface SearchState {
  input: string;
  result: string[] | null;
  searchLoading: boolean;
  searchDone: boolean;
  searchError: AxiosError | null;
}

const initialState: SearchState = {
  input: "",
  result: [],
  searchLoading: false,
  searchDone: false,
  searchError: null,
};

export type SearchAction = ActionType<typeof searchWordAction>;

const search = createReducer<SearchState, SearchAction>(initialState, {
  [SEARCH_WORD_REQUEST]: (state, action) =>
    produce(state, (draft) => {
      draft.searchLoading = true;
      draft.searchError = null;
    }),
  [SEARCH_WORD_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.searchLoading = false;
      draft.searchDone = false;
      draft.input = action.payload;
    }),
  [SEARCH_WORD_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.searchLoading = false;
      draft.searchError = action.payload;
    }),
});

export default search;
