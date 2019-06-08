/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  LOAD_EVENTS,
  LOAD_EVENTS_ERROR,
  LOAD_EVENTS_SUCCESS,
  LOAD_FEATURED_EVENTS,
  LOAD_FEATURED_EVENTS_ERROR,
  LOAD_FEATURED_EVENTS_SUCCESS
} from "./constants";

export const initialState = fromJS({
  events: [],
  loading: false,
  error: false,
  featuredEvents: [],
  loadingFeatured: false,
  errorFeatured: false,
});

function dashboardReducer(state = initialState, action) {
  console.log("reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_EVENTS:
      console.log("in loadEvents Reducer", action);
      return state.set("loading", true).set("error", false);
    case LOAD_EVENTS_ERROR:
      return state.set("loading", false).set("error", action.error);
    case LOAD_EVENTS_SUCCESS:
      return state
        .set("loading", true)
        .set("error", false)
        .set("events", action.events);
    case LOAD_FEATURED_EVENTS:
      console.log("in loadFeaturedEvents Reducer", action);
      return state.set("loadingFeatured", true).set("errorFeatured", false);
    case LOAD_FEATURED_EVENTS_ERROR:
      return state
        .set("loadingFeatured", false)
        .set("errorFeatured", action.featuredError);
    case LOAD_FEATURED_EVENTS_SUCCESS:
      console.log(
        "featured event success in reducer, action",
        action.featuredEvents
      );
      return state
        .set("loadingFeatured", true)
        .set("errorFeatured", false)
        .set("featuredEvents", action.featuredEvents);
    default:
      return state;
  }
}

export default dashboardReducer;
