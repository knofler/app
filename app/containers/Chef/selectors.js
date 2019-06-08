/* eslint-disable no-console */
/*
*
* CHEF selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the chef state domain
 */

const selectChefDomain = state => state.get("chef", initialState);

/**
 * Other specific selectors
 */

const makeChefApiDataSelector = () => {
  return createSelector(selectChefDomain, substate => {
    console.log(
      "CHEF_STATE_APIDATA in selector",
      substate.get("CHEF_STATE_APIDATA")
    );
    return substate.get("CHEF_STATE_APIDATA");
  });
};

/**
 * Default selector used by Chef
 */

const makeSelectChef = () =>
  createSelector(selectChefDomain, substate => substate.toJS());

export default makeSelectChef;
export { selectChefDomain, makeChefApiDataSelector };
