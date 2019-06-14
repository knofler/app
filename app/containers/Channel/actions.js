/* eslint-disable no-console */
/*
*
* CHANNEL actions
*
*/

import {
  DEFAULT_ACTION,
  CHANNEL_CONST_APIDATA,
  CHANNEL_CONST_APIDATA_SUCCESS,
  CHANNEL_CONST_APIDATA_ERROR
} from "./constants";

/*
*
* DEFAULT actions CHANNEL
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
* API DATA ACTIONS for CHANNEL
*
*/

export function channelActionApiData({ model, id = "" }) {
  console.log("in channelActionApiData Action id", id);
  console.log("in channelActionApiData Action model", model);
  return {
    type: CHANNEL_CONST_APIDATA,
    model,
    id
  };
}

export function channelActionApiDataError(error) {
  return {
    type: CHANNEL_CONST_APIDATA_ERROR,
    error
  };
}

export function channelActionApiDataSuccess(apiData) {
  console.log(
    "payload received from API yeild in channelActionApiData function in action is",
    apiData
  );
  return {
    type: CHANNEL_CONST_APIDATA_SUCCESS,
    apiData
  };
}
