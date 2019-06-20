/* eslint-disable no-return-assign */
/* eslint-disable no-case-declarations */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
 *
 * MEDIALIVE reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  MEDIALIVE_CONST_ADD_AWS_GET,
  MEDIALIVE_CONST_ADD_AWS_GET_SUCCESS,
  MEDIALIVE_CONST_ADD_AWS_GET_ERROR,
  MEDIALIVE_CONST_ADD,
  MEDIALIVE_CONST_ADD_POST,
  MEDIALIVE_CONST_ADD_ERROR,
  MEDIALIVE_CONST_ADD_SUCCESS,
  MEDIALIVE_CONST_ADD_AWS_POST,
  MEDIALIVE_CONST_ADD_AWS_ERROR,
  MEDIALIVE_CONST_ADD_AWS_SUCCESS,
  MEDIALIVE_CONST_ADD_FORM_INPUT,
  MEDIALIVE_CONST_ADD_FORM_RESET
} from "./constants";

export const initialState = fromJS({
  MEDIALIVE_STATE_ADD_PAYLOAD: {},
  MEDIALIVE_STATE_ADD_SUCCESS: false,
  MEDIALIVE_STATE_ADD_ERROR: false,
  MEDIALIVE_STATE_ADD_MODEL: "N0_MODEL",
  MEDIALIVE_STATE_ADD_AWS_GET_PAYLOAD: {},
  MEDIALIVE_STATE_ADD_AWS_GET_SUCCESS: false,
  MEDIALIVE_STATE_ADD_AWS_GET_ERROR: false,
  MEDIALIVE_STATE_ADD_AWS_PAYLOAD: {},
  MEDIALIVE_STATE_ADD_AWS_SUCCESS: false,
  MEDIALIVE_STATE_ADD_AWS_ERROR: false,
  MEDIALIVE_STATE_ADD_INPUT: {},
  MEDIALIVE_STATE_ADD_API_ACTION: "PRE",
  MEDIALIVE_STATE_ADD_FORM_RESET: false,
  MEDIALIVE_STATE_ADD_FORM_STRUCTURE: [],
  MEDIALIVE_STATE_ADD_LOADING: false
});

function mediaLiveReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case MEDIALIVE_CONST_ADD_AWS_GET:
      console.log("in MEDIALIVE_CONST_ADD_AWS_GET action: ", action);
      return state
        .set("MEDIALIVE_STATE_ADD_LOADING", true)
        .set("MEDIALIVE_STATE_ADD_AWS_GET_ERROR", false);
    case MEDIALIVE_CONST_ADD_AWS_GET_ERROR:
      return state
        .set("MEDIALIVE_STATE_ADD_LOADING", false)
        .set("MEDIALIVE_STATE_ADD_AWS_GET_ERROR", action.error);
    case MEDIALIVE_CONST_ADD_AWS_GET_SUCCESS:
      console.log(
        "In MEDIALIVE_CONST_ADD_AWS_GET_SUCCESS reducer, action",
        action.apiData
      );
      return state
        .set("MEDIALIVE_STATE_ADD_LOADING", true)
        .set("MEDIALIVE_STATE_ADD_AWS_GET_ERROR", false)
        .set("MEDIALIVE_STATE_ADD_AWS_GET_PAYLOAD", action.apiData);
    case MEDIALIVE_CONST_ADD:
      console.log("in MEDIALIVE_CONST_ADD in REDUCER :: action::: ", action);
      console.log(
        "in MEDIALIVE_CONST_ADD in REDUCER :: action.struct ::: ",
        action.struct
      );
      console.log(
        "in MEDIALIVE_CONST_ADD in REDUCER :: action.model ::: ",
        action.model
      );
      const userInput = {};
      action.struct.map(each => (userInput[each.name] = ""));
      return state
        .set("MEDIALIVE_STATE_ADD_MODEL", action.model)
        .set("MEDIALIVE_STATE_ADD_FORM_STRUCTURE", action.struct)
        .set("MEDIALIVE_STATE_ADD_INPUT", userInput)
        .set("MEDIALIVE_STATE_ADD_ERROR", false);
    case MEDIALIVE_CONST_ADD_POST:
      console.log(
        "in MEDIALIVE_CONST_ADD_POST in REDUCER :: action::: ",
        action
      );
      console.log(
        "in MEDIALIVE_CONST_ADD in REDUCER :: action.input ::: ",
        action.input
      );
      console.log(
        "in MEDIALIVE_CONST_ADD in REDUCER :: action.model ::: ",
        action.model
      );
      return state
        .set("MEDIALIVE_STATE_ADD_MODEL", action.model)
        .set("MEDIALIVE_STATE_ADD_INPUT", action.input)
        .set("MEDIALIVE_STATE_ADD_LOADING", true)
        .set("MEDIALIVE_STATE_ADD_ERROR", false);
    case MEDIALIVE_CONST_ADD_ERROR:
      console.log(
        "in MEDIALIVE_CONST_ADD_ERROR in REDUCER,:: error ::: ",
        action.error
      );
      return state
        .set("MEDIALIVE_STATE_ADD_LOADING", false)
        .set("MEDIALIVE_STATE_ADD_ERROR", action.error);
    case MEDIALIVE_CONST_ADD_SUCCESS:
      console.log(
        "In MEDIALIVE_CONST_ADD_SUCCESS in REDUCER,:: payload :::",
        action.payload
      );
      return state
        .set("MEDIALIVE_STATE_ADD_LOADING", false)
        .set("MEDIALIVE_STATE_ADD_ERROR", false)
        .set("MEDIALIVE_STATE_ADD_SUCCESS", true)
        .set("MEDIALIVE_STATE_ADD_PAYLOAD", action.payload);
    case MEDIALIVE_CONST_ADD_AWS_POST:
      console.log(
        "in MEDIALIVE_CONST_ADD_AWS_POST in REDUCER :: action::: ",
        action
      );
      console.log(
        "in MEDIALIVE_CONST_ADD_AWS_POST in REDUCER :: action.input ::: ",
        action.input
      );
      console.log(
        "in MEDIALIVE_CONST_ADD_AWS_POST in REDUCER :: action.model ::: ",
        action.model
      );
      console.log(
        "in MEDIALIVE_CONST_ADD_AWS_POST in REDUCER :: action.apiAction ::: ",
        action.apiAction
      );
      return state
        .set("MEDIALIVE_STATE_ADD_MODEL", action.model)
        .set("MEDIALIVE_STATE_ADD_INPUT", action.input)
        .set("MEDIALIVE_STATE_ADD_API_ACTION", action.apiAction)
        .set("MEDIALIVE_STATE_ADD_LOADING", true)
        .set("MEDIALIVE_STATE_ADD_ERROR", false)
        .set("MEDIALIVE_STATE_ADD_AWS_ERROR", false);
    case MEDIALIVE_CONST_ADD_AWS_ERROR:
      console.log(
        "in MEDIALIVE_CONST_ADD_AWS_ERROR in REDUCER,:: error ::: ",
        action.error
      );
      return state
        .set("MEDIALIVE_STATE_ADD_LOADING", false)
        .set("MEDIALIVE_STATE_ADD_AWS_ERROR", action.awsError)
        .set("MEDIALIVE_STATE_ADD_ERROR", action.error);
    case MEDIALIVE_CONST_ADD_AWS_SUCCESS:
      console.log(
        "In MEDIALIVE_CONST_ADD_AWS_SUCCESS in REDUCER,:: payload :::",
        action.payload
      );
      return state
        .set("MEDIALIVE_STATE_ADD_LOADING", false)
        .set("MEDIALIVE_STATE_ADD_AWS_ERROR", false)
        .set("MEDIALIVE_STATE_ADD_AWS_SUCCESS", true)
        .set("MEDIALIVE_STATE_ADD_AWS_PAYLOAD", action.awsPayload);
    case MEDIALIVE_CONST_ADD_FORM_INPUT:
      console.log(
        "in MEDIALIVE_CONST_ADD_FORM_INPUT in REDUCER :: action::: ",
        action
      );
      console.log(
        "in MEDIALIVE_CONST_ADD_FORM_INPUT in REDUCER :: action.input ::: ",
        action.input
      );
      return state
        .set("MEDIALIVE_STATE_ADD_INPUT", action.input)
        .set("MEDIALIVE_STATE_ADD_LOADING", true)
        .set("MEDIALIVE_STATE_ADD_ERROR", false)
        .set("MEDIALIVE_STATE_ADD_AWS_ERROR", false);

    case MEDIALIVE_CONST_ADD_FORM_RESET:
      console.log(
        "in MEDIALIVE_CONST_ADD_FORM_RESET in REDUCER :: action.event ::: ",
        action
      );
      return state
        .set("MEDIALIVE_STATE_ADD_INPUT", {})
        .set("MEDIALIVE_STATE_ADD_FORM_RESET", true);

    default:
      return state;
  }
}

export default mediaLiveReducer;
