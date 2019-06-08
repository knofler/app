/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* BOOK actions
*
*/

import {
  DEFAULT_ACTION,
  BOOK_CONST_APIDATA,
  BOOK_CONST_APIDATA_SUCCESS,
  BOOK_CONST_APIDATA_ERROR,
  BOOK_CONST_CREATE_CHANNEL,
  BOOK_CONST_CREATE_CHANNEL_SUCCESS,
  BOOK_CONST_CREATE_CHANNEL_ERROR,
  BOOK_CONST_CREATE_INPUT,
  BOOK_CONST_START_STREAM,
  BOOK_CONST_STOP_STREAM
} from "./constants";

/*
*
* DEFAULT actions BOOK
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
* API DATA ACTIONS for BOOK
*
*/

export function bookActionApiData({ model, id = "" }) {
  console.log("in bookActionApiData Action id", id);
  console.log("in bookActionApiData Action model", model);
  return {
    type: BOOK_CONST_APIDATA,
    model,
    id
  };
}

export function bookActionApiDataError(error) {
  return {
    type: BOOK_CONST_APIDATA_ERROR,
    error
  };
}

export function bookActionApiDataSuccess(apiData) {
  console.log(
    "payload received from API yeild in bookActionApiData function in action is",
    apiData
  );
  return {
    type: BOOK_CONST_APIDATA_SUCCESS,
    apiData
  };
}

/*
 *
  * MEDIA LIVE actions BOOK
 *
 */

/*
  *
    * CREATE CHANNEL actions BOOK
  *
  */

export function bookActionCreateChannel({ channel }) {
  console.log(
    "channel for bookActionCreateChannel function in action is",
    channel
  );
  return {
    type: BOOK_CONST_CREATE_CHANNEL,
    channel
  };
}

export function bookActionCreateChannelError(error) {
  return {
    type: BOOK_CONST_CREATE_CHANNEL_ERROR,
    error
  };
}

export function bookActionCreateChannelSuccess(awsResponse) {
  console.log(
    "awsResponse received from API yeild in bookActionCreateChannel function in action is",
    awsResponse
  );
  return {
    type: BOOK_CONST_CREATE_CHANNEL_SUCCESS,
    awsResponse
  };
}

export function bookActionCreateInput({ input }) {
  console.log("input for bookActionCreateInput function in action is", input);
  return {
    type: BOOK_CONST_CREATE_INPUT,
    input
  };
}

export function bookActionStartStrean({ start }) {
  console.log(
    "start stream for bookActionStartStrean function in action is",
    start
  );
  return {
    type: BOOK_CONST_START_STREAM,
    start
  };
}

export function bookActionStopStream({ stop }) {
  console.log(
    "stop stream for bookActionStopStream function in action is",
    stop
  );
  return {
    type: BOOK_CONST_STOP_STREAM,
    stop
  };
}
