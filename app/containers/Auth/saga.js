/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  AUTH_CONST_APIDATA,
  AUTH_CONST_SIGNIN,
  AUTH_CONST_SIGNUP,
} from "./constants";

import {
  authActionApiDataSuccess,
  authActionApiDataError,
  authActionSigninSuccess,
  authActionSigninError,
  authActionSignupSuccess,
  authActionSignupError,
} from "./actions";

const herokuAPIURL = "https://mernaircanteen.herokuapp.com";
const model = "/signin";
const getUrl = process.env.API_URL || herokuAPIURL;

const url = getUrl + model;


console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

// Higher Order Generator Saga Functions on Change

function* authSagaApiData() {
  yield takeLatest(AUTH_CONST_APIDATA, fetchAuthApiData);
}

function* authSagaSignin() {
  yield takeLatest(AUTH_CONST_SIGNIN, fetchAuthSignin);
}

function* authSagaSignup() {
  yield takeLatest(AUTH_CONST_SIGNUP, fetchAuthSignup);
}

// Fetch Functions for API interaction

function* fetchAuthApiData(action) {
  try {
    // AUTH_CONST_APIDATA action and api call
    console.log("AUTH_CONST_APIDATA constant's action :: ", action);
    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log("responseBody of AUTH_CONST_APIDATA in saga is", responseBody);
    yield put(authActionApiDataSuccess(responseBody));
  } catch (error) {
    yield put(authActionApiDataError(error));
  }
}

function* fetchAuthSignin(action) {
  console.log("action in fetchAuthSignin is :", action);
  console.log("Email in fetchAuthSignin is :", action.authEmail.email);
  console.log("Password in fetchAuthSignin is :", action.authPassword.password);
  try {
    const response = yield call(fetch, url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: action.authEmail.email,
        password: action.authPassword.password,
      }),
    });
    const responseBody = yield response.json();
    console.log("responseBody of AUTH_CONST_SIGNIN in saga is", responseBody);

    window.localStorage.setItem('react-jwt',JSON.stringify(responseBody.token))
    yield put(authActionSigninSuccess(responseBody));
  } catch (error) {
    yield put(authActionSigninError(error));
  }
}

setTimeout(() => {
  console.log("Access from LocalStorage",JSON.parse(window.localStorage.getItem('react-jwt')))
},10)


function* fetchAuthSignup(action) {
  console.log("action in fetchAuthSignup is :", action);
  console.log("Email in fetchAuthSignup is :", action.authEmail.email);
  console.log("Password in fetchAuthSignup is :", action.authPassword.password);
  try {
    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of AUTH_CONST_SIGNUP in saga is",
      responseBody
    );
    yield put(authActionSignupSuccess(responseBody));
  } catch (error) {
    yield put(authActionSignupError(error));
  }
}

// Individual exports for testing
export default function* authSaga() {
  // See example in containers/HomePage/saga.js
  yield all([authSagaApiData(), authSagaSignin(), authSagaSignup()]);
}
