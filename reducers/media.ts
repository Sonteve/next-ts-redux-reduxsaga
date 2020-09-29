import { AxiosError } from "axios";
import produce from "immer";
import { ActionType, createAsyncAction, createReducer } from "typesafe-actions";
import { MediaParams, News, Youtube } from "../interfaces/media";

export const GET_NEWS_REQUEST = "GET_NEWS_REQUEST";
export const GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS";
export const GET_NEWS_FAILURE = "GET_NEWS_FAILURE";

export const GET_YOUTUBE_REQUEST = "GET_YOUTUBE_REQUEST";
export const GET_YOUTUBE_SUCCESS = "GET_YOUTUBE_SUCCESS";
export const GET_YOUTUBE_FAILURE = "GET_YOUTUBE_FAILURE";

export const getNewsAction = createAsyncAction(
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAILURE
)<MediaParams, News, AxiosError>();

export const getYoutubeAction = createAsyncAction(
  GET_YOUTUBE_REQUEST,
  GET_YOUTUBE_SUCCESS,
  GET_YOUTUBE_FAILURE
)<MediaParams, Youtube, AxiosError>();

type MediaActions = ActionType<typeof getNewsAction | typeof getYoutubeAction>;

interface MediaState {
  news: News | null;
  getNewsLoading: boolean;
  getNewsDone: boolean;
  getNewsError: AxiosError | null;
  youtube: Youtube | null;
  getYoutubeLoading: boolean;
  getYoutubeDone: boolean;
  getYoutubeError: AxiosError | null;
}

const initialState: MediaState = {
  news: null,
  getNewsLoading: false,
  getNewsDone: false,
  getNewsError: null,
  youtube: null,
  getYoutubeLoading: false,
  getYoutubeDone: false,
  getYoutubeError: null,
};

const media = createReducer<MediaState, MediaActions>(initialState, {
  [GET_NEWS_REQUEST]: (state, action) =>
    produce(state, (draft) => {
      draft.getNewsLoading = true;
      draft.getNewsError = null;
    }),
  [GET_NEWS_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.getNewsLoading = false;
      draft.getNewsDone = true;
      draft.news = action.payload;
    }),
  [GET_NEWS_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.getNewsLoading = false;
      draft.getNewsError = action.payload;
    }),
  [GET_YOUTUBE_REQUEST]: (state, action) =>
    produce(state, (draft) => {
      draft.getYoutubeLoading = true;
      draft.getYoutubeError = null;
    }),
  [GET_YOUTUBE_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.getYoutubeLoading = false;
      draft.getYoutubeDone = true;
      draft.youtube = action.payload;
    }),
  [GET_YOUTUBE_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.getYoutubeLoading = false;
      draft.getYoutubeError = action.payload;
    }),
});

export default media;
