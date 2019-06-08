/*
*
* FOOD actions
*
*/

import {
  DEFAULT_ACTION,
  FOOD_CONST_APIDATA,
  FOOD_CONST_APIDATA_SUCCESS,
  FOOD_CONST_APIDATA_ERROR
} from "./constants";

/*
*
* DEFAULT actions FOOD
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
* API DATA ACTIONS for FOOD
*
*/

export function foodActionApiData(tenantId, skip, take) {
  console.log("in foodActionApiData Action", tenantId);
  return {
    type: FOOD_CONST_APIDATA,
    tenantId,
    skip,
    take
  };
}

export function foodActionApiDataError(error) {
  return {
    type: FOOD_CONST_APIDATA_ERROR,
    error
  };
}

export function foodActionApiDataSuccess(apiData) {
  console.log(
    "payload received from API yeild in foodActionApiData function in action is",
    apiData
  );
  return {
    type: FOOD_CONST_APIDATA_SUCCESS,
    apiData
  };
}
