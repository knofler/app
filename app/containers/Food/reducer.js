/*
 *
 * FOOD reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  FOOD_CONST_APIDATA,
  FOOD_CONST_APIDATA_ERROR,
  FOOD_CONST_APIDATA_SUCCESS
} from "./constants";

export const initialState = fromJS({
  FOOD_STATE_APIDATA: [],
  FOOD_STATE_APIDATA_LOADING: false,
  FOOD_STATE_APIDATA_ERROR: false
});

function foodReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FOOD_CONST_APIDATA:
      console.log("in FOOD_CONST_APIDATA action: ", action);
      return state
        .set("FOOD_STATE_APIDATA_LOADING", true)
        .set("FOOD_STATE_APIDATA_ERROR", false);
    case FOOD_CONST_APIDATA_ERROR:
      return state
        .set("FOOD_STATE_APIDATA_LOADING", false)
        .set("FOOD_STATE_APIDATA_ERROR", action.error);
    case FOOD_CONST_APIDATA_SUCCESS:
      console.log(
        "In FOOD_CONST_APIDATA_SUCCESS reducer, action",
        action.apiData
      );
      return state
        .set("FOOD_STATE_APIDATA_LOADING", true)
        .set("FOOD_STATE_APIDATA_ERROR", false)
        .set("FOOD_STATE_APIDATA", action.apiData);

    default:
      return state;
  }
}

export default foodReducer;
