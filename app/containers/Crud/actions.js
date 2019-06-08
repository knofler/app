/* eslint-disable no-console */
/*
*
* CRUD actions
*
*/

import {
  DEFAULT_ACTION,
  CRUD_CONST_APIDATA,
  CRUD_CONST_APIDATA_SUCCESS,
  CRUD_CONST_APIDATA_ERROR,
  CRUD_CONST_CREATE,
  CRUD_CONST_CREATE_SUCCESS,
  CRUD_CONST_CREATE_ERROR,
  CRUD_CONST_READ,
  CRUD_CONST_READ_SUCCESS,
  CRUD_CONST_READ_ERROR,
  CRUD_CONST_UPDATE,
  CRUD_CONST_UPDATE_SUCCESS,
  CRUD_CONST_UPDATE_ERROR,
  CRUD_CONST_UPDATE_ITEM,
  CRUD_CONST_UPDATE_ITEM_SUCCESS,
  CRUD_CONST_UPDATE_ITEM_ERROR,
  CRUD_CONST_DELETE,
  CRUD_CONST_DELETE_SUCCESS,
  CRUD_CONST_DELETE_ERROR
} from "./constants";

/*
*
* DEFAULT actions CRUD
*
*/

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

/*
*
* ACTIONS for CRUD
*
*/

/* 
  * CREATE ACTIONS
*/

export function crudActionCreate({ data, model }) {
  console.log("in crudActionCreate Action data", data);
  console.log("in crudActionCreate Action model", model);
  return {
    type: CRUD_CONST_CREATE,
    data,
    model
  };
}

export function crudActionCreateError(error) {
  return {
    type: CRUD_CONST_CREATE_ERROR,
    error
  };
}

export function crudActionCreateSuccess(payload) {
  console.log(
    "payload received from API yeild in crudActionCreate function in action is",
    payload
  );
  return {
    type: CRUD_CONST_CREATE_SUCCESS,
    payload
  };
}

/*
  * READ ACTIONS
*/

export function crudActionRead({ id, model }) {
  console.log("in crudActionRead Action id :: ", id);
  console.log("in crudActionRead Action model ::", model);
  return {
    type: CRUD_CONST_READ,
    id,
    model
  };
}

export function crudActionReadError(error) {
  return {
    type: CRUD_CONST_READ_ERROR,
    error
  };
}

export function crudActionReadSuccess(payload) {
  console.log(
    "payload received from API yeild in crudActionRead function in action is",
    payload
  );
  return {
    type: CRUD_CONST_READ_SUCCESS,
    payload
  };
}

/*
  * UPDATE ACTIONS
*/

export function crudActionUpdate({ data, id, model }) {
  console.log("in crudActionUpdate Action data", data);
  console.log("in crudActionUpdate Action id", id);
  console.log("in crudActionUpdate Action model", model);
  return {
    type: CRUD_CONST_UPDATE,
    data,
    id,
    model
  };
}

export function crudActionUpdateError(error) {
  return {
    type: CRUD_CONST_UPDATE_ERROR,
    error
  };
}

export function crudActionUpdateSuccess(payload) {
  console.log(
    "payload received from API yeild in crudActionUpdate function in action is",
    payload
  );
  return {
    type: CRUD_CONST_UPDATE_SUCCESS,
    payload
  };
}

/*
  * UPDATE ITEM ACTIONS
*/

export function crudActionUpdateItem({ id, model }) {
  console.log("in crudActionUpdateItem Action id", id);
  console.log("in crudActionUpdateItem Action model", model);
  return {
    type: CRUD_CONST_UPDATE_ITEM,
    id,
    model
  };
}


export function crudActionUpdateItemError(error) {
  return {
    type: CRUD_CONST_UPDATE_ITEM_ERROR,
    error
  };
}

export function crudActionUpdateItemSuccess(payload) {
  console.log(
    "payload received from API yeild in crudActionUpdateItem function in action is",
    payload
  );
  return {
    type: CRUD_CONST_UPDATE_ITEM_SUCCESS,
    payload
  };
}

/*
  * DELETE ACTIONS
*/

export function crudActionDelete({ id, model }) {
  console.log("in crudActionDelete Action id", id);
  console.log("in crudActionDelete Action model", model);
  return {
    type: CRUD_CONST_DELETE,
    id,
    model
  };
}

export function crudActionDeleteError(error) {
  return {
    type: CRUD_CONST_DELETE_ERROR,
    error
  };
}

export function crudActionDeleteSuccess(payload) {
  console.log(
    "payload deleted from API yeild in crudActionDelete function in action is",
    payload
  );
  return {
    type: CRUD_CONST_DELETE_SUCCESS,
    payload
  };
}

/*
  * API ACTIONS
*/

export function crudActionApiData(tenantId, skip, take) {
  console.log("in crudActionApiData Action", tenantId);
  return {
    type: CRUD_CONST_APIDATA,
    tenantId,
    skip,
    take
  };
}

export function crudActionApiDataError(error) {
  return {
    type: CRUD_CONST_APIDATA_ERROR,
    error
  };
}

export function crudActionApiDataSuccess(apiData) {
  console.log(
    "payload received from API yeild in crudActionApiData function in action is",
    apiData
  );
  return {
    type: CRUD_CONST_APIDATA_SUCCESS,
    apiData
  };
}
