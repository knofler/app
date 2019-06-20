/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* MEDIALIVE selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the MediaLive state domain
 */

const selectMediaLiveDomain = state => state.get("MediaLive", initialState);

/**
 * MEDIALIVE_STATE_ADD_PAYLOAD
 */

/**
 * MEDIALIVE_STATE_AWS_GET_PAYLOAD
 */

const makeMediaLiveAWSGetPayloadSelector = () =>
  createSelector(selectMediaLiveDomain, substate => {
    console.log(
      "MEDIALIVE_STATE_ADD_AWS_GET_PAYLOAD in selector",
      substate.get("MEDIALIVE_STATE_ADD_AWS_GET_PAYLOAD")
    );
    return substate.get("MEDIALIVE_STATE_ADD_AWS_GET_PAYLOAD");
  });

const makeMediaLiveAddPayloadSelector = () =>
  createSelector(selectMediaLiveDomain, substate => {
    console.log(
      "MEDIALIVE_STATE_ADD_PAYLOAD in SELECTOR:: :::",
      substate.get("MEDIALIVE_STATE_ADD_PAYLOAD")
    );
    return substate.get("MEDIALIVE_STATE_ADD_PAYLOAD");
  });

/**
 * MEDIALIVE_STATE_ADD_AWS_PAYLOAD
 */

const makeMediaLiveAddAwsPayloadSelector = () =>
  createSelector(selectMediaLiveDomain, substate => {
    console.log(
      "MEDIALIVE_STATE_ADD_AWS_PAYLOAD in SELECTOR:: :::",
      substate.get("MEDIALIVE_STATE_ADD_AWS_PAYLOAD")
    );
    return substate.get("MEDIALIVE_STATE_ADD_AWS_PAYLOAD");
  });

/**
 * MEDIALIVE_STATE_ADD_INPUT
 */

const makeMediaLiveAddInputSelector = () =>
  createSelector(selectMediaLiveDomain, substate => {
    console.log(
      "MEDIALIVE_STATE_ADD_INPUT in SELECTOR:: :::",
      substate.get("MEDIALIVE_STATE_ADD_INPUT")
    );
    return substate.get("MEDIALIVE_STATE_ADD_INPUT");
  });

/**
 * MEDIALIVE_STATE_ADD_MODEL
 */

const makeMediaLiveAddModelSelector = () =>
  createSelector(selectMediaLiveDomain, substate => {
    console.log(
      "MEDIALIVE_STATE_ADD_MODEL in SELECTOR:: :::",
      substate.get("MEDIALIVE_STATE_ADD_MODEL")
    );
    return substate.get("MEDIALIVE_STATE_ADD_MODEL");
  });

/**
 * MEDIALIVE_STATE_ADD_FORM_STRUCTURE
 */

const makeMediaLiveAddFormStructureSelector = () =>
  createSelector(selectMediaLiveDomain, substate => {
    console.log(
      "MEDIALIVE_STATE_ADD_FORM_STRUCTURE in SELECTOR:: :::",
      substate.get("MEDIALIVE_STATE_ADD_FORM_STRUCTURE")
    );
    return substate.get("MEDIALIVE_STATE_ADD_FORM_STRUCTURE");
  });

/**
 * MEDIALIVE_STATE_ADD_FORM_ITEM_RESET
 */

const makeMediaLiveAddFormItemResetSelector = () =>
  createSelector(selectMediaLiveDomain, substate => {
    console.log(
      "MEDIALIVE_STATE_ADD_FORM_ITEM_RESET in SELECTOR:: :::",
      substate.get("MEDIALIVE_STATE_ADD_FORM_RESET"),
      "MEDIALIVE_STATE_ADD_INPUT after reset in SELECTOR:: :::",
      substate.get("MEDIALIVE_STATE_ADD_INPUT")
    );
    return substate.get("MEDIALIVE_STATE_ADD_FORM_RESET");
  });

/**
 * Default selector used by MediaLive
 */

const makeSelectmediaLive = () =>
  createSelector(selectMediaLiveDomain, substate => substate.toJS());

export default makeSelectmediaLive;
export {
  selectMediaLiveDomain,
  makeMediaLiveAddPayloadSelector,
  makeMediaLiveAWSGetPayloadSelector,
  makeMediaLiveAddAwsPayloadSelector,
  makeMediaLiveAddInputSelector,
  makeMediaLiveAddModelSelector,
  makeMediaLiveAddFormStructureSelector,
  makeMediaLiveAddFormItemResetSelector
};
