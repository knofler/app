/* eslint-disable no-return-assign */
/* eslint-disable no-case-declarations */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
 *
 * UPDATE reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  UPDATE_CONST,
  UPDATE_CONST_GET,
  UPDATE_CONST_GET_ERROR,
  UPDATE_CONST_GET_SUCCESS,
  UPDATE_CONST_POST,
  UPDATE_CONST_POST_ERROR,
  UPDATE_CONST_POST_SUCCESS,
  UPDATE_CONST_FORM_INPUT,
  UPDATE_CONST_FORM_PLACE_HOLDER,
  UPDATE_CONST_FORM_RESET
} from "./constants";

export const initialState = fromJS({
  UPDATE_STATE_ID: "",
  UPDATE_STATE_PAYLOAD: {},
  UPDATE_STATE_SUCCESS: false,
  UPDATE_STATE_ERROR: false,
  UPDATE_STATE_GET_LOADING: false,
  UPDATE_STATE_MODEL: "N0_MODEL",
  UPDATE_STATE_INPUT: {},
  UPDATE_STATE_PLACE_HOLDER: {},
  UPDATE_STATE_FORM_RESET: false,
  UPDATE_STATE_FORM_STRUCTURE: [],
  UPDATE_STATE_POST_LOADING: false
});

function updateReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case UPDATE_CONST:
      console.log("in UPDATE_CONST in REDUCER :: action::: ", action);
      console.log(
        "in UPDATE_CONST in REDUCER :: action.struct ::: ",
        action.struct
      );
      console.log(
        "in UPDATE_CONST in REDUCER :: action.model ::: ",
        action.model
      );
      const userInput = {};
      action.struct.map(each => (userInput[each.name] = ""));
      return state
        .set("UPDATE_STATE_ID", action.id)
        .set("UPDATE_STATE_MODEL", action.model)
        .set("UPDATE_STATE_FORM_STRUCTURE", action.struct)
        .set("UPDATE_STATE_INPUT", userInput);
    case UPDATE_CONST_GET:
      console.log("in UPDATE_CONST_GET in REDUCER :: action::: ", action);
      console.log(
        "in UPDATE_CONST_GET in REDUCER :: action.id ::: ",
        action.id
      );
      console.log(
        "in UPDATE_CONST_GET in REDUCER :: action.model ::: ",
        action.model
      );
      return state
        .set("UPDATE_STATE_GET_LOADING", true)
        .set("UPDATE_STATE_GET_ERROR", false);
    case UPDATE_CONST_GET_ERROR:
      console.log(
        "in UPDATE_CONST_GET_ERROR in REDUCER,:: error ::: ",
        action.error
      );
      return state.set("UPDATE_STATE_GET_ERROR", action.error);
    case UPDATE_CONST_GET_SUCCESS:
      console.log(
        "In UPDATE_CONST_GET_SUCCESS in REDUCER,:: payload :::",
        action.payload
      );
      return state
        .set("UPDATE_STATE_GET_LOADING", false)
        .set("UPDATE_STATE_GET_ERROR", false)
        .set("UPDATE_STATE_GET_SUCCESS", true)
        .set("UPDATE_STATE_PLACE_HOLDER", action.payload);
    case UPDATE_CONST_POST:
      console.log("in UPDATE_CONST_POST in REDUCER :: action::: ", action);
      console.log(
        "in UPDATE_CONST in REDUCER :: action.input ::: ",
        action.input
      );
      console.log(
        "in UPDATE_CONST in REDUCER :: action.model ::: ",
        action.model
      );
      return state
        .set("UPDATE_STATE_INPUT", action.input)
        .set("UPDATE_STATE_POST_LOADING", true)
        .set("UPDATE_STATE_POST_ERROR", false);
    case UPDATE_CONST_POST_ERROR:
      console.log(
        "in UPDATE_CONST_ERROR in REDUCER,:: error ::: ",
        action.error
      );
      return state
        .set("UPDATE_STATE_POST_LOADING", false)
        .set("UPDATE_STATE_POST_ERROR", action.error);
    case UPDATE_CONST_POST_SUCCESS:
      console.log(
        "In UPDATE_CONST_SUCCESS in REDUCER,:: payload :::",
        action.payload
      );
      return state
        .set("UPDATE_STATE_POST_LOADING", false)
        .set("UPDATE_STATE_POST_ERROR", false)
        .set("UPDATE_STATE_POST_SUCCESS", true)
        .set("UPDATE_STATE_PAYLOAD", action.payload);
    case UPDATE_CONST_FORM_INPUT:
      console.log(
        "in UPDATE_CONST_FORM_INPUT in REDUCER :: action::: ",
        action
      );
      console.log(
        "in UPDATE_CONST_FORM_INPUT in REDUCER :: action.input ::: ",
        action.input
      );
      return state
        .set("UPDATE_STATE_INPUT", action.input)
        .set("UPDATE_STATE_ERROR", false);
    case UPDATE_CONST_FORM_PLACE_HOLDER:
      console.log(
        "in UPDATE_CONST_FORM_PLACE_HOLDER in REDUCER :: action::: ",
        action
      );
      console.log(
        "in UPDATE_CONST_FORM_PLACE_HOLDER in REDUCER :: action.placeholder ::: ",
        action.placeholder
      );
      return state
        .set("UPDATE_STATE_PLACE_HOLDER", action.placeholder)
        .set("UPDATE_STATE_LOAD_RETRIEVED", true)
        .set("UPDATE_STATE_ERROR", false);
    case UPDATE_CONST_FORM_RESET:
      console.log(
        "in UPDATE_CONST_FORM_RESET in REDUCER :: action.event ::: ",
        action
      );
      return state
        .set("UPDATE_STATE_INPUT", {})
        .set("UPDATE_STATE_FORM_RESET", true);

    default:
      return state;
  }
}

export default updateReducer;
