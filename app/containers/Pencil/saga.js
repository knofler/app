/*
*
* PENCIL saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import { 
  PENCIL_CONST_APIDATA,
 } from "./constants";

import {
  pencilActionApiDataSuccess,
  pencilActionApiDataError,
 } from "./actions";


const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = '/api/pencils';
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

//Load Functions on Event Change

function* pencilSagaApiData() {
  yield takeLatest(PENCIL_CONST_APIDATA, fetchPencilApiData);
}


//Fetch Functions for API interaction

function* fetchPencilApiData(action) {
  try {
    // PENCIL_CONST_API_DATA event action and api call
    console.log("PENCIL_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log("responseBody of PENCIL_CONST_API_DATA  in saga is", responseBody);
    yield put(pencilActionApiDataSuccess(responseBody.data));
  }catch(error) {
    yield put(pencilActionApiDataError(error));
  }
}



// Individual exports for testing
export default function* pencilSaga() {
  // See example in containers/HomePage/saga.js
  yield all([pencilSagaApiData()]);
}