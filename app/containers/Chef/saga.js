/*
*
* CHEF saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import { 
  CHEF_CONST_APIDATA,
 } from "./constants";

import {
  chefActionApiDataSuccess,
  chefActionApiDataError,
 } from "./actions";


const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = '/api/chefs';
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

//Load Functions on Event Change

function* chefSagaApiData() {
  yield takeLatest(CHEF_CONST_APIDATA, fetchChefApiData);
}


//Fetch Functions for API interaction

function* fetchChefApiData(action) {
  try {
    // CHEF_CONST_API_DATA event action and api call
    console.log("CHEF_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log("responseBody of CHEF_CONST_API_DATA  in saga is", responseBody);
    yield put(chefActionApiDataSuccess(responseBody.data));
  }catch(error) {
    yield put(chefActionApiDataError(error));
  }
}



// Individual exports for testing
export default function* chefSaga() {
  // See example in containers/HomePage/saga.js
  yield all([chefSagaApiData()]);
}