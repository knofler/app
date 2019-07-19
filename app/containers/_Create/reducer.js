/* eslint-disable no-return-assign */
/* eslint-disable no-case-declarations */
/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
 *
 * CREATE reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  CREATE_CONST_ADD,
  CREATE_CONST_ADD_POST,
  CREATE_CONST_ADD_ERROR,
  CREATE_CONST_ADD_SUCCESS,
  CREATE_CONST_ADD_AWS_POST,
  CREATE_CONST_ADD_AWS_ERROR,
  CREATE_CONST_ADD_AWS_SUCCESS,
  CREATE_CONST_ADD_FORM_INPUT,
  CREATE_CONST_ADD_FORM_RESET
} from "./constants";

export const initialState = fromJS({
  CREATE_STATE_ADD_PAYLOAD: {},
  CREATE_STATE_ADD_SUCCESS: false,
  CREATE_STATE_ADD_ERROR: false,
  CREATE_STATE_ADD_MODEL: "N0_MODEL",
  CREATE_STATE_ADD_AWS_PAYLOAD: {},
  CREATE_STATE_ADD_AWS_SUCCESS: false,
  CREATE_STATE_ADD_AWS_ERROR: false,
  CREATE_STATE_AWS_MODEL: "N0_MODEL",
  CREATE_STATE_ADD_INPUT: {},
  CREATE_STATE_ADD_FORM_RESET: false,
  CREATE_STATE_ADD_FORM_STRUCTURE: [],
  CREATE_STATE_ADD_LOADING: false
});

function createReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CREATE_CONST_ADD:
      console.log("in CREATE_CONST_ADD in REDUCER :: action::: ", action);
      console.log(
        "in CREATE_CONST_ADD in REDUCER :: action.struct ::: ",
        action.struct
      );
      console.log(
        "in CREATE_CONST_ADD in REDUCER :: action.model ::: ",
        action.model
      );
      const userInput = {};
      action.struct.map(each => (userInput[each.name] = ""));
      return state
        .set("CREATE_STATE_ADD_MODEL", action.model)
        .set("CREATE_STATE_ADD_FORM_STRUCTURE", action.struct)
        .set("CREATE_STATE_ADD_INPUT", userInput)
        .set("CREATE_STATE_ADD_ERROR", false);
    case CREATE_CONST_ADD_POST:
      console.log("in CREATE_CONST_ADD_POST in REDUCER :: action::: ", action);
      console.log(
        "in CREATE_CONST_ADD in REDUCER :: action.input ::: ",
        action.input
      );
      console.log(
        "in CREATE_CONST_ADD in REDUCER :: action.model ::: ",
        action.model
      );
      return state
        .set("CREATE_STATE_ADD_MODEL", action.model)
        .set("CREATE_STATE_ADD_INPUT", action.input)
        .set("CREATE_STATE_ADD_LOADING", true)
        .set("CREATE_STATE_ADD_ERROR", false);
    case CREATE_CONST_ADD_ERROR:
      console.log(
        "in CREATE_CONST_ADD_ERROR in REDUCER,:: error ::: ",
        action.error
      );
      return state
        .set("CREATE_STATE_ADD_LOADING", false)
        .set("CREATE_STATE_ADD_ERROR", action.error);
    case CREATE_CONST_ADD_SUCCESS:
      console.log(
        "In CREATE_CONST_ADD_SUCCESS in REDUCER,:: payload :::",
        action.payload
      );
      return state
        .set("CREATE_STATE_ADD_LOADING", false)
        .set("CREATE_STATE_ADD_ERROR", false)
        .set("CREATE_STATE_ADD_SUCCESS", true)
        .set("CREATE_STATE_ADD_PAYLOAD", action.payload);
    case CREATE_CONST_ADD_AWS_POST:
      console.log("in CREATE_CONST_ADD_AWS_POST in REDUCER :: action::: ", action);
      console.log(
        "in CREATE_CONST_ADD_AWS_POST in REDUCER :: action.input ::: ",
        action.input
      );
      console.log(
        "in CREATE_CONST_ADD_AWS_POST in REDUCER :: action.model ::: ",
        action.model
      );
      console.log(
        "in CREATE_CONST_ADD_AWS_POST in REDUCER :: action.awsModel ::: ",
        action.awsModel
      );
      return state
        .set("CREATE_STATE_ADD_MODEL", action.model)
        .set("CREATE_STATE_ADD_AWS_MODEL", action.awsModel)
        .set("CREATE_STATE_ADD_INPUT", action.input)
        .set("CREATE_STATE_ADD_LOADING", true)
        .set("CREATE_STATE_ADD_ERROR", false)
        .set("CREATE_STATE_ADD_AWS_ERROR", false);
    case CREATE_CONST_ADD_AWS_ERROR:
      console.log(
        "in CREATE_CONST_ADD_AWS_ERROR in REDUCER,:: error ::: ",
        action.error
      );
      return state
        .set("CREATE_STATE_ADD_LOADING", false)
        .set("CREATE_STATE_ADD_AWS_ERROR", action.awsError)
        .set("CREATE_STATE_ADD_ERROR", action.error);
    case CREATE_CONST_ADD_AWS_SUCCESS:
      console.log(
        "In CREATE_CONST_ADD_AWS_SUCCESS in REDUCER,:: payload :::",
        action.payload
      );
      return state
        .set("CREATE_STATE_ADD_LOADING", false)
        .set("CREATE_STATE_ADD_AWS_ERROR", false)
        .set("CREATE_STATE_ADD_AWS_SUCCESS", true)
        .set("CREATE_STATE_ADD_AWS_PAYLOAD", action.awsPayload);
    case CREATE_CONST_ADD_FORM_INPUT:
      console.log(
        "in CREATE_CONST_ADD_FORM_INPUT in REDUCER :: action::: ",
        action
      );
      console.log(
        "in CREATE_CONST_ADD_FORM_INPUT in REDUCER :: action.input ::: ",
        action.input
      );
      return state
        .set("CREATE_STATE_ADD_INPUT", action.input)
        .set("CREATE_STATE_ADD_LOADING", true)
        .set("CREATE_STATE_ADD_ERROR", false)
        .set("CREATE_STATE_ADD_AWS_ERROR", false);

    case CREATE_CONST_ADD_FORM_RESET:
      console.log(
        "in CREATE_CONST_ADD_FORM_RESET in REDUCER :: action.event ::: ",
        action
      );
      return state
        .set("CREATE_STATE_ADD_INPUT", {})
        .set("CREATE_STATE_ADD_FORM_RESET", true);

    default:
      return state;
  }
}

export default createReducer;
