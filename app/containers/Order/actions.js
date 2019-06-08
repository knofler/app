/* eslint-disable no-console */
/*
*
* ORDER actions
*
*/

import {
  DEFAULT_ACTION,
  ORDER_CONST_APIDATA,
  ORDER_CONST_APIDATA_SUCCESS,
  ORDER_CONST_APIDATA_ERROR
} from "./constants";

/*
*
* DEFAULT actions ORDER
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
* API DATA ACTIONS for ORDER
*
*/

export function orderActionApiData({ model, id = "" }) {
  console.log("in orderActionApiData Action id", id);
  console.log("in orderActionApiData Action model", model);
  return {
    type: ORDER_CONST_APIDATA,
    model,
    id
  };
}

export function orderActionApiDataError(error) {
  return {
    type: ORDER_CONST_APIDATA_ERROR,
    error
  };
}

export function orderActionApiDataSuccess(apiData) {
  console.log(
    "payload received from API yeild in orderActionApiData function in action is",
    apiData
  );
  return {
    type: ORDER_CONST_APIDATA_SUCCESS,
    apiData
  };
}
