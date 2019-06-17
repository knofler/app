/* eslint-disable no-console */
/*
*
* BOOK saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  BOOK_CONST_APIDATA,
  BOOK_CONST_CREATE_CHANNEL,
  BOOK_CONST_CREATE_INPUT,
  BOOK_CONST_START_STREAM,
  BOOK_CONST_STOP_STREAM,
} from "./constants";

import {
  bookActionApiDataSuccess,
  bookActionApiDataError,
  bookActionCreateChannelSuccess,
  bookActionCreateChannelError
} from "./actions";

const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = "/api/channels";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

// Load Functions on Event Change

function* bookSagaApiData() {
  yield takeLatest(BOOK_CONST_APIDATA, fetchBookApiData);
}

// Load Functions on Media live change

function* bookSagaCreateChannel() {
  yield takeLatest(BOOK_CONST_CREATE_CHANNEL, fetchBookCreateChannel);
}
function* bookSagaCreateInput() {
  yield takeLatest(BOOK_CONST_CREATE_INPUT, fetchBookCreateInput);
}

function* bookSagaStartStream() {
  yield takeLatest(BOOK_CONST_START_STREAM, fetchBookStartStream);
}

function* bookSagaStopStream() {
  yield takeLatest(BOOK_CONST_STOP_STREAM, fetchBookStopStream);
}

// Fetch Functions for API interaction

function* fetchBookApiData(action) {
  try {
    // BOOK_CONST_API_DATA event action and api call
    console.log("BOOK_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of BOOK_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(bookActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(bookActionApiDataError(error));
  }
}

// Fetch Functions for MEDIA LIVE interaction

function* fetchBookCreateChannel(action) {
  try {
    // BOOK_CONST_CREATE_CHANNEL event action
    console.log(
      "BOOK_CONST_CREATE_CHANNEL constant's action in saga is:: ",
      action
    );
    console.log(
      "BOOK_CONST_CREATE_CHANNEL constant's action.channel in saga is:: ",
      action.channel
    );

    if (action.channel !== undefined) {
      const CreateChannelURL = `${getUrl}/api/create/channel`;
      console.log("CreateChannelURL:", CreateChannelURL);
      const response = yield call(fetch, CreateChannelURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.channel)
      });
      const responseBody = yield response.json();
      console.log(
        "responseBody of BOOK_CONST_CREATE_CHANNEL in saga is",
        responseBody
      );
      if (!responseBody.errors) {
        window.localStorage.setItem(
          "Create-channel",
          JSON.stringify(responseBody)
        );
        yield put(bookActionCreateChannelSuccess(responseBody));
        // socket.emit("add_data", responseBody);
      }
    }
  } catch (error) {
    yield put(bookActionCreateChannelError(error));
  }
}

function* fetchBookCreateInput(action) {
  try {
    // BOOK_CONST_API_DATA event action and api call
    console.log("BOOK_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of BOOK_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(bookActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(bookActionApiDataError(error));
  }
}

function* fetchBookStartStream(action) {
  try {
    // BOOK_CONST_API_DATA event action and api call
    console.log("BOOK_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of BOOK_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(bookActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(bookActionApiDataError(error));
  }
}

function* fetchBookStopStream(action) {
  try {
    // BOOK_CONST_API_DATA event action and api call
    console.log("BOOK_CONST_API_DATA constant's action :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of BOOK_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(bookActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(bookActionApiDataError(error));
  }
}

// Individual exports for testing
export default function* bookSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    bookSagaApiData(),
    bookSagaCreateChannel(),
    bookSagaCreateInput(),
    bookSagaStartStream(),
    bookSagaStopStream(),
  ]);
}
