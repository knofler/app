/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* DELETE  selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the create state domain
 */

const selectDeleteDomain = state => state.get("delete", initialState);

/**
 * DELETE_STATE_PAYLOAD
 */

const makeDeletePostPayloadSelector = () =>
  createSelector(selectDeleteDomain, substate => {
    console.log(
      "DELETE_STATE_PAYLOAD in SELECTOR:: :::",
      substate.get("DELETE_STATE_PAYLOAD")
    );
    return substate.get("DELETE_STATE_PAYLOAD");
  });

/**
 * DELETE_STATE_MODEL
 */

const makeDeleteModelSelector = () =>
  createSelector(selectDeleteDomain, substate => {
    console.log(
      "DELETE_STATE_MODEL in SELECTOR:: :::",
      substate.get("DELETE_STATE_MODEL")
    );
    return substate.get("DELETE_STATE_MODEL");
  });

/**
 * DELETE_STATE_ID
 */

const makeDeleteIdSelector = () =>
  createSelector(selectDeleteDomain, substate => {
    console.log(
      "DELETE_STATE_ID in SELECTOR:: :::",
      substate.get("DELETE_STATE_ID")
    );
    return substate.get("DELETE_STATE_ID");
  });

/**
 * Default selector used by Delete
 */

const makeSelectDelete = () =>
  createSelector(selectDeleteDomain, substate => substate.toJS());

export default makeSelectDelete;
export {
  selectDeleteDomain,
  makeDeletePostPayloadSelector,
  makeDeleteIdSelector,
  makeDeleteModelSelector
};
