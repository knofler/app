/*
*
* CHANNEL saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import { CHANNEL_CONST_APIDATA } from "./constants";

import {
  channelActionApiDataSuccess,
  channelActionApiDataError
} from "./actions";

const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = "/api/channels";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

//Load Functions on Event Change

function* channelSagaApiData() {
  yield takeLatest(CHANNEL_CONST_APIDATA, fetchChannelApiData);
}

//Fetch Functions for API interaction

function* fetchChannelApiData(action) {
  try {
    // CHANNEL_CONST_API_DATA event action and api call
    console.log("CHANNEL_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of CHANNEL_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(channelActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(channelActionApiDataError(error));
  }
}

// Individual exports for testing
export default function* channelSaga() {
  // See example in containers/HomePage/saga.js
  yield all([channelSagaApiData()]);
}
