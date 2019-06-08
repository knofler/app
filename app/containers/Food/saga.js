/*
*
* FOOD saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import { FOOD_CONST_APIDATA } from "./constants";

import { foodActionApiDataSuccess, foodActionApiDataError } from "./actions";

const herokuAPIURL = "https://mernaircanteen.herokuapp.com";
const model = "/api/foods";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

//Load Functions on Event Change

function* foodSagaApiData() {
  yield takeLatest(FOOD_CONST_APIDATA, fetchFoodApiData);
}

//Fetch Functions for API interaction

function* fetchFoodApiData(action) {
  try {
    // FOOD_CONST_API_DATA event action and api call
    console.log("FOOD_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of FOOD_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(foodActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(foodActionApiDataError(error));
  }
}

// Individual exports for testing
export default function* foodSaga() {
  // See example in containers/HomePage/saga.js
  yield all([foodSagaApiData()]);
}
