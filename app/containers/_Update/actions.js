/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* UPDATE actions
*
*/

import {
  DEFAULT_ACTION,
  UPDATE_CONST,
  UPDATE_CONST_GET,
  UPDATE_CONST_GET_SUCCESS,
  UPDATE_CONST_GET_ERROR,
  UPDATE_CONST_POST,
  UPDATE_CONST_POST_SUCCESS,
  UPDATE_CONST_POST_ERROR,
  UPDATE_CONST_MODEL,
  UPDATE_CONST_FORM_STRUCTURE,
  UPDATE_CONST_FORM_INPUT,
  UPDATE_CONST_FORM_PLACE_HOLDER,
  UPDATE_CONST_FORM_RESET
} from "./constants";

/*
*
* DEFAULT actions UPDATE
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
  * UPDATE ACTIONS 
*
*/

/*
 *
    * UPDATE ACTIONS  ID,MODEL,FORM STRUCTURE
 *
 */
export function updateAction({ id, struct, model }) {
  console.log("in updateAction in ACTION :: id :::", id);
  console.log("in updateAction in ACTION :: struct :::", struct);
  console.log("in updateAction in ACTION :: model :::", model);
  return {
    type: UPDATE_CONST,
    id,
    struct,
    model
  };
}
/*
 *
 * UPDATE ACTIONS  API GET WITH ID FOR PLACEHOLDER
 *
 */
export function updateActionGet({ id, model }) {
  console.log("in updateAction in ACTION :: id :::", id);
  console.log("in updateAction in ACTION :: model :::", model);
  return {
    type: UPDATE_CONST_GET,
    id,
    model
  };
}
/*
 *
 * UPDATE ACTIONS GET API CALL ERROR HANDLING
 *
 */
export function updateActionGetError(error) {
  console.log("in updateActionGetError in ACTION :: error :::", error);
  return {
    type: UPDATE_CONST_GET_ERROR,
    error
  };
}
/*
 *
 * UPDATE ACTIONS GET API CALL SUCCESS CALL BACK FUNCTIONS
 *
 */
export function updateActionGetSuccess(payload) {
  console.log("in updateActionGetSuccess in ACTION :: payload :::", payload);
  return {
    type: UPDATE_CONST_GET_SUCCESS,
    payload
  };
}
/*
 *
    * UPDATE ACTIONS API POST CALL WITH FORM INPUT
 *
 */
export function updateActionPost({ id, input, model }) {
  console.log("in updateActionPost in ACTION :: input :::", input);
  console.log("in updateActionPost in ACTION :: model :::", model);
  return {
    type: UPDATE_CONST_POST,
    id,
    input,
    model
  };
}
/*
 *
    * UPDATE ACTIONS POST API CALL ERROR HANDLING
 *
 */
export function updateActionPostError(error) {
  console.log("in updateActionPostError in ACTION :: error :::", error);
  return {
    type: UPDATE_CONST_POST_ERROR,
    error
  };
}
/*
 *
    * UPDATE ACTIONS POST API CALL SUCCESS CALL BACK FUNCTIONS
 *
 */
export function updateActionPostSuccess(payload) {
  console.log("in updateActionPostSuccess in ACTION :: payload :::", payload);
  return {
    type: UPDATE_CONST_POST_SUCCESS,
    payload
  };
}
/*
 *
    * UPDATE ACTIONS FROM INPUT STATE SET
 *
 */
export function updateActionSetFormState(input) {
  console.log("in updateActionSetFormState in ACTION :: input :::", input);
  return {
    type: UPDATE_CONST_FORM_INPUT,
    input
  };
}
/*
 *
 * UPDATE ACTIONS FROM PLACE HOLDER STATE SET
 *
 */
export function updateActionSetPlaceHolder(placeholder) {
  console.log(
    "in updateActionSetPlaceHolder in ACTION :: placeholder :::",
    placeholder
  );
  return {
    type: UPDATE_CONST_FORM_PLACE_HOLDER,
    placeholder
  };
}
/*
 *
    * UPDATE ACTIONS FROM INPUT STATE RESET
 *
 */
export function updateActionFormInputReset() {
  console.log(
    "in updateActionFormInputReset in ACTION is called without any parameter"
  );
  return {
    type: UPDATE_CONST_FORM_RESET
  };
}

// ############# NOT ACTIVE ACTION YET ################
/*
 *
    * UPDATE ACTIONS MODEL CHANGE
 *
 */
export function updateActionChangeModel({ model }) {
  console.log("in updateActionChangeModel in ACTION :: model :::", model);
  return {
    type: UPDATE_CONST_MODEL,
    model
  };
}
/*
 *
 * UPDATE ACTIONS FORM STRUCTURE SET STATE
 *
 */
export function updateActionFormStructure(data) {
  console.log("in updateActionFormStructure in ACTION :: data :::", data);
  return {
    type: UPDATE_CONST_FORM_STRUCTURE,
    data
  };
}
// ############# NOT ACTIVE ACTION YET ################
