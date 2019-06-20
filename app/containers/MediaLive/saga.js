/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/*
*
* MEDIALIVE saga
*
*/

import { all, call, put, takeLatest } from "redux-saga/effects";
import { socket } from "utils/socketio-client";
import {
  MEDIALIVE_CONST_ADD_POST,
  MEDIALIVE_CONST_ADD_AWS_GET,
  MEDIALIVE_CONST_ADD_AWS_POST
} from "./constants";

import {
  mediaLiveActionAWSGetSuccess,
  mediaLiveActionAWSGetError,
  mediaLiveActionAddSuccess,
  mediaLiveActionAddError,
  mediaLiveActionAddAwsSuccess,
  mediaLiveActionAddAwsError
} from "./actions";

const herokuAPIURL = "https://aframework-api.herokuapp.com";
const model = "/api/orders";
const getUrl = process.env.API_URL || herokuAPIURL;
const url = getUrl + model;

console.log("process.env.API_URL", process.env.API_URL);
console.log("herokuAPIURL is", herokuAPIURL);
console.log("url is ", url);

// Load Functions on Event Change

function* mediaLiveSagaAwsGet() {
  yield takeLatest(MEDIALIVE_CONST_ADD_AWS_GET, fetchMediaLiveAwsGet);
}

function* mediaLiveSagaAwsPost() {
  yield takeLatest(MEDIALIVE_CONST_ADD_AWS_POST, fetchMediaLiveAwsPost);
}

function* mediaLiveSagaAdd() {
  yield takeLatest(MEDIALIVE_CONST_ADD_POST, fetchMediaLiveAdd);
}

function* fetchMediaLiveAwsGet(action) {
  try {
    // MEDIALIVE_CONST_ADD_AWS_GET event action and api call
    console.log("MEDIALIVE_CONST_ADD_AWS_GET constant's action :: ", action);
    const mediaLiveAWSUrl = `${getUrl}/api/aws/${action.model}`;
    console.log("mediaLiveAWSUrl:", mediaLiveAWSUrl);
    const response = yield call(fetch, mediaLiveAWSUrl);
    const responseBody = yield response.json();
    console.log(
      "responseBody of MEDIALIVE_CONST_ADD_AWS_GET  in saga is",
      responseBody
    );
    yield put(mediaLiveActionAWSGetSuccess(responseBody.message));
  } catch (error) {
    yield put(mediaLiveActionAWSGetError(error));
  }
}

function* fetchMediaLiveAwsPost(action) {
  let dbData = {};
  try {
    // CRUD_CONST_MEDIALIVE event action and api call
    console.log(
      "MEDIALIVE_CONST_ADD_AWS_POST constant's action in saga is:: ",
      action
    );
    console.log(
      "MEDIALIVE_CONST_ADD_AWS_POST constant's action.input in saga is:: ",
      action.input
    );
    console.log(
      "MEDIALIVE_CONST_ADD_AWS_POST constant's action.model in saga is:: ",
      action.model
    );

    if (action.input !== undefined && action.model !== undefined) {
      const mediaLiveUrl = `${getUrl}/api/${action.model}`;
      const mediaLiveAWSUrl = `${getUrl}/api/aws/${action.model}`;
      console.log("mediaLiveUrl:", mediaLiveUrl);
      console.log("mediaLiveAWSUrl:", mediaLiveAWSUrl);

      const awsResponse = yield call(fetch, mediaLiveAWSUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.input)
      });
      const awsResponseBody = yield awsResponse.json();
      console.log(
        "awsResponseBody of MEDIALIVE_CONST_ADD_POST_AWS in saga is",
        awsResponseBody
      );
      if (
        awsResponseBody.message.channelData &&
        awsResponseBody.message.inputData
      ) {
        dbData = {
          channelId: awsResponseBody.message.channelData.Channel.Id,
          channelName: awsResponseBody.message.channelData.Channel.Name,
          channelClass:
            awsResponseBody.message.channelData.Channel.ChannelClass,
          inputId: awsResponseBody.message.inputData.Input.Id,
          inputName: awsResponseBody.message.inputData.Input.Name,
          inputClass: awsResponseBody.message.inputData.Input.InputClass,
          inputType: awsResponseBody.message.inputData.Input.Type,
          destinationsOneIp:
            awsResponseBody.message.inputData.Input.Destinations[0].Ip,
          destinationsOnePort:
            awsResponseBody.message.inputData.Input.Destinations[0].Port,
          destinationsOneUrl:
            awsResponseBody.message.inputData.Input.Destinations[0].Url,
          destinationsTwoIp:
            awsResponseBody.message.inputData.Input.Destinations[1].Ip,
          destinationsTwoPort:
            awsResponseBody.message.inputData.Input.Destinations[1].Port,
          destinationsTwoUrl:
            awsResponseBody.message.inputData.Input.Destinations[1].Url
        };
      }

      let response = {};
      if (action.apiAction === "POST") {
        response = yield call(fetch, mediaLiveUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dbData)
        });
      } else if (action.apiAction === "PRE") {
        response = yield call(fetch, mediaLiveUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(action.input)
        });
      }
      const responseBody = yield response.json();
      console.log(
        "responseBody of MEDIALIVE_CONST_ADD_POST_AWS in saga is",
        responseBody
      );

      if (!responseBody.errors) {
        window.localStorage.setItem(
          "MediaLive-data",
          JSON.stringify(responseBody)
        );
        yield put(mediaLiveActionAddSuccess(responseBody));
        socket.emit("add_data", responseBody);
      }
      if (!awsResponseBody.errors) {
        window.localStorage.setItem(
          "MediaLive-AWS-data",
          JSON.stringify(awsResponseBody)
        );
        yield put(mediaLiveActionAddAwsSuccess(awsResponseBody));
        socket.emit("add_aws_data", awsResponseBody);
      }
    }
  } catch (error) {
    yield put(mediaLiveActionAddError(error));
    yield put(mediaLiveActionAddAwsError(error));
  }
}

function* fetchMediaLiveAdd(action) {
  try {
    // CRUD_CONST_MEDIALIVE event action and api call
    console.log(
      "MEDIALIVE_CONST_ADD_POST constant's action in saga is:: ",
      action
    );
    console.log(
      "MEDIALIVE_CONST_ADD constant's action.data in saga is:: ",
      action.input
    );
    console.log(
      "MEDIALIVE_CONST_ADD_POST constant's action.model in saga is:: ",
      action.model
    );

    if (action.input !== undefined && action.model !== undefined) {
      const mediaLiveUrl = `${getUrl}/api/${action.model}`;
      console.log("mediaLiveUrl:", mediaLiveUrl);
      const response = yield call(fetch, mediaLiveUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.input)
      });
      const responseBody = yield response.json();
      console.log(
        "responseBody of mediaLive_CONST_ADD_POST in saga is",
        responseBody
      );
      if (!responseBody.errors) {
        window.localStorage.setItem(
          "MediaLive-data",
          JSON.stringify(responseBody)
        );
        yield put(mediaLiveActionAddSuccess(responseBody));
        socket.emit("add_data", responseBody);
      }
    }
  } catch (error) {
    yield put(mediaLiveActionAddError(error));
  }
}

// Individual exports for testing
export default function* mediaLiveSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    mediaLiveSagaAdd(),
    mediaLiveSagaAwsPost(),
    mediaLiveSagaAwsGet()
  ]);
}
