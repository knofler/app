/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
 *
 * BOOK reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  BOOK_CONST_APIDATA,
  BOOK_CONST_APIDATA_ERROR,
  BOOK_CONST_APIDATA_SUCCESS,
  BOOK_CONST_CREATE_CHANNEL,
  BOOK_CONST_CREATE_CHANNEL_ERROR,
  BOOK_CONST_CREATE_CHANNEL_SUCCESS,
  BOOK_CONST_CREATE_INPUT,
  BOOK_CONST_START_STREAM,
  BOOK_CONST_STOP_STREAM
} from "./constants";

export const initialState = fromJS({
  BOOK_STATE_APIDATA: [],
  BOOK_STATE_APIDATA_LOADING: false,
  BOOK_STATE_APIDATA_ERROR: false,
  BOOK_STATE_CHANNEL: [],
  BOOK_STATE_INPUT: [],
  BOOK_STATE_AWS_RESPONSE: {},
  BOOK_STATE_START_STREAM: false,
  BOOK_STATE_STOP_STREAM: true
});

function bookReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case BOOK_CONST_APIDATA:
      console.log("in BOOK_CONST_APIDATA action: ", action);
      return state
        .set("BOOK_STATE_APIDATA_LOADING", true)
        .set("BOOK_STATE_APIDATA_ERROR", false);
    case BOOK_CONST_APIDATA_ERROR:
      return state
        .set("BOOK_STATE_APIDATA_LOADING", false)
        .set("BOOK_STATE_APIDATA_ERROR", action.error);
    case BOOK_CONST_APIDATA_SUCCESS:
      console.log(
        "In BOOK_CONST_APIDATA_SUCCESS reducer, action",
        action.apiData
      );
      return state
        .set("BOOK_STATE_APIDATA_LOADING", true)
        .set("BOOK_STATE_APIDATA_ERROR", false)
        .set("BOOK_STATE_APIDATA", action.apiData);
    case BOOK_CONST_CREATE_CHANNEL:
      console.log(
        "In BOOK_CONST_CREATE_CHANNEL reducer, action",
        action.channel
      );
      return state.set("BOOK_STATE_CHANNEL", action.channel);
    case BOOK_CONST_CREATE_CHANNEL_ERROR:
      console.log(
        "In BOOK_CONST_CREATE_CHANNEL_ERROR reducer, action",
        action.channel
      );
      return state.set("BOOK_STATE_CREATE_CHANNEL_ERROR", action.error);
    case BOOK_CONST_CREATE_CHANNEL_SUCCESS:
      console.log(
        "In BOOK_CONST_CREATE_CHANNEL_SUCCESS reducer, action",
        action.awsResponse
      );
      return state.set("BOOK_STATE_AWS_RESPONSE", action.awsResponse);
    case BOOK_CONST_CREATE_INPUT:
      console.log("In BOOK_CONST_CREATE_INPUT reducer, action", action.input);
      return state.set("BOOK_STATE_INPUT", action.input);
    case BOOK_CONST_START_STREAM:
      console.log("In BOOK_CONST_START_STREAM reducer, action", action.start);
      return state
        .set("BOOK_STATE_START_STREAM", true)
        .set("BOOK_STATE_STOP_STREAM", false);
    case BOOK_CONST_STOP_STREAM:
      console.log("In BOOK_CONST_STOP_STREAM reducer, action", action.stop);
      return state
        .set("BOOK_STATE_STOP_STREAM", true)
        .set("BOOK_STATE_START_STREAM", false);

    default:
      return state;
  }
}

export default bookReducer;
