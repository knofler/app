/* eslint-disable no-console */
/* eslint-disable camelcase */
/*
 *
 * Auth reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  AUTH_CONST_APIDATA,
  AUTH_CONST_APIDATA_SUCCESS,
  AUTH_CONST_APIDATA_ERROR,
  AUTH_CONST_EMAIL,
  AUTH_CONST_PASSWORD,
  AUTH_CONST_TOKEN,
  AUTH_CONST_SIGNIN,
  AUTH_CONST_SIGNIN_SUCCESS,
  AUTH_CONST_SIGNIN_ERROR,
  AUTH_CONST_SIGNUP,
  AUTH_CONST_SIGNUP_SUCCESS,
  AUTH_CONST_SIGNUP_ERROR
} from "./constants";

export const initialState = fromJS({
  AUTH_STATE_APIDATA: [],
  AUTH_STATE_APIDATA_LOADING: false,
  AUTH_STATE_APIDATA_ERROR: false,
  AUTH_STATE_EMAIL: "default@email.com",
  AUTH_STATE_PASSWORD: "dEfAult_Password",
  AUTH_STATE_TOKEN: "",
  AUTH_STATE_SIGNIN_TOKEN: "",
  AUTH_STATE_SIGNUP_TOKEN: "",
  AUTH_STATE_SIGNIN_LOADING: false,
  AUTH_STATE_SIGNIN_ERROR: false,
  AUTH_STATE_SIGNUP_LOADING: false,
  AUTH_STATE_SIGNUP_ERROR: false,
});

function authReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case AUTH_CONST_APIDATA:
      console.log("in AUTH_CONST_APIDATA action: ", action);
      return state
        .set("AUTH_STATE_APIDATA_LOADING", true)
        .set("AUTH_STATE_APIDATA_ERROR", false);
    case AUTH_CONST_APIDATA_ERROR:
      return state
        .set("AUTH_STATE_APIDATA_LOADING", false)
        .set("AUTH_STATE_APIDATA_ERROR", action.error);
    case AUTH_CONST_APIDATA_SUCCESS:
      console.log(
        "In AUTH_CONST_APIDATA_SUCCESS reducer, action",
        action.apiData
      );
      return state
        .set("AUTH_STATE_APIDATA_LOADING", true)
        .set("AUTH_STATE_APIDATA_ERROR", false)
        .set("AUTH_STATE_APIDATA", action.apiData);
    case AUTH_CONST_EMAIL:
      console.log(
        "In AUTH_CONST_EMAIL action in reducer, value assigned to Auth_email state",
        action.authEmail
      );
      return state
        .set("AUTH_STATE_EMAIL", action.authEmail)
        .set("AUTH_STATE_SIGNIN_ERROR", false);
    case AUTH_CONST_PASSWORD:
      console.log("In AUTH_CONST_PASSWORD action", action.authPassword);
      return state
        .set("AUTH_STATE_PASSWORD", action.authPassword)
        .set("AUTH_STATE_SIGNIN_ERROR", false);
    case AUTH_CONST_TOKEN:
      console.log("In AUTH_CONST_TOKEN action.authToken", action.authToken);
      return state
        .set("AUTH_STATE_TOKEN", action.authToken)
        .set("AUTH_STATE_SIGNIN_ERROR", false);
    case AUTH_CONST_SIGNIN:
      console.log(
        "In AUTH_CONST_SIGNIN action Auth Email is : ",
        action.authEmail,
        "and Auth Password is ",
        action.authPassword
      );
      return (
        state
          // .set("Auth_email", action.authEmail)
          // .set("Auth_password", action.authPassword)
          .set("AUTH_STATE_SIGNIN_LOADING", true)
          .set("AUTH_STATE_SIGNIN_ERROR", false)
      );
    case AUTH_CONST_SIGNIN_ERROR:
      return state
        .set("AUTH_STATE_SIGNIN_LOADING", false)
        .set("AUTH_STATE_SIGNIN_ERROR", action.signinError);
    case AUTH_CONST_SIGNIN_SUCCESS:
      console.log(
        "In AUTH_CONST_SIGNIN_SUCCESS reducer, action.signinAuthToken",
        action.signinAuthToken
      );
      return state
        .set("AUTH_STATE_SIGNIN_LOADING", false)
        .set("AUTH_STATE_SIGNIN_ERROR", false)
        .set("AUTH_STATE_SIGNIN_TOKEN", action.signinAuthToken)
        .set("AUTH_STATE_EMAIL", action.authEmail)
        .set("AUTH_STATE_PASSWORD", action.authPassword);
    case AUTH_CONST_SIGNUP:
      console.log(
        "In AUTH_CONST_SIGNUP action Auth Email is : ",
        action.authEmail,
        "and Auth Password is ",
        action.authPassword
      );
      return state
        .set("AUTH_STATE_SIGNUP_LOADING", true)
        .set("AUTH_STATE_SIGNUP_ERROR", false);
    case AUTH_CONST_SIGNUP_ERROR:
      return state
        .set("AUTH_STATE_SIGNUP_LOADING", false)
        .set("AUTH_STATE_SIGNUP_ERROR", action.signupError);
    case AUTH_CONST_SIGNUP_SUCCESS:
      console.log(
        "In AUTH_CONST_SIGNUP_SUCCESS reducer, action.signupAuthToken",
        action.signupAuthToken
      );
      return state
        .set("AUTH_STATE_SIGNUP_LOADING", false)
        .set("AUTH_STATE_SIGNUP_ERROR", false)
        .set("AUTH_STATE_SIGNUP_TOKEN", action.signupAuthToken)
        .set("AUTH_STATE_EMAIL", action.authEmail)
        .set("AUTH_STATE_PASSWORD", action.authPassword);
    default:
      return state;
  }
}

export default authReducer;
