/* eslint-disable no-console */
/* eslint-disable camelcase */
/*
*
* Auth actions
*
*/

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

/*
*
* DEFAULT actions Auth
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

/*
*
* API DATA ACTIONS for Auth
*
*/

export function authActionApiData(tenantId, skip, take) {
  console.log("in authActionApiData Action", tenantId);
  return {
    type: AUTH_CONST_APIDATA,
    tenantId,
    skip,
    take,
  };
}

export function authActionApiDataError(error) {
  return {
    type: AUTH_CONST_APIDATA_ERROR,
    error,
  };
}

export function authActionApiDataSuccess(apiData) {
  console.log(
    "payload received from API yeild in authActionApiData function in action is",
    apiData
  );
  return {
    type: AUTH_CONST_APIDATA_SUCCESS,
    apiData,
  };
}

/*
*
* AUTH ACTIONS for Auth
*
*/

export function authActionSetEmail(authEmail) {
  console.log("authActionSetEmail action being called with", authEmail);
  return {
    type: AUTH_CONST_EMAIL,
    authEmail,
  };
}

export function authActionSetPassword(authPassword) {
  console.log("authActionSetPassword action being called with", authPassword);
  return {
    type: AUTH_CONST_PASSWORD,
    authPassword,
  };
}

export function authActionSetToken(authToken) {
  console.log("authActionSetToken action being called with", authToken);
  return {
    type: AUTH_CONST_TOKEN,
    authToken,
  };
}

/*
 *
 * SIGN IN ACTIONS for Auth
 *
 */

export function authActionSignin(authEmail, authPassword) {
  console.log(
    "authActionSignin action being called with",
    authEmail,
    "and",
    authPassword
  );
  return {
    type: AUTH_CONST_SIGNIN,
    authEmail,
    authPassword,
  };
}

export function authActionSigninError(signinError) {
  return {
    type: AUTH_CONST_SIGNIN_ERROR,
    signinError,
  };
}

export function authActionSigninSuccess(signinAuthToken) {
  return {
    type: AUTH_CONST_SIGNIN_SUCCESS,
    signinAuthToken,
  };
}

/*
 *
 * SIGN UP ACTIONS for Auth
 *
 */

export function authActionSignup(authEmail, authPassword) {
  console.log(
    "authActionSignup action being called with",
    authEmail,
    "and",
    authPassword
  );
  return {
    type: AUTH_CONST_SIGNUP,
    authEmail,
    authPassword,
  };
}

export function authActionSignupError(signupError) {
  return {
    type: AUTH_CONST_SIGNUP_ERROR,
    signupError,
  };
}

export function authActionSignupSuccess(signupAuthToken) {
  return {
    type: AUTH_CONST_SIGNUP_SUCCESS,
    signupAuthToken,
  };
}
