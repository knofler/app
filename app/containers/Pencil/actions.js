/* eslint-disable no-console */
/*
*
* PENCIL actions
*
*/

import {
DEFAULT_ACTION,
PENCIL_CONST_APIDATA,
PENCIL_CONST_APIDATA_SUCCESS,
PENCIL_CONST_APIDATA_ERROR,
} from "./constants";

/*
*
* DEFAULT actions PENCIL
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
 }

/*
*
* API DATA ACTIONS for PENCIL
*
*/

export function pencilActionApiData({ model, id = "" }) {
  console.log("in pencilActionApiData Action id", id);
  console.log("in pencilActionApiData Action model", model);
  return {
    type: PENCIL_CONST_APIDATA,
    model,
    id
  };
}

export function pencilActionApiDataError(error) {
  return {
    type: PENCIL_CONST_APIDATA_ERROR,
    error
  };
}

export function pencilActionApiDataSuccess(apiData) {
  console.log(
  "payload received from API yeild in pencilActionApiData function in action is",
  apiData
  );
  return {
    type: PENCIL_CONST_APIDATA_SUCCESS,
    apiData
  };
}


