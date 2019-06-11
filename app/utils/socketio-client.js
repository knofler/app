/* eslint-disable no-console */
import openSocket from "socket.io-client";

const herokuAPIURL = "https://aframework-api.herokuapp.com";
const getUrl = process.env.API_URL || herokuAPIURL;
console.log("getUrl in Socket is :", getUrl);
const socket = openSocket(getUrl);

function subscribeToTimer(cb) {
  socket.on("timer", timestamp => cb(null, timestamp));
  socket.emit("subscribeToTimer", 10000);
}

function subscribeToApiData(cb) {
  console.log("socket Api Data being called");
  socket.on("get_data", timestamp => cb(null, timestamp));
}

function subscribeToAddData(data) {
  socket.emit("add_data", data);
}
export { socket, subscribeToTimer, subscribeToApiData, subscribeToAddData };
