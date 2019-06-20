/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* MediaLive actions
*
*/

import {
  DEFAULT_ACTION,
  MEDIALIVE_CONST_ADD_AWS_GET,
  MEDIALIVE_CONST_ADD_AWS_GET_SUCCESS,
  MEDIALIVE_CONST_ADD_AWS_GET_ERROR,
  MEDIALIVE_CONST_ADD,
  MEDIALIVE_CONST_ADD_MODEL,
  MEDIALIVE_CONST_ADD_FORM_STRUCTURE,
  MEDIALIVE_CONST_ADD_FORM_INPUT,
  MEDIALIVE_CONST_ADD_FORM_RESET,
  MEDIALIVE_CONST_ADD_POST,
  MEDIALIVE_CONST_ADD_SUCCESS,
  MEDIALIVE_CONST_ADD_ERROR,
  MEDIALIVE_CONST_ADD_AWS_POST,
  MEDIALIVE_CONST_ADD_AWS_SUCCESS,
  MEDIALIVE_CONST_ADD_AWS_ERROR
} from "./constants";

/*
*
* DEFAULT actions MediaLive
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
  * MediaLive ACTIONS ADD
*
*/

/*
 *
  * MediaLive ACTIONS AWS GET
 *
 */
export function mediaLiveActionAWSGet({ model, id = "" }) {
  console.log("in mediaLiveActionAWSGet in ACTION :: model :::", model);
  console.log("in mediaLiveActionAWSGet in ACTION :: id :::", id);
  return {
    type: MEDIALIVE_CONST_ADD_AWS_GET,
    model,
    id
  };
}

export function mediaLiveActionAWSGetError(error) {
  return {
    type: MEDIALIVE_CONST_ADD_AWS_GET_ERROR,
    error
  };
}

export function mediaLiveActionAWSGetSuccess(apiData) {
  console.log(
    "payload received from API yeild in mediaLiveActionAWSGet function in action is",
    apiData
  );
  return {
    type: MEDIALIVE_CONST_ADD_AWS_GET_SUCCESS,
    apiData
  };
}

/*
 *
    * MediaLive ACTIONS ADD MODEL,FORM STRUCTURE AND INITIIAL FORM INPUT
 *
 */
export function mediaLiveActionAdd({ struct, model }) {
  console.log("in mediaLiveActionAdd in ACTION :: struct :::", struct);
  console.log("in mediaLiveActionAdd in ACTION :: model :::", model);
  return {
    type: MEDIALIVE_CONST_ADD,
    struct,
    model
  };
}
/*
 *
    * MediaLive ACTIONS API POST CALL WITH FORM INPUT
 *
 */
export function mediaLiveActionAddPost({ input, model }) {
  console.log("in mediaLiveActionAddPost in ACTION :: input :::", input);
  console.log("in mediaLiveActionAddPost in ACTION :: model :::", model);
  return {
    type: MEDIALIVE_CONST_ADD_POST,
    input,
    model
  };
}

/*
 *
    * MediaLive ACTIONS API CALL ERROR HANDLING
 *
 */
export function mediaLiveActionAddError(error) {
  console.log("in mediaLiveActionAddError in ACTION :: error :::", error);
  return {
    type: MEDIALIVE_CONST_ADD_ERROR,
    error
  };
}
/*
 *
    * MediaLive ACTIONS API CALL SUCCESS CALL BACK FUNCTIONS
 *
 */
export function mediaLiveActionAddSuccess(payload) {
  console.log("in mediaLiveActionAddSuccess in ACTION :: payload :::", payload);
  return {
    type: MEDIALIVE_CONST_ADD_SUCCESS,
    payload
  };
}

/*
 *
    * MediaLive ACTIONS AWS API POST CALL WITH FORM INPUT
 *
 */
export function mediaLiveActionAddAwsPost({ input, model, apiAction = "PRE" }) {
  console.log("in mediaLiveActionAddAwsPost in ACTION :: input :::", input);
  console.log("in mediaLiveActionAddAwsPost in ACTION :: model :::", model);
  console.log(
    "in mediaLiveActionAddAwsPost in ACTION :: mapiAction :::",
    apiAction
  );
  return {
    type: MEDIALIVE_CONST_ADD_AWS_POST,
    input,
    model,
    apiAction
  };
}
/*
 *
    * MediaLive ACTIONS AWS API CALL ERROR HANDLING
 *
 */
export function mediaLiveActionAddAwsError(awsError) {
  console.log(
    "in mediaLiveActionAddAwsError in ACTION :: awsError :::",
    awsError
  );
  return {
    type: MEDIALIVE_CONST_ADD_AWS_ERROR,
    awsError
  };
}

/*
 *
    * MediaLive ACTIONS AWS API CALL SUCCESS CALL BACK FUNCTIONS
 *
 */
export function mediaLiveActionAddAwsSuccess(awsPayload) {
  console.log(
    "in mediaLiveActionAddAwsSuccess in ACTION :: awsPayload :::",
    awsPayload
  );
  return {
    type: MEDIALIVE_CONST_ADD_AWS_SUCCESS,
    awsPayload
  };
}

/*
 *
    * MediaLive ACTIONS FROM INPUT STATE SET
 *
 */
export function mediaLiveActionAddSetFormState(input) {
  console.log(
    "in mediaLiveActionAddSetFormState in ACTION :: input :::",
    input
  );
  return {
    type: MEDIALIVE_CONST_ADD_FORM_INPUT,
    input
  };
}
/*
 *
    * MediaLive ACTIONS FROM INPUT STATE RESET
 *
 */
export function mediaLiveActionAddFormInputReset() {
  console.log(
    "in mediaLiveActionAddFormInputReset in ACTION is called without any parameter"
  );
  return {
    type: MEDIALIVE_CONST_ADD_FORM_RESET
  };
}

// ############# NOT ACTIVE ACTION YET ################
/*
 *
    * MediaLive ACTIONS MODEL CHANGE
 *
 */
export function mediaLiveActionAddChangeModel({ model }) {
  console.log("in mediaLiveActionAddChangeModel in ACTION :: model :::", model);
  return {
    type: MEDIALIVE_CONST_ADD_MODEL,
    model
  };
}
/*
 *
 * MediaLive ACTIONS FORM STRUCTURE SET STATE
 *
 */
export function mediaLiveActionAddFormStructure(data) {
  console.log("in mediaLiveActionAddFormStructure in ACTION :: data :::", data);
  return {
    type: MEDIALIVE_CONST_ADD_FORM_STRUCTURE,
    data
  };
}
// ############# NOT ACTIVE ACTION YET ################
