/*
 *
 * PENCIL reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  PENCIL_CONST_APIDATA,
  PENCIL_CONST_APIDATA_ERROR,
  PENCIL_CONST_APIDATA_SUCCESS,

} from "./constants";

export const initialState = fromJS({
  PENCIL_STATE_APIDATA: [],
  PENCIL_STATE_APIDATA_LOADING: false,
  PENCIL_STATE_APIDATA_ERROR: false,
});

function pencilReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case PENCIL_CONST_APIDATA:
      console.log("in PENCIL_CONST_APIDATA action: ", action);
      return state
        .set("PENCIL_STATE_APIDATA_LOADING", true)
        .set("PENCIL_STATE_APIDATA_ERROR", false);
    case PENCIL_CONST_APIDATA_ERROR:
      return state
        .set("PENCIL_STATE_APIDATA_LOADING", false)
        .set("PENCIL_STATE_APIDATA_ERROR", action.error);
    case PENCIL_CONST_APIDATA_SUCCESS:
      console.log("In PENCIL_CONST_APIDATA_SUCCESS reducer, action", action.apiData);
      return state
        .set("PENCIL_STATE_APIDATA_LOADING", true)
        .set("PENCIL_STATE_APIDATA_ERROR", false)
        .set("PENCIL_STATE_APIDATA", action.apiData);

    default:
      return state;
  }
}

export default pencilReducer;
