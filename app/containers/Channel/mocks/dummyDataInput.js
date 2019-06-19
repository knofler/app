/* eslint-disable comma-dangle */
/*
 * Input dummy data
 *
 * This contains defalut Input dummy data.
 */

const inputFormStructure = [
  {
    name: "Name",
    type: "input",
    className: "form-control",
    label: "Input Name"
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
  //   {
  //     name: "InputSecurityGroups",
  //     type: "input",
  //     className: "form-control",
  //     label: "Input Security Groups"
  //   }
  //   name: "input",
  //   label: "Inputs",
  //   type: "select",
  //   options: ["News", "iView", "Radio"]
  // }
];
export default inputFormStructure;
