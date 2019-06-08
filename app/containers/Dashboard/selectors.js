import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.get("dashboard", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(selectDashboardDomain, substate => substate.toJS());

const makeFeaturedEventSelector = () => {
  console.log("Dashboard selector being called");
  return createSelector(selectDashboardDomain, substate => {
    console.log(
      "featuredEvents in Dashboard selector",
      substate.get("featuredEvents")
    );
    return substate.get("featuredEvents");
  });
};

const makeEventsSelector = () =>
  createSelector(selectDashboardDomain, substate => substate.get("events"));

export default makeSelectDashboard;
export { selectDashboardDomain, makeFeaturedEventSelector, makeEventsSelector };
