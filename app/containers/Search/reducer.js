/* eslint-disable no-console */
/*
 *
 * SEARCH reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  SEARCH_CONST_APIDATA,
  SEARCH_CONST_SEARCHTERM,
  SEARCH_CONST_SEARCHTERM_CHANGE,
  SEARCH_CONST_APIDATA_ERROR,
  SEARCH_CONST_APIDATA_SUCCESS
} from "./constants";

export const initialState = fromJS({
  SEARCH_STATE_APIDATA: [],
  SEARCH_STATE_SEARCHTERM: "",
  SEARCH_STATE_SEARCHTERM_CHANGE: [],
  SEARCH_STATE_APIDATA_LOADING: false,
  SEARCH_STATE_APIDATA_ERROR: false
});

function searchReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SEARCH_CONST_SEARCHTERM:
      console.log("in SEARCH_STATE_SEARCHTERM", action.searchTerm);
      return state.set("SEARCH_STATE_SEARCHTERM", action.searchTerm);
    case SEARCH_CONST_SEARCHTERM_CHANGE:
      console.log("in SEARCH_STATE_SEARCHTERM_CHNAGE", action.event);
      return state
        .set("SEARCH_STATE_SEARCHTERM_CHANGE", action.event)
        .set("SEARCH_STATE_SEARCHTERM", action.event)
        .set("SEARCH_STATE_APIDATA_LOADING", false)
        .set("SEARCH_STATE_APIDATA_ERROR", false);
    case SEARCH_CONST_APIDATA:
      console.log("in SEARCH_CONST_APIDATA action: ", action);
      return state
        .set("SEARCH_STATE_APIDATA_LOADING", true)
        .set("SEARCH_STATE_APIDATA_ERROR", false);
    case SEARCH_CONST_APIDATA_ERROR:
      return state
        .set("SEARCH_STATE_APIDATA_LOADING", false)
        .set("SEARCH_STATE_APIDATA_ERROR", action.error);
    case SEARCH_CONST_APIDATA_SUCCESS:
      console.log(
        "In SEARCH_CONST_APIDATA_SUCCESS reducer, action",
        action.apiData
      );
      return state
        .set("SEARCH_STATE_APIDATA_LOADING", true)
        .set("SEARCH_STATE_APIDATA_ERROR", false)
        .set("SEARCH_STATE_APIDATA", action.apiData);

    default:
      return state;
  }
}

export default searchReducer;
