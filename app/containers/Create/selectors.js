/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* CREATE selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the create state domain
 */

const selectCreateDomain = state =>  
  state.get('create', initialState);

/**
 * CREATE_STATE_ADD_PAYLOAD
 */

const makeCreateAddPayloadSelector = () =>
  createSelector(selectCreateDomain, substate => {
    console.log(
      "CREATE_STATE_ADD_PAYLOAD in SELECTOR:: :::",
      substate.get("CREATE_STATE_ADD_PAYLOAD")
    );
    return substate.get("CREATE_STATE_ADD_PAYLOAD");
  });

/**
 * CREATE_STATE_ADD_INPUT
 */

const makeCreateAddInputSelector = () =>
  createSelector(selectCreateDomain, substate => {
    console.log(
      "CREATE_STATE_ADD_INPUT in SELECTOR:: :::",
      substate.get("CREATE_STATE_ADD_INPUT")
    );
    return substate.get("CREATE_STATE_ADD_INPUT");
  });

/**
 * CREATE_STATE_ADD_MODEL
 */

const makeCreateAddModelSelector = () =>
  createSelector(selectCreateDomain, substate => {
    console.log(
      "CREATE_STATE_ADD_MODEL in SELECTOR:: :::",
      substate.get("CREATE_STATE_ADD_MODEL")
    );
    return substate.get("CREATE_STATE_ADD_MODEL");
  });

/**
 * CREATE_STATE_ADD_FORM_STRUCTURE
 */

const makeCreateAddFormStructureSelector = () =>
  createSelector(selectCreateDomain, substate => {
    console.log(
      "CREATE_STATE_ADD_FORM_STRUCTURE in SELECTOR:: :::",
      substate.get("CREATE_STATE_ADD_FORM_STRUCTURE")
    );
    return substate.get("CREATE_STATE_ADD_FORM_STRUCTURE");
  });

/**
 * CREATE_STATE_ADD_FORM_ITEM_RESET
 */

const makeCreateAddFormItemResetSelector = () =>
  createSelector(selectCreateDomain, substate => {
    console.log(
      "CREATE_STATE_ADD_FORM_ITEM_RESET in SELECTOR:: :::",
      substate.get("CREATE_STATE_ADD_FORM_RESET"),
      "CREATE_STATE_ADD_INPUT after reset in SELECTOR:: :::",
      substate.get("CREATE_STATE_ADD_INPUT")
    );
    return substate.get("CREATE_STATE_ADD_FORM_RESET");
  });

/**
 * Default selector used by Create
 */

const makeSelectCreate = () =>
  createSelector(selectCreateDomain, substate => substate.toJS());

export default makeSelectCreate;
export {
  selectCreateDomain,
  makeCreateAddPayloadSelector,
  makeCreateAddInputSelector,
  makeCreateAddModelSelector,
  makeCreateAddFormStructureSelector,
  makeCreateAddFormItemResetSelector
};
