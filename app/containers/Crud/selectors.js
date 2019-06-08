/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/*
*
* CRUD selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the crud state domain
 */

const selectCrudDomain = state => state.get("crud", initialState);

/**
 * Other specific selectors
 */

const makeCrudApiDataSelector = () => {
  return createSelector(selectCrudDomain, substate => {
    console.log(
      "CRUD_STATE_APIDATA in selector",
      substate.get("CRUD_STATE_APIDATA")
    );
    return substate.get("CRUD_STATE_APIDATA");
  });
};

/**
 * CRUD selectors
 */

const makeCrudCreateSelector = () => createSelector(selectCrudDomain, substate => {
  console.log("CRUD_STATE_CREATE_PAYLOAD in selector",
    substate.get('CRUD_STATE_CREATE_PAYLOAD'));
  return substate.get('CRUD_STATE_CREATE_PAYLOAD')
});

const makeCrudReadSelector = () => createSelector(selectCrudDomain, substate => {
  console.log("CRUD_STATE_READ_PAYLOAD in selector",
    substate.get('CRUD_STATE_READ_PAYLOAD'));
  return substate.get('CRUD_STATE_READ_PAYLOAD')
});

const makeCrudUpdateSelector = () => createSelector(selectCrudDomain, substate => {
  console.log("CRUD_STATE_UPDATE_PAYLOAD in selector",
    substate.get('CRUD_STATE_UPDATE_PAYLOAD'));
  return substate.get('CRUD_STATE_UPDATE_PAYLOAD')
});

const makeCrudUpdateItemSelector = () => createSelector(selectCrudDomain, substate => {
  console.log("CRUD_STATE_UPDATE_ITEM in selector",
    substate.get('CRUD_STATE_UPDATE_ITEM'));
  return substate.get('CRUD_STATE_UPDATE_ITEM')
});

const makeCrudMethod = () => createSelector(selectCrudDomain, substate => {
  console.log("CRUD_STATE_METHOD in selector",
    substate.get("CRUD_STATE_METHOD"));
  return substate.get("CRUD_STATE_METHOD")
})

const makeCrudDeleteSelector = () => createSelector(selectCrudDomain, substate => {
  console.log("CRUD_STATE_DELETE_PAYLOAD in selector",
    substate.get('CRUD_STATE_DELETE_PAYLOAD'));
  return substate.get('CRUD_STATE_DELETE_PAYLOAD')
});


/**
 * Default selector used by Crud
 */

const makeSelectCrud = () =>
  createSelector(selectCrudDomain, substate => substate.toJS());

export default makeSelectCrud;
// eslint-disable-next-line prettier/prettier
export {
  selectCrudDomain,
  makeCrudApiDataSelector,
  makeCrudCreateSelector,
  makeCrudReadSelector,
  makeCrudUpdateSelector,
  makeCrudUpdateItemSelector,
  makeCrudMethod,
  makeCrudDeleteSelector
};
