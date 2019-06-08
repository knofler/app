/* eslint-disable no-console */
/*
 *
 * CRUD reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  CRUD_CONST_APIDATA,
  CRUD_CONST_APIDATA_ERROR,
  CRUD_CONST_APIDATA_SUCCESS,
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
  CRUD_CONST_DELETE_ERROR,
} from "./constants";

export const initialState = fromJS({
  CRUD_STATE_APIDATA: [],
  CRUD_STATE_APIDATA_LOADING: false,
  CRUD_STATE_APIDATA_ERROR: false,
  CRUD_STATE_CREATE_PAYLOAD: {},
  CRUD_STATE_CREATE_MODEL: "",
  CRUD_STATE_CREATE_DATA: [],
  CRUD_STATE_CREATE_SUCCESS: false,
  CRUD_STATE_CREATE_ERROR: false,
  CRUD_STATE_READ_PAYLOAD: [],
  CRUD_STATE_READ_MODEL: "",
  CRUD_STATE_READ_ID: "",
  CRUD_STATE_READ_SUCCESS: false,
  CRUD_STATE_READ_ERROR: false,
  CRUD_STATE_UPDATE_PAYLOAD: {},
  CRUD_STATE_UPDATE_MODEL: "",
  CRUD_STATE_UPDATE_DATA: [],
  CRUD_STATE_UPDATE_ID: "",
  CRUD_STATE_UPDATE_SUCCESS: false,
  CRUD_STATE_UPDATE_ERROR: false,
  CRUD_STATE_METHOD: "",
  CRUD_STATE_UPDATE_ITEM: {},
  CRUD_STATE_UPDATE_ITEM_SUCCESS: false,
  CRUD_STATE_UPDATE_ITEM_ERROR: false,
  CRUD_STATE_DELETE_PAYLOAD: {},
  CRUD_STATE_DELETE_SUCCESS: false,
  CRUD_STATE_DELETE_ERROR: false,
});

function crudReducer(state = initialState, action) {
  console.log("Global reducer file being called");
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    /*
     * CRUD_CONST_CREATE
     */
    case CRUD_CONST_CREATE:
      console.log("in CRUD_CONST_CREATE,data is :: ", action.data);
      console.log("in CRUD_CONST_CREATE,model is :: ", action.model);
      return state
        .set("CRUD_STATE_CREATE_MODEL", action.model)
        .set("CRUD_STATE_CREATE_DATA", action.data)
        .set("CRUD_STATE_CREATE_ERROR", false);
    case CRUD_CONST_CREATE_SUCCESS:
      console.log(
        "in CRUD_CONST_CREATE_SUCCESS,payload is  :: ",
        action.payload
      );
      return state
        .set("CRUD_STATE_CREATE_PAYLOAD", action.payload)
        .set("CRUD_STATE_CREATE_SUCCESS", true)
        .set("CRUD_STATE_CREATE_ERROR", false);
    case CRUD_CONST_CREATE_ERROR:
      console.log("in CRUD_CONST_CREATE_ERROR,payload is  :: ", action.error);
      return state
        .set("CRUD_STATE_CREATE_SUCCESS", false)
        .set("CRUD_STATE_CREATE_ERROR", action.error);
    /*
      * CRUD_CONST_READ
      */
    case CRUD_CONST_READ:
      console.log("in CRUD_CONST_READ,id is :: ", action.id);
      console.log("in CRUD_CONST_READ,model is :: ", action.model);
      return state
        .set("CRUD_STATE_READ_ID", action.id)
        .set("CRUD_STATE_READ_MODEL", action.model)
        .set("CRUD_STATE_READ_ERROR", false);
    case CRUD_CONST_READ_SUCCESS:
      console.log("in CRUD_CONST_READ_SUCCESS,payload is  :: ", action.payload);
      return state
        .set("CRUD_STATE_READ_PAYLOAD", action.payload)
        .set("CRUD_STATE_READ_SUCCESS", true)
        .set("CRUD_STATE_READ_ERROR", false);
    case CRUD_CONST_READ_ERROR:
      console.log("in CRUD_CONST_READ_ERROR,payload is  :: ", action.error);
      return state
        .set("CRUD_STATE_READ_SUCCESS", false)
        .set("CRUD_STATE_READ_ERROR", action.error);
    /*
      * CRUD_CONST_UPDATE
      */
    case CRUD_CONST_UPDATE:
      console.log("in CRUD_CONST_UPDATE,data is :: ", action.data);
      console.log("in CRUD_CONST_UPDATE,id is :: ", action.id);
      console.log("in CRUD_CONST_UPDATE,model is :: ", action.model);
      return state
        .set("CRUD_STATE_UPDATE_ID", action.id)
        .set("CRUD_STATE_UPDATE_MODEL", action.model)
        .set("CRUD_STATE_UPDATE_DATA", action.data)
        .set("CRUD_STATE_UPDATE_ERROR", false);
    case CRUD_CONST_UPDATE_SUCCESS:
      console.log(
        "in CRUD_CONST_UPDATE_SUCCESS,payload is  :: ",
        action.payload
      );
      return state
        .set("CRUD_STATE_UPDATE_PAYLOAD", action.payload)
        .set("CRUD_STATE_UPDATE_SUCCESS", true)
        .set("CRUD_STATE_UPDATE_ERROR", false);
    case CRUD_CONST_UPDATE_ERROR:
      console.log("in CRUD_CONST_UPDATE_ERROR,payload is  :: ", action.error);
      return state
        .set("CRUD_STATE_UPDATE_SUCCESS", false)
        .set("CRUD_STATE_UPDATE_ERROR", action.error);
    /*
        * CRUD_CONST_UPDATE_ITEM
      */
    case CRUD_CONST_UPDATE_ITEM:
      console.log("in CRUD_CONST_UPDATE_ITEM,id is :: ", action.id);
      console.log("in CRUD_CONST_UPDATE_ITEM,model is :: ", action.model);
      return (
        state
          .set("CRUD_STATE_UPDATE_ID", action.id)
          .set("CRUD_STATE_UPDATE_MODEL", action.model)
          // .set("CRUD_STATE_METHOD", "update")
          .set("CRUD_STATE_UPDATE_ITEM_ERROR", false)
      );
    case CRUD_CONST_UPDATE_ITEM_SUCCESS:
      console.log(
        "in CRUD_CONST_UPDATE_ITEM_SUCCESS,payload is  :: ",
        action.payload
      );
      return state
        .set("CRUD_STATE_UPDATE_ITEM", action.payload)
        .set("CRUD_STATE_UPDATE_ITEM_SUCCESS", true)
        .set("CRUD_STATE_UPDATE_ITEM_ERROR", false);
    case CRUD_CONST_UPDATE_ITEM_ERROR:
      console.log(
        "in CRUD_CONST_UPDATE_ITEM_ERROR,payload is  :: ",
        action.error
      );
      return state
        .set("CRUD_STATE_UPDATE_ITEM_SUCCESS", false)
        .set("CRUD_STATE_UPDATE_ITEM_ERROR", action.error);
    /*
      * CRUD_CONST_DELETE
      */
    case CRUD_CONST_DELETE:
      console.log("in CRUD_CONST_DELETE,id is :: ", action.id);
      console.log("in CRUD_CONST_DELETE,model is :: ", action.model);
      return state
        .set("CRUD_STATE_DELETE_PAYLOAD", action.payload)
        .set("CRUD_STATE_DELETE_SUCCESS", true)
        .set("CRUD_STATE_DELETE_ERROR", false);
    case CRUD_CONST_DELETE_SUCCESS:
      console.log(
        "in CRUD_CONST_DELETE_SUCCESS,payload is  :: ",
        action.payload
      );
      return state
        .set("CRUD_STATE_DELETE_PAYLOAD", action.payload)
        .set("CRUD_STATE_DELETE_SUCCESS", true)
        .set("CRUD_STATE_DELETE_ERROR", false);
    case CRUD_CONST_DELETE_ERROR:
      console.log("in CRUD_CONST_DELETE_ERROR,payload is  :: ", action.error);
      return state
        .set("CRUD_STATE_DELETE_SUCCESS", false)
        .set("CRUD_STATE_DELETE_ERROR", action.error);
    /*
      * CRUD_CONST_APIDATA
      */
    case CRUD_CONST_APIDATA:
      console.log("in CRUD_CONST_APIDATA action: ", action);
      return state
        .set("CRUD_STATE_APIDATA_LOADING", true)
        .set("CRUD_STATE_APIDATA_ERROR", false);
    case CRUD_CONST_APIDATA_ERROR:
      return state
        .set("CRUD_STATE_APIDATA_LOADING", false)
        .set("CRUD_STATE_APIDATA_ERROR", action.error);
    case CRUD_CONST_APIDATA_SUCCESS:
      console.log(
        "In CRUD_CONST_APIDATA_SUCCESS reducer, action",
        action.apiData
      );
      return state
        .set("CRUD_STATE_APIDATA_LOADING", true)
        .set("CRUD_STATE_APIDATA_ERROR", false)
        .set("CRUD_STATE_APIDATA", action.apiData);

    default:
      return state;
  }
}

export default crudReducer;
