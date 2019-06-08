/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/*
*
* CRUD saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";

import {
  CRUD_CONST_APIDATA,
  CRUD_CONST_CREATE,
  CRUD_CONST_READ,
  CRUD_CONST_UPDATE,
  CRUD_CONST_UPDATE_ITEM,
  CRUD_CONST_DELETE,
} from "./constants";

import {
  crudActionApiDataSuccess,
  crudActionApiDataError,
  crudActionCreateSuccess,
  crudActionCreateError,
  crudActionReadSuccess,
  crudActionReadError,
  crudActionUpdateSuccess,
  crudActionUpdateError,
  crudActionUpdateItemSuccess,
  crudActionUpdateItemError,
  crudActionDeleteSuccess,
  crudActionDeleteError,
} from "./actions";

const herokuAPIURL = "https://mernaircanteen.herokuapp.com";
const model = "/api/chefs";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

// Load Functions on Event Change

function* crudSagaApiData() {
  yield takeLatest(CRUD_CONST_APIDATA, fetchCrudApiData);
}
function* crudSagaCreate() {
  yield takeLatest(CRUD_CONST_CREATE, fetchCrudCreate);
}
function* crudSagaRead() {
  yield takeLatest(CRUD_CONST_READ, fetchCrudRead);
}
function* crudSagaUpdate() {
  yield takeLatest(CRUD_CONST_UPDATE, fetchCrudUpdate);
}

function* crudSagaUpdateItem() {
  yield takeLatest(CRUD_CONST_UPDATE_ITEM, fetchCrudUpdateItem);
}

function* crudSagaDelete() {
  yield takeLatest(CRUD_CONST_DELETE, fetchCrudDelete);
}

// Fetch Functions for API interaction

/**
 * API SAGA
 */

function* fetchCrudApiData(action) {
  try {
    // CRUD_CONST_API_DATA event action and api call
    console.log("CRUD_CONST_API_DATA constant's action in saga is :: ", action);

    const response = yield call(fetch, url);
    const responseBody = yield response.json();
    console.log(
      "responseBody of CRUD_CONST_API_DATA  in saga is",
      responseBody
    );
    yield put(crudActionApiDataSuccess(responseBody.data));
  } catch (error) {
    yield put(crudActionApiDataError(error));
  }
}

/**
 * CREATE SAGA
 */

function* fetchCrudCreate(action) {
  try {
    // CRUD_CONST_CREATE event action and api call
    console.log("CRUD_CONST_CREATE constant's action in saga is:: ", action);
    console.log(
      "CRUD_CONST_CREATE constant's action.data in saga is:: ",
      action.data
    );
    console.log(
      "CRUD_CONST_CREATE constant's action.model in saga is:: ",
      action.model
    );

    if (action.data !== undefined && action.model !== undefined) {
      const createUrl = `${getUrl}/api/${action.model}`;
      console.log("createUrl:", createUrl);
      const response = yield call(fetch, createUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      const responseBody = yield response.json();
      console.log("responseBody of CRUD_CONST_CREATE in saga is", responseBody);
      if (!responseBody.errors) {
        window.localStorage.setItem("create-data", JSON.stringify(responseBody));
        yield put(crudActionCreateSuccess(responseBody));
      }
    }
  } catch (error) {
    yield put(crudActionCreateError(error));
  }
}

/**
 * READ SAGA
 */

function* fetchCrudRead(action) {
  try {
    // CRUD_CONST_READ event action and api call
    console.log("CRUD_CONST_READ constant's action in saga is:: ", action);
    console.log(
      "CRUD_CONST_READ constant's action.id in saga is:: ",
      action.id
    );
    console.log(
      "CRUD_CONST_READ constant's action.model in saga is:: ",
      action.model
    );
    let readUrl = ""
    if (action.model !== undefined) {
      if (action.id !== undefined) {
        readUrl = `${getUrl}/api/${action.model}/${action.id}`;
      } else {
        readUrl = `${getUrl}/api/${action.model}`;
      }
    }
    console.log("readUrl:", readUrl);
    const response = yield call(fetch, readUrl);
    const responseBody = yield response.json();
    console.log("responseBody of CRUD_CONST_READ  in saga is", responseBody);
    yield put(crudActionReadSuccess(responseBody.data));
  } catch (error) {
    yield put(crudActionReadError(error));
  }
}

/**
 * UPDATE SAGA
 */

function* fetchCrudUpdate(action) {
  try {
    // CRUD_CONST_UPDATE event action and api call
    console.log("CRUD_CONST_UPDATE constant's action in saga is:: ", action);
    console.log(
      "CRUD_CONST_UPDATE constant's action.id in saga is:: ",
      action.id
    );
    console.log(
      "CRUD_CONST_UPDATE constant's action.model in saga is:: ",
      action.model
    );
    console.log(
      "CRUD_CONST_UPDATE constant's action.data in saga is:: ",
      action.data
    );

    if (
      action.data !== undefined &&
      action.model !== undefined &&
      action.id !== undefined
    ) {
      const updateUrl = `${getUrl}/api/${action.model}/${action.id}`;
      console.log("updateUrl:", updateUrl);

      // Get update item first
      const updateItem = yield call(fetch, updateUrl);
      const updateBody = yield updateItem.json();
      console.log("updateBody of CRUD_CONST_UPDATE_ITEM in saga is", updateBody);
      window.localStorage.setItem("update-item", JSON.stringify(updateBody));
      try {
        yield put(crudActionUpdateItemSuccess(updateBody));
      } catch (error) {
        yield put(crudActionUpdateItemError(error));
      }

      const response = yield call(fetch, updateUrl, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.data),
      });
      const responseBody = yield response.json();
      console.log("responseBody of CRUD_CONST_UPDATE in saga is", responseBody);
      window.localStorage.setItem("update-data", JSON.stringify(responseBody));
      yield put(crudActionUpdateSuccess(responseBody));
    }
  } catch (error) {
    yield put(crudActionUpdateError(error));
  }
}

