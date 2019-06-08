/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* UPDATE selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the create state domain
 */

const selectUpdateDomain = state => state.get("update", initialState);

/**
 * UPDATE_STATE_PLACE_HOLDER
 */

const makeUpdateGetPayloadSelector = () =>
  createSelector(selectUpdateDomain, substate => {
    console.log(
      "UPDATE_STATE_PLACE_HOLDER in SELECTOR:: :::",
      substate.get("UPDATE_STATE_PLACE_HOLDER")
    );
    return substate.get("UPDATE_STATE_PLACE_HOLDER");
  });

/**
 * UPDATE_STATE_PAYLOAD
 */

const makeUpdatePostPayloadSelector = () =>
  createSelector(selectUpdateDomain, substate => {
    console.log(
      "UPDATE_STATE_PAYLOAD in SELECTOR:: :::",
      substate.get("UPDATE_STATE_PAYLOAD")
    );
    return substate.get("UPDATE_STATE_PAYLOAD");
  });

/**
 * UPDATE_STATE_INPUT
 */

const makeUpdateInputSelector = () =>
  createSelector(selectUpdateDomain, substate => {
    console.log(
      "UPDATE_STATE_INPUT in SELECTOR:: :::",
      substate.get("UPDATE_STATE_INPUT")
    );
    return substate.get("UPDATE_STATE_INPUT");
  });

/**
 * UPDATE_STATE_MODEL
 */

const makeUpdateModelSelector = () =>
  createSelector(selectUpdateDomain, substate => {
    console.log(
      "UPDATE_STATE_MODEL in SELECTOR:: :::",
      substate.get("UPDATE_STATE_MODEL")
    );
    return substate.get("UPDATE_STATE_MODEL");
  });

/**
 * UPDATE_STATE_ID
 */

const makeUpdateIdSelector = () =>
  createSelector(selectUpdateDomain, substate => {
    console.log(
      "UPDATE_STATE_ID in SELECTOR:: :::",
      substate.get("UPDATE_STATE_ID")
    );
    return substate.get("UPDATE_STATE_ID");
  });

/**
 * UPDATE_STATE_FORM_STRUCTURE
 */

const makeUpdateFormStructureSelector = () =>
  createSelector(selectUpdateDomain, substate => {
    console.log(
      "UPDATE_STATE_FORM_STRUCTURE in SELECTOR:: :::",
      substate.get("UPDATE_STATE_FORM_STRUCTURE")
    );
    return substate.get("UPDATE_STATE_FORM_STRUCTURE");
  });

/**
 * UPDATE_STATE_FORM_ITEM_RESET
 */

const makeUpdateFormItemResetSelector = () =>
  createSelector(selectUpdateDomain, substate => {
    console.log(
      "UPDATE_STATE_FORM_ITEM_RESET in SELECTOR:: :::",
      substate.get("UPDATE_STATE_FORM_RESET"),
      "UPDATE_STATE_INPUT after reset in SELECTOR:: :::",
      substate.get("UPDATE_STATE_INPUT")
    );
    return substate.get("UPDATE_STATE_FORM_RESET");
  });

/**
 * Default selector used by Update
 */

const makeSelectUpdate = () =>
  createSelector(selectUpdateDomain, substate => substate.toJS());

export default makeSelectUpdate;
export {
  selectUpdateDomain,
  makeUpdatePostPayloadSelector,
  makeUpdateGetPayloadSelector,
  makeUpdateInputSelector,
  makeUpdateIdSelector,
  makeUpdateModelSelector,
  makeUpdateFormStructureSelector,
  makeUpdateFormItemResetSelector
};
