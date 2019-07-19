/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* DELETE saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";
import { socket } from "utils/socketio-client";
import { DELETE_CONST_POST } from "./constants";
import { deleteActionPostSuccess, deleteActionPostError } from "./actions";

const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = "/api/books";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

// Load Functions on Event Change

function* deleteSagaPost() {
  yield takeLatest(DELETE_CONST_POST, fetchPostDelete);
}

function* fetchPostDelete(action) {
  try {
    // CRUD_CONST_DELETE event action and api call
    console.log("DELETE_CONST_POST constant's action in saga is:: ", action);
    console.log(
      "DELETE_CONST_POST constant's action.id in saga is:: ",
      action.id
    );
    console.log(
      "DELETE_CONST_POST constant's action.model in saga is:: ",
      action.model
    );

    if (action.model !== undefined && action.id !== undefined) {
      const deleteUrl = `${getUrl}/api/${action.model}/${action.id}`;
      console.log("deleteUrl:", deleteUrl);
      //
      const response = yield call(fetch, deleteUrl, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      const responseBody = yield response.json();
      console.log("responseBody of DELETE_CONST_POST in saga is", responseBody);
      window.localStorage.setItem("delete-data", JSON.stringify(responseBody));
      yield put(deleteActionPostSuccess(responseBody));
      socket.emit("delete_data", responseBody);
    }
  } catch (error) {
    yield put(deleteActionPostError(error));
  }
}

// Individual exports for testing
export default function* deleteSaga() {
  // See example in containers/HomePage/saga.js
  yield all([deleteSagaPost()]);
}
