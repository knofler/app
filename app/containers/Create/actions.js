/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* CREATE actions
*
*/

import {
  DEFAULT_ACTION,
  CREATE_CONST_ADD,
  CREATE_CONST_ADD_POST,
  CREATE_CONST_ADD_SUCCESS,
  CREATE_CONST_ADD_ERROR,
  CREATE_CONST_ADD_MODEL,
  CREATE_CONST_ADD_FORM_STRUCTURE,
  CREATE_CONST_ADD_FORM_INPUT,
  CREATE_CONST_ADD_FORM_RESET
} from "./constants";

/*
*
* DEFAULT actions CREATE
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
  * CREATE ACTIONS ADD
*
*/

/*
 *
    * CREATE ACTIONS ADD MODEL,FORM STRUCTURE AND INITIIAL FORM INPUT
 *
 */
export function createActionAdd({ struct, model }) {
  console.log("in createActionAdd in ACTION :: struct :::", struct);
  console.log("in createActionAdd in ACTION :: model :::", model);
  return {
    type: CREATE_CONST_ADD,
    struct,
    model
  };
}
/*
 *
    * CREATE ACTIONS API POST CALL WITH FORM INPUT
 *
 */
export function createActionAddPost({ input, model }) {
  console.log("in createActionAddPost in ACTION :: input :::", input);
  console.log("in createActionAddPost in ACTION :: model :::", model);
  return {
    type: CREATE_CONST_ADD_POST,
    input,
    model
  };
}
/*
 *
    * CREATE ACTIONS API CALL ERROR HANDLING
 *
 */
export function createActionAddError(error) {
  console.log("in createActionAddError in ACTION :: error :::", error);
  return {
    type: CREATE_CONST_ADD_ERROR,
    error
  };
}
/*
 *
    * CREATE ACTIONS API CALL SUCCESS CALL BACK FUNCTIONS
 *
 */
export function createActionAddSuccess(payload) {
  console.log("in createActionAddSuccess in ACTION :: payload :::", payload);
  return {
    type: CREATE_CONST_ADD_SUCCESS,
    payload
  };
}
/*
 *
    * CREATE ACTIONS FROM INPUT STATE SET
 *
 */
export function createActionAddSetFormState(input) {
  console.log("in createActionAddSetFormState in ACTION :: input :::", input);
  return {
    type: CREATE_CONST_ADD_FORM_INPUT,
    input
  };
}
/*
 *
    * CREATE ACTIONS FROM INPUT STATE RESET
 *
 */
export function createActionAddFormInputReset() {
  console.log(
    "in createActionAddFormInputReset in ACTION is called without any parameter"
  );
  return {
    type: CREATE_CONST_ADD_FORM_RESET
  };
}

// ############# NOT ACTIVE ACTION YET ################
/*
 *
    * CREATE ACTIONS MODEL CHANGE
 *
 */
export function createActionAddChangeModel({ model }) {
  console.log("in createActionAddChangeModel in ACTION :: model :::", model);
  return {
    type: CREATE_CONST_ADD_MODEL,
    model
  };
}
/*
 *
 * CREATE ACTIONS FORM STRUCTURE SET STATE
 *
 */
export function createActionAddFormStructure(data) {
  console.log("in createActionAddFormStructure in ACTION :: data :::", data);
  return {
    type: CREATE_CONST_ADD_FORM_STRUCTURE,
    data
  };
}
// ############# NOT ACTIVE ACTION YET ################
