/*
*
* GENAPP selectors
*
*/

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the genapp state domain
 */

const selectGenappDomain = state =>
  state.get('genapp', initialState);

/**
 * Other specific selectors
 */

const makeGenappApiDataSelector = () => {
  return createSelector(selectGenappDomain, substate => {
    console.log("GENAPP_STATE_APIDATA in selector",
      substate.get("GENAPP_STATE_APIDATA"));
    return substate.get("GENAPP_STATE_APIDATA");
  });
};


/**
 * Default selector used by Genapp
 */

const makeSelectGenapp = () =>
  createSelector(selectGenappDomain, substate => substate.toJS());

export default makeSelectGenapp;
export { 
  selectGenappDomain,
  makeGenappApiDataSelector
   };
