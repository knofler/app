/*
 * Channel dummy data
 *
 * This contains defalut Channel dummy data.
 */

const workFlowFormStructure = [
  {
    name: "Name",
    type: "input",
    className: "form-control",
    id: "container-search",
    label: "Channel Name"
  },
  {
    name: "Type",
    type: "select",
    options: [
      "UDP_PUSH",
      "RTP_PUSH",
      "RTMP_PUSH",
      "RTMP_PULL",
      "URL_PULL",
      "MP4_FILE",
      "MEDIACONNECT"
    ],
    className: "form-control",
    label: "Stream Type"
  }
  // {
  //   name: "input",
  //   label: "Inputs",
  //   type: "select",
  //   options: ["News", "iView", "Radio"]
  // }
];
export default workFlowFormStructure;
