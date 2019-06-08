/* eslint-disable no-console */
/*
*
* READ actions
*
*/

import {
  DEFAULT_ACTION,
  READ_CONST_APIDATA,
  READ_CONST_APIDATA_SUCCESS,
  READ_CONST_APIDATA_ERROR
} from "./constants";

/*
*
* DEFAULT actions READ
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
* API DATA ACTIONS for READ
*
*/

export function readActionApiData({ model, id = "" }) {
  console.log("in readActionApiData Action id", id);
  console.log("in readActionApiData Action model", model);
  return {
    type: READ_CONST_APIDATA,
    model,
    id
  };
}

export function readActionApiDataError(error) {
  return {
    type: READ_CONST_APIDATA_ERROR,
    error
  };
}

export function readActionApiDataSuccess(apiData) {
  console.log(
    "payload received from API yeild in readActionApiData function in action is",
    apiData
  );
  return {
    type: READ_CONST_APIDATA_SUCCESS,
    apiData
  };
}
