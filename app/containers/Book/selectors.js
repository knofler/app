/* eslint-disable no-console */
/*
*
* BOOK selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the book state domain
 */

const selectBookDomain = state => state.get("book", initialState);

/**
 * Other specific selectors
 */

const makeBookApiDataSelector = () =>
  createSelector(selectBookDomain, substate => {
    console.log(
      "BOOK_STATE_APIDATA in selector",
      substate.get("BOOK_STATE_APIDATA")
    );
    return substate.get("BOOK_STATE_APIDATA");
  });

/**
 * MEDIA LIVE specific selectors
 */

const makeBookGetChannelSelector = () =>
  createSelector(selectBookDomain, substate => {
    console.log(
      "BOOK_STATE_CHANNEL in selector",
      substate.get("BOOK_STATE_CHANNEL")
    );
    return substate.get("BOOK_STATE_CHANNEL");
  });

const makeBookGetAWSResponseSelector = () =>
  createSelector(selectBookDomain, substate => {
    console.log(
      "BOOK_STATE_CHANNEL in selector",
      substate.get("BOOK_STATE_AWS_RESPONSE")
    );
    return substate.get("BOOK_STATE_AWS_RESPONSE");
  });

const makeBookGetInputSelector = () =>
  createSelector(selectBookDomain, substate => {
    console.log(
      "BOOK_STATE_INPUT in selector",
      substate.get("BOOK_STATE_INPUT")
    );
    return substate.get("BOOK_STATE_INPUT");
  });

/**
 * Default selector used by Book
 */

const makeSelectBook = () =>
  createSelector(selectBookDomain, substate => substate.toJS());

export default makeSelectBook;
export {
  selectBookDomain,
  makeBookApiDataSelector,
  makeBookGetChannelSelector,
  makeBookGetAWSResponseSelector,
  makeBookGetInputSelector,
};
