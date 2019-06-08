/* eslint-disable no-console */
import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the auth state domain
 */

const selectAuthDomain = state => state.get("auth", initialState);

/**
 * Other specific selectors
 */

const makeAuthApiDataSelector = () =>
  createSelector(selectAuthDomain, substate => {
    console.log(
      "AUTH_STATE_APIDATA in selector",
      substate.get("AUTH_STATE_APIDATA")
    );
    return substate.get("AUTH_STATE_APIDATA");
  });

const makeAuthEmailSelector = () =>
  createSelector(selectAuthDomain, substate => {
    console.log(
      "Email selector picks state change from the initial state to current value",
      substate.get("AUTH_STATE_EMAIL")
    );
    return substate.get("AUTH_STATE_EMAIL");
  });

const makeAuthPasswordSelector = () =>
  createSelector(selectAuthDomain, substate => {
    console.log("Password selector", substate.get("AUTH_STATE_PASSWORD"));
    return substate.get("AUTH_STATE_PASSWORD");
  });

const makeAuthSigninSelector = () =>
  createSelector(selectAuthDomain, substate => {
    console.log("AuthSignin selector", substate.get("AUTH_STATE_SIGNIN_TOKEN"));
    return substate.get("AUTH_STATE_SIGNIN_TOKEN");
  });

const makeAuthSignupSelector = () =>
  createSelector(selectAuthDomain, substate => {
    console.log("AuthSignup selector", substate.get("AUTH_STATE_SIGNUP_TOKEN"));
    return substate.get("AUTH_STATE_SIGNUP_TOKEN");
  });

/**
 * Default selector used by Auth
 */

const makeSelectAuth = () =>
  createSelector(selectAuthDomain, substate => substate.toJS());

export default makeSelectAuth;
export {
  selectAuthDomain,
  makeAuthApiDataSelector,
  makeAuthEmailSelector,
  makeAuthPasswordSelector,
  makeAuthSigninSelector,
  makeAuthSignupSelector,
};
