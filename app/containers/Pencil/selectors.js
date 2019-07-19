/*
*
* PENCIL selectors
*
*/

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pencil state domain
 */

const selectPencilDomain = state =>
  state.get('pencil', initialState);

/**
 * Other specific selectors
 */

const makePencilApiDataSelector = () => {
  return createSelector(selectPencilDomain, substate => {
    console.log("PENCIL_STATE_APIDATA in selector",
      substate.get("PENCIL_STATE_APIDATA"));
    return substate.get("PENCIL_STATE_APIDATA");
  });
};


/**
 * Default selector used by Pencil
 */

const makeSelectPencil = () =>
  createSelector(selectPencilDomain, substate => substate.toJS());

export default makeSelectPencil;
export { 
  selectPencilDomain,
  makePencilApiDataSelector
   };
