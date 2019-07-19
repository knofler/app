/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* DELETE actions
*
*/

import {
  DEFAULT_ACTION,
  DELETE_CONST_POST,
  DELETE_CONST_POST_SUCCESS,
  DELETE_CONST_POST_ERROR,
  DELETE_CONST_MODEL
} from "./constants";

/*
*
* DEFAULT actions DELETE
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
  * DELETE ACTIONS 
*
*/

/*
 *
    * DELETE ACTIONS API POST CALL WITH FORM INPUT
 *
 */
export function deleteActionPost({ id, model }) {
  console.log("in deleteActionPost in ACTION :: model :::", model);
  return {
    type: DELETE_CONST_POST,
    id,
    model
  };
}
/*
 *
    * DELETE ACTIONS POST API CALL ERROR HANDLING
 *
 */
export function deleteActionPostError(error) {
  console.log("in deleteActionPostError in ACTION :: error :::", error);
  return {
    type: DELETE_CONST_POST_ERROR,
    error
  };
}
/*
 *
    * DELETE ACTIONS POST API CALL SUCCESS CALL BACK FUNCTIONS
 *
 */
export function deleteActionPostSuccess(payload) {
  console.log("in deleteActionPostSuccess in ACTION :: payload :::", payload);
  return {
    type: DELETE_CONST_POST_SUCCESS,
    payload
  };
}

// ############# NOT ACTIVE ACTION YET ################
/*
 *
    * DELETE ACTIONS MODEL CHANGE
 *
 */
export function deleteActionChangeModel({ model }) {
  console.log("in deleteActionChangeModel in ACTION :: model :::", model);
  return {
    type: DELETE_CONST_MODEL,
    model
  };
}
// ############# NOT ACTIVE ACTION YET ################
