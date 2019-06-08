/*
 *
 * ORDER reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  ORDER_CONST_APIDATA,
  ORDER_CONST_APIDATA_ERROR,
  ORDER_CONST_APIDATA_SUCCESS
} from "./constants";

export const initialState = fromJS({
  ORDER_STATE_APIDATA: [],
  ORDER_STATE_APIDATA_LOADING: false,
  ORDER_STATE_APIDATA_ERROR: false
});

function orderReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case ORDER_CONST_APIDATA:
      console.log("in ORDER_CONST_APIDATA action: ", action);
      return state
        .set("ORDER_STATE_APIDATA_LOADING", true)
        .set("ORDER_STATE_APIDATA_ERROR", false);
    case ORDER_CONST_APIDATA_ERROR:
      return state
        .set("ORDER_STATE_APIDATA_LOADING", false)
        .set("ORDER_STATE_APIDATA_ERROR", action.error);
    case ORDER_CONST_APIDATA_SUCCESS:
      console.log(
        "In ORDER_CONST_APIDATA_SUCCESS reducer, action",
        action.apiData
      );
      return state
        .set("ORDER_STATE_APIDATA_LOADING", true)
        .set("ORDER_STATE_APIDATA_ERROR", false)
        .set("ORDER_STATE_APIDATA", action.apiData);

    default:
      return state;
  }
}

export default orderReducer;
