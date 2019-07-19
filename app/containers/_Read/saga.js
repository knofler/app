/*
*
* READ saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import { READ_CONST_APIDATA } from "./constants";

import { readActionApiDataSuccess, readActionApiDataError } from "./actions";

const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = "/api/orders";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

//Load Functions on Event Change

function* readSagaApiData() {
  yield takeLatest(READ_CONST_APIDATA, fetchReadApiData);
}

//Fetch Functions for API interaction

function* fetchReadApiData(action) {
  try {
    // READ_CONST_API_DATA event action and api call
    console.log("READ_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of READ_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(readActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(readActionApiDataError(error));
  }
}

// Individual exports for testing
export default function* readSaga() {
  // See example in containers/HomePage/saga.js
  yield all([readSagaApiData()]);
}
