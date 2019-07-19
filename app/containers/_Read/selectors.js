/*
*
* READ selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the read state domain
 */

const selectReadDomain = state => state.get("read", initialState);

/**
 * Other specific selectors
 */

const makeReadApiDataSelector = () => {
  return createSelector(selectReadDomain, substate => {
    console.log(
      "READ_STATE_APIDATA in selector",
      substate.get("READ_STATE_APIDATA")
    );
    return substate.get("READ_STATE_APIDATA");
  });
};

/**
 * Default selector used by Read
 */

const makeSelectRead = () =>
  createSelector(selectReadDomain, substate => substate.toJS());

export default makeSelectRead;
export { selectReadDomain, makeReadApiDataSelector };