/**
   * UPDATE ITEM SAGA
*/

function* fetchCrudUpdateItem(action) {
  try {
    // CRUD_CONST_UPDATE_ITEM event action and api call
    console.log("CRUD_CONST_UPDATE_ITEM constant's action in saga is:: ", action);
    console.log(
      "CRUD_CONST_UPDATE_ITEM constant's action.id in saga is:: ",
      action.id
    );
    console.log(
      "CRUD_CONST_UPDATE_ITEM constant's action.model in saga is:: ",
      action.model
    );
  

    if (
      action.model !== undefined &&
      action.id !== undefined
    ) {
      const updateUrl = `${getUrl}/api/${action.model}/${action.id}`;
      console.log("updateUrl:", updateUrl);

      // Get update item first
      const updateItem = yield call(fetch, updateUrl);
      const updateBody = yield updateItem.json();
      console.log("updateBody of CRUD_CONST_UPDATE_ITEM in saga is", updateBody);
      window.localStorage.setItem("update-item", JSON.stringify(updateBody));
      yield put(crudActionUpdateItemSuccess(updateBody));
    }
  } catch (error) {
    yield put(crudActionUpdateItemError(error));
  }
}

/**
 * DELETE SAGA
 */

function* fetchCrudDelete(action) {
  try {
  // CRUD_CONST_DELETE event action and api call
    console.log("CRUD_CONST_DELETE constant's action in saga is:: ", action);
    console.log(
      "CRUD_CONST_DELETE constant's action.id in saga is:: ",
      action.id
    );
    console.log(
      "CRUD_CONST_DELETE constant's action.model in saga is:: ",
      action.model
    );


    if (
      action.model !== undefined &&
      action.id !== undefined
    ) {
      const deleteUrl = `${getUrl}/api/${action.model}/${action.id}`;
      console.log("deleteUrl:", deleteUrl);
      const response = yield call(fetch, deleteUrl, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const responseBody = yield response.json();
      console.log("responseBody of CRUD_CONST_DELETE in saga is", responseBody);
      window.localStorage.setItem("delete-data", JSON.stringify(responseBody));
      yield put(crudActionDeleteSuccess(responseBody));
    }
  } catch (error) {
    yield put(crudActionDeleteError(error));
  }
}

// Individual exports for testing
export default function* crudSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    crudSagaApiData(),
    crudSagaCreate(),
    crudSagaRead(),
    crudSagaUpdate(),
    crudSagaUpdateItem(),
    crudSagaDelete(),
  ]);
}
