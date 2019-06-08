/*
*
* ORDER selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the order state domain
 */

const selectOrderDomain = state => state.get("order", initialState);

/**
 * Other specific selectors
 */

const makeOrderApiDataSelector = () =>
  createSelector(selectOrderDomain, substate => {
    console.log(
      "ORDER_STATE_APIDATA in selector",
      substate.get("ORDER_STATE_APIDATA")
    );
    return substate.get("ORDER_STATE_APIDATA");
  });

/**
 * Default selector used by Order
 */

const makeSelectOrder = () =>
  createSelector(selectOrderDomain, substate => substate.toJS());

export default makeSelectOrder;
export { selectOrderDomain, makeOrderApiDataSelector };
