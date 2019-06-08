/*
*
* CHEF actions
*
*/

import {
DEFAULT_ACTION,
CHEF_CONST_APIDATA,
CHEF_CONST_APIDATA_SUCCESS,
CHEF_CONST_APIDATA_ERROR,
} from "./constants";

/*
*
* DEFAULT actions CHEF
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
 }

/*
*
* API DATA ACTIONS for CHEF
*
*/

export function chefActionApiData(tenantId, skip, take) {
    console.log("in chefActionApiData Action", tenantId);
  return {
    type: CHEF_CONST_APIDATA,
    tenantId,
    skip,
    take
  };
}

export function chefActionApiDataError(error) {
  return {
    type: CHEF_CONST_APIDATA_ERROR,
    error
  };
}

export function chefActionApiDataSuccess(apiData) {
  console.log(
  "payload received from API yeild in chefActionApiData function in action is",
  apiData
  );
  return {
    type: CHEF_CONST_APIDATA_SUCCESS,
    apiData
  };
}


