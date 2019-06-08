/*
 *
 * CHEF reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHEF_CONST_APIDATA,
  CHEF_CONST_APIDATA_ERROR,
  CHEF_CONST_APIDATA_SUCCESS,

} from "./constants";

export const initialState = fromJS({
  CHEF_STATE_APIDATA: [],
  CHEF_STATE_APIDATA_LOADING: false,
  CHEF_STATE_APIDATA_ERROR: false,
});

function chefReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHEF_CONST_APIDATA:
      console.log("in CHEF_CONST_APIDATA action: ", action);
      return state
        .set("CHEF_STATE_APIDATA_LOADING", true)
        .set("CHEF_STATE_APIDATA_ERROR", false);
    case CHEF_CONST_APIDATA_ERROR:
      return state
        .set("CHEF_STATE_APIDATA_LOADING", false)
        .set("CHEF_STATE_APIDATA_ERROR", action.error);
    case CHEF_CONST_APIDATA_SUCCESS:
      console.log("In CHEF_CONST_APIDATA_SUCCESS reducer, action", action.apiData);
      return state
        .set("CHEF_STATE_APIDATA_LOADING", true)
        .set("CHEF_STATE_APIDATA_ERROR", false)
        .set("CHEF_STATE_APIDATA", action.apiData);

    default:
      return state;
  }
}

export default chefReducer;
