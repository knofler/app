/*
*
* ORDER saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import { ORDER_CONST_APIDATA } from "./constants";

import { orderActionApiDataSuccess, orderActionApiDataError } from "./actions";

const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = "/api/orders";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

//Load Functions on Event Change

function* orderSagaApiData() {
  yield takeLatest(ORDER_CONST_APIDATA, fetchOrderApiData);
}

//Fetch Functions for API interaction

function* fetchOrderApiData(action) {
  try {
    // ORDER_CONST_API_DATA event action and api call
    console.log("ORDER_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of ORDER_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(orderActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(orderActionApiDataError(error));
  }
}

// Individual exports for testing
export default function* orderSaga() {
  // See example in containers/HomePage/saga.js
  yield all([orderSagaApiData()]);
}
