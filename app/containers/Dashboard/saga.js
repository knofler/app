import { all, put, takeLatest } from "redux-saga/effects";
import { LOAD_EVENTS, LOAD_FEATURED_EVENTS } from "./constants";
import events from "./mocks/Events";
import featuredEvents from "./mocks/FeaturedEvents";

import {
  loadEventsSuccess,
  loadEventsError,
  loadFeaturedEventsSuccess,
  loadFeaturedEventsError,
} from "./actions";

function* loadEvents() {
  yield takeLatest(LOAD_EVENTS, fetchEvents);
}

function* loadFeaturedEvents() {
  yield takeLatest(LOAD_FEATURED_EVENTS, fetchFeaturedEvents);
}

function* fetchEvents(action) {
  try {
    // use action param and call api
    console.log("Events Tenant ID", action.tenantId);
    console.log("Events skip", action.skip);
    console.log("Events Take", action.take);
    console.log("events", events);

    yield put(loadEventsSuccess(events));
  } catch (error) {
    yield put(loadEventsError(error));
  }
}

function* fetchFeaturedEvents(action) {
  try {
    // load Featured Events action and api call
    console.log("Featured Events TenantId", action.tenantId);
    console.log("Featured Skip", action.skip);
    console.log("Featured Take", action.take);
    console.log("featuredEvents", featuredEvents);
    yield put(loadFeaturedEventsSuccess(featuredEvents));
  } catch (error) {
    yield put(loadFeaturedEventsError(error));
  }
}

// Individual exports for testing
export default function* dashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield all([loadEvents(), loadFeaturedEvents()]);
}
