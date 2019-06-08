/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* CREATE saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";
import { socket } from "utils/socketio-client";
import { CREATE_CONST_ADD_POST } from "./constants";

import { createActionAddSuccess, createActionAddError } from "./actions";

const herokuAPIURL = "https://mernaircanteen.herokuapp.com";
const model = "/api/orders";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

// Load Functions on Event Change

function* createSagaAdd() {
  yield takeLatest(CREATE_CONST_ADD_POST, fetchCreateAdd);
}

function* fetchCreateAdd(action) {
  try {
    // CRUD_CONST_CREATE event action and api call
    console.log(
      "CREATE_CONST_ADD_POST constant's action in saga is:: ",
      action
    );
    console.log(
      "CREATE_CONST_ADD constant's action.data in saga is:: ",
      action.input
    );
    console.log(
      "CREATE_CONST_ADD_POST constant's action.model in saga is:: ",
      action.model
    );

    if (action.input !== undefined && action.model !== undefined) {
      const CreateUrl = `${getUrl}/api/${action.model}`;
      console.log("CreateUrl:", CreateUrl);
      const response = yield call(fetch, CreateUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.input)
      });
      const responseBody = yield response.json();
      console.log(
        "responseBody of CREATE_CONST_ADD_POST in saga is",
        responseBody
      );
      if (!responseBody.errors) {
        window.localStorage.setItem(
          "Create-data",
          JSON.stringify(responseBody)
        );
        yield put(createActionAddSuccess(responseBody));
        socket.emit("add_data", responseBody);
      }
    }
  } catch (error) {
    yield put(createActionAddError(error));
  }
}

// Individual exports for testing
export default function* createSaga() {
  // See example in containers/HomePage/saga.js
  yield all([createSagaAdd()]);
}
