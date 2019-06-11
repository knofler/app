/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* UPDATE saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";
import { socket } from "utils/socketio-client";
import { UPDATE_CONST_GET, UPDATE_CONST_POST } from "./constants";
import {
  updateActionGetSuccess,
  updateActionGetError,
  updateActionPostSuccess,
  updateActionPostError
} from "./actions";

const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = "/api/orders";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

// Load Functions on Event Change
function* updateSagaGet() {
  yield takeLatest(UPDATE_CONST_GET, fetchGetUpdate);
}

function* updateSagaPost() {
  yield takeLatest(UPDATE_CONST_POST, fetchPostUpdate);
}

function* fetchGetUpdate(action) {
  try {
    // UPDATE_CONST_GET event action and api call
    console.log("UPDATE_CONST_GET constant's action in saga is:: ", action);
    console.log(
      "UPDATE_CONST_GET constant's action.id in saga is:: ",
      action.id
    );
    console.log(
      "UPDATE_CONST_GET constant's action.model in saga is:: ",
      action.model
    );

    if (action.model !== undefined && action.id !== undefined) {
      const updateUrl = `${getUrl}/api/${action.model}/${action.id}`;
      console.log("updateUrl:", updateUrl);
      // Get update item first
      const updateItem = yield call(fetch, updateUrl);
      const updateBody = yield updateItem.json();
      console.log("updateBody of UPDATE_CONST_GET in saga is", updateBody.data);
      window.localStorage.setItem(
        "update-data-item",
        JSON.stringify(updateBody.data)
      );
      yield put(updateActionGetSuccess(updateBody.data));
    }
  } catch (error) {
    yield put(updateActionGetError(error));
  }
}

function* fetchPostUpdate(action) {
  try {
    // CRUD_CONST_UPDATE event action and api call
    console.log("UPDATE_CONST_POST constant's action in saga is:: ", action);
    console.log(
      "UPDATE_CONST_POST constant's action.id in saga is:: ",
      action.id
    );
    console.log(
      "UPDATE_CONST constant's action.data in saga is:: ",
      action.input
    );
    console.log(
      "UPDATE_CONST_POST constant's action.model in saga is:: ",
      action.model
    );

    if (
      action.input !== undefined &&
      action.model !== undefined &&
      action.id !== undefined
    ) {
      const updateUrl = `${getUrl}/api/${action.model}/${action.id}`;
      console.log("updateUrl:", updateUrl);
      //
      const response = yield call(fetch, updateUrl, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.input)
      });
      const responseBody = yield response.json();
      console.log("responseBody of UPDATE_CONST_POST in saga is", responseBody);
      window.localStorage.setItem("update-data", JSON.stringify(responseBody));
      yield put(updateActionPostSuccess(responseBody));
      socket.emit("update_data", responseBody);
    }
  } catch (error) {
    yield put(updateActionPostError(error));
  }
}

// Individual exports for testing
export default function* updateSaga() {
  // See example in containers/HomePage/saga.js
  yield all([updateSagaGet(), updateSagaPost()]);
}
