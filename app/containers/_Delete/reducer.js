/* eslint-disable no-return-assign */
/* eslint-disable no-case-declarations */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
 *
 * DELETE reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  DELETE_CONST_POST,
  DELETE_CONST_POST_ERROR,
  DELETE_CONST_POST_SUCCESS
} from "./constants";

export const initialState = fromJS({
  DELETE_STATE_ID: "",
  DELETE_STATE_PAYLOAD: {},
  DELETE_STATE_SUCCESS: false,
  DELETE_STATE_ERROR: false,
  DELETE_STATE_GET_LOADING: false,
  DELETE_STATE_MODEL: "N0_MODEL",
  DELETE_STATE_POST_LOADING: false
});

function deleteReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case DELETE_CONST_POST:
      console.log("in DELETE_CONST_POST in REDUCER :: action::: ", action);
      console.log(
        "in DELETE_CONST in REDUCER :: action.model ::: ",
        action.model
      );
      return state
        .set("DELETE_STATE_POST_LOADING", true)
        .set("DELETE_STATE_POST_ERROR", false);
    case DELETE_CONST_POST_ERROR:
      console.log(
        "in DELETE_CONST_ERROR in REDUCER,:: error ::: ",
        action.error
      );
      return state
        .set("DELETE_STATE_POST_LOADING", false)
        .set("DELETE_STATE_POST_ERROR", action.error);
    case DELETE_CONST_POST_SUCCESS:
      console.log(
        "In DELETE_CONST_SUCCESS in REDUCER,:: payload :::",
        action.payload
      );
      return state
        .set("DELETE_STATE_POST_LOADING", false)
        .set("DELETE_STATE_POST_ERROR", false)
        .set("DELETE_STATE_POST_SUCCESS", true)
        .set("DELETE_STATE_PAYLOAD", action.payload);

    default:
      return state;
  }
}

export default deleteReducer;
