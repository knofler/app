/*
*
* SEARCH actions
*
*/

import {
  DEFAULT_ACTION,
  SEARCH_CONST_APIDATA,
  SEARCH_CONST_SEARCHTERM,
  SEARCH_CONST_SEARCHTERM_CHANGE,
  SEARCH_CONST_APIDATA_SUCCESS,
  SEARCH_CONST_APIDATA_ERROR
} from "./constants";

/*
*
* DEFAULT actions SEARCH
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
* API DATA ACTIONS for SEARCH
*
*/

export function searchActionApiData(tenantId, skip, take) {
  console.log("in searchActionApiData Action", tenantId);
  return {
    type: SEARCH_CONST_APIDATA,
    tenantId,
    skip,
    take
  };
}

/*
 *
 * SEARCHTERM ACTIONS for SEARCH
 *
 */

export function searchActionSearchTerm(searchTerm) {
  return {
    type: SEARCH_CONST_SEARCHTERM,
    searchTerm,
  };
}

/*
 *
 * SEARCHTERM CHANGE ACTIONS for SEARCH
 *
 */

export function searchActionSearchTermChange(event) {
  return {
    type: SEARCH_CONST_SEARCHTERM_CHANGE,
    event,
  };
}

export function searchActionApiDataError(error) {
  return {
    type: SEARCH_CONST_APIDATA_ERROR,
    error
  };
}

export function searchActionApiDataSuccess(apiData) {
  console.log(
    "payload received from API yeild in searchActionApiData function in action is",
    apiData
  );
  return {
    type: SEARCH_CONST_APIDATA_SUCCESS,
    apiData
  };
}
