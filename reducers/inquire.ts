import { AxiosError } from "axios";
import {
  createReducer,
  createAsyncAction,
  createAction,
  ActionType,
} from "typesafe-actions";
import { Inquire, InquireSuccess } from "../interfaces/inquire";
import produce from "immer";

export const SEND_INQUIRE_REQUEST = "SEND_INQUIRE_REQUEST";
export const SEND_INQUIRE_SUCCESS = "SEND_INQUIRE_SUCCESS";
export const SEND_INQUIRE_FAILURE = "SEND_INQUIRE_FAILURE";

export const INIT_INQUIRE = "INIT_INQUIRE";

export const initInquire = createAction(INIT_INQUIRE)();
export const sendInquireAction = createAsyncAction(
  SEND_INQUIRE_REQUEST,
  SEND_INQUIRE_SUCCESS,
  SEND_INQUIRE_FAILURE
)<Inquire, InquireSuccess, AxiosError>();

type InquireAction = ActionType<typeof sendInquireAction | typeof initInquire>;

interface InquireState {
  inquireContent: InquireSuccess | null;
  sendInquireLoading: boolean;
  sendInquireDone: boolean;
  sendInquireError: AxiosError | null;
}

const initialState: InquireState = {
  inquireContent: null,
  sendInquireLoading: false,
  sendInquireDone: false,
  sendInquireError: null,
};

const inquire = createReducer<InquireState, InquireAction>(initialState, {
  [INIT_INQUIRE]: (state) =>
    produce(state, (draft) => {
      draft.inquireContent = null;
      draft.sendInquireDone = false;
      draft.sendInquireError = null;
    }),
  [SEND_INQUIRE_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.sendInquireLoading = true;
      draft.sendInquireError = null;
    }),
  [SEND_INQUIRE_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.sendInquireLoading = false;
      draft.sendInquireDone = true;
      draft.inquireContent = action.payload;
    }),
  [SEND_INQUIRE_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.sendInquireLoading = false;
      draft.sendInquireError = action.payload;
    }),
});

export default inquire;
