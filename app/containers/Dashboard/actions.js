/*
 *
 * Dashboard actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_EVENTS,
  LOAD_EVENTS_ERROR,
  LOAD_EVENTS_SUCCESS,
  LOAD_FEATURED_EVENTS,
  LOAD_FEATURED_EVENTS_ERROR,
  LOAD_FEATURED_EVENTS_SUCCESS,
} from "./constants";

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function loadEvents(tenantId, skip, take, searchTerm) {
  console.log("in LoadEvents Action", tenantId);
  return {
    type: LOAD_EVENTS,
    tenantId,
    skip,
    take,
    searchTerm,
  };
}

export function loadEventsError(error) {
  return {
    type: LOAD_EVENTS_ERROR,
    error,
  };
}

export function loadEventsSuccess(events) {
  return {
    type: LOAD_EVENTS_SUCCESS,
    events,
  };
}

export function loadFeaturedEvents(tenantId, skip, take) {
  console.log("in loadFeaturedEvents Action", tenantId);
  return {
    type: LOAD_FEATURED_EVENTS,
    tenantId,
    skip,
    take,
  };
}

export function loadFeaturedEventsError(featuredError) {
  return {
    type: LOAD_FEATURED_EVENTS_ERROR,
    featuredError,
  };
}

export function loadFeaturedEventsSuccess(featuredEvents) {
  console.log("payload received from featuredEvents yeild is", featuredEvents);
  return {
    type: LOAD_FEATURED_EVENTS_SUCCESS,
    featuredEvents,
  };
}
