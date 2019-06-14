/*
*
* CHANNEL selectors
*
*/

import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the channel state domain
 */

const selectChannelDomain = state => state.get("channel", initialState);

/**
 * Other specific selectors
 */

const makeChannelApiDataSelector = () => {
  return createSelector(selectChannelDomain, substate => {
    console.log(
      "CHANNEL_STATE_APIDATA in selector",
      substate.get("CHANNEL_STATE_APIDATA")
    );
    return substate.get("CHANNEL_STATE_APIDATA");
  });
};

/**
 * Default selector used by Channel
 */

const makeSelectChannel = () =>
  createSelector(selectChannelDomain, substate => substate.toJS());

export default makeSelectChannel;
export { selectChannelDomain, makeChannelApiDataSelector };
