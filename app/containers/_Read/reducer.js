/*
 *
 * READ reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  READ_CONST_APIDATA,
  READ_CONST_APIDATA_ERROR,
  READ_CONST_APIDATA_SUCCESS
} from "./constants";

export const initialState = fromJS({
  READ_STATE_APIDATA: [],
  READ_STATE_APIDATA_LOADING: false,
  READ_STATE_APIDATA_ERROR: false
});

function readReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case READ_CONST_APIDATA:
      console.log("in READ_CONST_APIDATA action: ", action);
      return state
        .set("READ_STATE_APIDATA_LOADING", true)
        .set("READ_STATE_APIDATA_ERROR", false);
    case READ_CONST_APIDATA_ERROR:
      return state
        .set("READ_STATE_APIDATA_LOADING", false)
        .set("READ_STATE_APIDATA_ERROR", action.error);
    case READ_CONST_APIDATA_SUCCESS:
      console.log(
        "In READ_CONST_APIDATA_SUCCESS reducer, action",
        action.apiData
      );
      return state
        .set("READ_STATE_APIDATA_LOADING", true)
        .set("READ_STATE_APIDATA_ERROR", false)
        .set("READ_STATE_APIDATA", action.apiData);

    default:
      return state;
  }
}

export default readReducer;
