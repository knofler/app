/*
 *
 * GENAPP reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GENAPP_CONST_APIDATA,
  GENAPP_CONST_APIDATA_ERROR,
  GENAPP_CONST_APIDATA_SUCCESS,

} from "./constants";

export const initialState = fromJS({
  GENAPP_STATE_APIDATA: [],
  GENAPP_STATE_APIDATA_LOADING: false,
  GENAPP_STATE_APIDATA_ERROR: false,
});

function genappReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GENAPP_CONST_APIDATA:
      console.log("in GENAPP_CONST_APIDATA action: ", action);
      return state
        .set("GENAPP_STATE_APIDATA_LOADING", true)
        .set("GENAPP_STATE_APIDATA_ERROR", false);
    case GENAPP_CONST_APIDATA_ERROR:
      return state
        .set("GENAPP_STATE_APIDATA_LOADING", false)
        .set("GENAPP_STATE_APIDATA_ERROR", action.error);
    case GENAPP_CONST_APIDATA_SUCCESS:
      console.log("In GENAPP_CONST_APIDATA_SUCCESS reducer, action", action.apiData);
      return state
        .set("GENAPP_STATE_APIDATA_LOADING", true)
        .set("GENAPP_STATE_APIDATA_ERROR", false)
        .set("GENAPP_STATE_APIDATA", action.apiData);

    default:
      return state;
  }
}

export default genappReducer;
