/* eslint-disable no-console */
/*
*
* GENAPP actions
*
*/

import {
DEFAULT_ACTION,
GENAPP_CONST_APIDATA,
GENAPP_CONST_APIDATA_SUCCESS,
GENAPP_CONST_APIDATA_ERROR,
} from "./constants";

/*
*
* DEFAULT actions GENAPP
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
 }

/*
*
* API DATA ACTIONS for GENAPP
*
*/

export function genappActionApiData({ model, id = "" }) {
  console.log("in genappActionApiData Action id", id);
  console.log("in genappActionApiData Action model", model);
  return {
    type: GENAPP_CONST_APIDATA,
    model,
    id
  };
}

export function genappActionApiDataError(error) {
  return {
    type: GENAPP_CONST_APIDATA_ERROR,
    error
  };
}

export function genappActionApiDataSuccess(apiData) {
  console.log(
  "payload received from API yeild in genappActionApiData function in action is",
  apiData
  );
  return {
    type: GENAPP_CONST_APIDATA_SUCCESS,
    apiData
  };
}


