/*
*
* FOOD selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the food state domain
 */

const selectFoodDomain = state => state.get("food", initialState);

/**
 * Other specific selectors
 */

const makeFoodApiDataSelector = () => {
  return createSelector(selectFoodDomain, substate => {
    console.log(
      "FOOD_STATE_APIDATA in selector",
      substate.get("FOOD_STATE_APIDATA")
    );
    return substate.get("FOOD_STATE_APIDATA");
  });
};

/**
 * Default selector used by Food
 */

const makeSelectFood = () =>
  createSelector(selectFoodDomain, substate => substate.toJS());

export default makeSelectFood;
export { selectFoodDomain, makeFoodApiDataSelector };
