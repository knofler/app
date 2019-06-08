/*
*
* SEARCH saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import { SEARCH_CONST_APIDATA } from "./constants";

import {
  searchActionApiDataSuccess,
  searchActionApiDataError
} from "./actions";

const herokuAPIURL = "https://mernaircanteen.herokuapp.com";
const model = "/api/foods";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

// Load Functions on Event Change

function* searchSagaApiData() {
  yield takeLatest(SEARCH_CONST_APIDATA, fetchSearchApiData);
}

// Fetch Functions for API interaction

function* fetchSearchApiData(action) {
  try {
    // SEARCH_CONST_API_DATA event action and api call
    console.log("SEARCH_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of SEARCH_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(searchActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(searchActionApiDataError(error));
  }
}

// Individual exports for testing
export default function* searchSaga() {
  // See example in containers/HomePage/saga.js
  yield all([searchSagaApiData()]);
}
