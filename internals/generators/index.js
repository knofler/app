/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const componentGenerator = require("./component/index.js");
const basicContainerGenerator = require("./basicContainer/index.js");
const containerGenerator = require("./container/index.js");
const readGenerator = require("./read/index.js");
const createGenerator = require("./create/index.js");
const updateGenerator = require("./update/index.js");
const deleteGenerator = require("./delete/index.js");
const languageGenerator = require("./language/index.js");

module.exports = plop => {
  plop.setGenerator("component", componentGenerator);
  plop.setGenerator("BasicContainer", basicContainerGenerator);
  plop.setGenerator("container", containerGenerator);
  plop.setGenerator("read", readGenerator);
  plop.setGenerator("create", createGenerator);
  plop.setGenerator("update", updateGenerator);
  plop.setGenerator("delete", deleteGenerator);
  plop.setGenerator("language", languageGenerator);
  plop.addHelper("directory", comp => {
    try {
      fs.accessSync(
        path.join(__dirname, `../../app/containers/${comp}`),
        fs.F_OK
      );
      return `containers/${comp}`;
    } catch (e) {
      return `components/${comp}`;
    }
  });
  plop.addHelper("curly", (object, open) => (open ? "{" : "}"));
  plop.setActionType("prettify", (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      "/../../app/",
      config.path,
      plop.getHelper("properCase")(answers.name),
      "**.js"
    )}`;
    exec(`npm run prettify -- "${folderPath}"`);
    return folderPath;
  });
};
