/* eslint-disable no-console */
/*
*
* SEARCH selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the search state domain
 */

const selectSearchDomain = state => state.get("search", initialState);

/**
 * Other specific selectors
 */

const makeSearchApiDataSelector = () =>
  createSelector(selectSearchDomain, substate => {
    console.log(
      "SEARCH_STATE_APIDATA in selector",
      substate.get("SEARCH_STATE_APIDATA")
    );
    return substate.get("SEARCH_STATE_APIDATA");
  });

const makeSearchSearchTermSelector = () =>
  createSelector(selectSearchDomain, substate => {
    console.log(
      "SEARCH_STATE_SEARCHTERM in selector",
      substate.get("SEARCH_STATE_SEARCHTERM")
    );
    return substate.get("SEARCH_STATE_SEARCHTERM");
  });

const makeSearchSearchTermChangeSelector = () =>
  createSelector(selectSearchDomain, substate => {
    console.log(
      "SEARCH_STATE_SEARCHTERM_CHANGE in selector",
      substate.get("SEARCH_STATE_SEARCHTERM_CHANGE")
    );
    return substate.get("SEARCH_STATE_SEARCHTERM_CHANGE");
  });
/**
 * Default selector used by Search
 */

const makeSelectSearch = () =>
  createSelector(selectSearchDomain, substate => substate.toJS());

export default makeSelectSearch;
export {
  selectSearchDomain,
  makeSearchApiDataSelector,
  makeSearchSearchTermSelector,
  makeSearchSearchTermChangeSelector
};
