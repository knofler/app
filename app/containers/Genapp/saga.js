/*
*
* GENAPP saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import { 
  GENAPP_CONST_APIDATA,
 } from "./constants";

import {
  genappActionApiDataSuccess,
  genappActionApiDataError,
 } from "./actions";


const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = '/api/genapps';
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

//Load Functions on Event Change

function* genappSagaApiData() {
  yield takeLatest(GENAPP_CONST_APIDATA, fetchGenappApiData);
}


//Fetch Functions for API interaction

function* fetchGenappApiData(action) {
  try {
    // GENAPP_CONST_API_DATA event action and api call
    console.log("GENAPP_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log("responseBody of GENAPP_CONST_API_DATA  in saga is", responseBody);
    yield put(genappActionApiDataSuccess(responseBody.data));
  }catch(error) {
    yield put(genappActionApiDataError(error));
  }
}



// Individual exports for testing
export default function* genappSaga() {
  // See example in containers/HomePage/saga.js
  yield all([genappSagaApiData()]);
}