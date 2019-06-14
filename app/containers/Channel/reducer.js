/*
 *
 * CHANNEL reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  CHANNEL_CONST_APIDATA,
  CHANNEL_CONST_APIDATA_ERROR,
  CHANNEL_CONST_APIDATA_SUCCESS
} from "./constants";

export const initialState = fromJS({
  CHANNEL_STATE_APIDATA: [],
  CHANNEL_STATE_APIDATA_LOADING: false,
  CHANNEL_STATE_APIDATA_ERROR: false
});

function channelReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANNEL_CONST_APIDATA:
      console.log("in CHANNEL_CONST_APIDATA action: ", action);
      return state
        .set("CHANNEL_STATE_APIDATA_LOADING", true)
        .set("CHANNEL_STATE_APIDATA_ERROR", false);
    case CHANNEL_CONST_APIDATA_ERROR:
      return state
        .set("CHANNEL_STATE_APIDATA_LOADING", false)
        .set("CHANNEL_STATE_APIDATA_ERROR", action.error);
    case CHANNEL_CONST_APIDATA_SUCCESS:
      console.log(
        "In CHANNEL_CONST_APIDATA_SUCCESS reducer, action",
        action.apiData
      );
      return state
        .set("CHANNEL_STATE_APIDATA_LOADING", true)
        .set("CHANNEL_STATE_APIDATA_ERROR", false)
        .set("CHANNEL_STATE_APIDATA", action.apiData);

    default:
      return state;
  }
}

export default channelReducer;
