/**
 *  Read Container Generator
 */

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add a container component",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the base component type:",
      default: "Stateless Function",
      choices: () => [
        "Stateless Function",
        "React.PureComponent",
        "React.Component"
      ]
    },
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "read",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component or container with this name already exists"
            : true;
        }

        return "The name is required";
      }
    },
    {
      type: "input",
      name: "model",
      message: "What data model it will connect?",
      default: "orders",
    },
    {
      type: "confirm",
      name: "wantHeaders",
      default: false,
      message: "Do you want headers?"
    },
    {
      type: "confirm",
      name: "wantActionsAndReducer",
      default: true,
      message:
        "Do you want an actions/constants/selectors/reducer tuple for this container?"
    },
    {
      type: "confirm",
      name: "wantSaga",
      default: true,
      message: "Do you want sagas for asynchronous flows? (e.g. fetching data)"
    },
    {
      type: "confirm",
      name: "wantCRUD",
      default: true,
      message: "Do you want CRUD Functionality on your page?"
    },
    {
      type: "confirm",
      name: "wantSocket",
      default: true,
      message: "Do you Socket connect to live data update?",
    },
    {
      type: "confirm",
      name: "wantMessages",
      default: true,
      message: "Do you want i18n messages (i.e. will this component use text)?"
    },
    {
      type: "confirm",
      name: "wantLoadable",
      default: true,
      message: "Do you want to load resources asynchronously?"
    },
    {
      type: "confirm",
      name: "wantCSS",
      default: true,
      message: "Do you want Default CSS?"
    },
    {
      type: "confirm",
      name: "wantDummyData",
      default: true,
      message: "Do you want dummy data for Forms?"
    },
    {
      type: "confirm",
      name: "wantSearch",
      default: true,
      message: "Do you want Search for this container?"
    }
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case "Stateless Function": {
        componentTemplate = "./read/stateless.js.hbs";
        break;
      }
      default: {
        componentTemplate = "./read/class.js.hbs";
      }
    }

    const actions = [
      {
        type: "add",
        path: "../../app/containers/{{properCase name}}/index.js",
        templateFile: componentTemplate,
        abortOnFail: true
      },
      {
        type: "add",
        path: "../../app/containers/{{properCase name}}/tests/index.test.js",
        templateFile: "./read/test.js.hbs",
        abortOnFail: true
      }
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/messages.js",
        templateFile: "./read/messages.js.hbs",
        abortOnFail: true
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/actions.js",
        templateFile: "./read/actions.js.hbs",
        abortOnFail: true
      });
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/tests/actions.test.js",
        templateFile: "./read/actions.test.js.hbs",
        abortOnFail: true
      });

      // Constants
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/constants.js",
        templateFile: "./read/constants.js.hbs",
        abortOnFail: true
      });

      // Selectors
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/selectors.js",
        templateFile: "./read/selectors.js.hbs",
        abortOnFail: true
      });
      actions.push({
        type: "add",
        path:
          "../../app/containers/{{properCase name}}/tests/selectors.test.js",
        templateFile: "./read/selectors.test.js.hbs",
        abortOnFail: true
      });

      // Reducer
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/reducer.js",
        templateFile: "./read/reducer.js.hbs",
        abortOnFail: true
      });
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/tests/reducer.test.js",
        templateFile: "./read/reducer.test.js.hbs",
        abortOnFail: true
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/saga.js",
        templateFile: "./read/saga.js.hbs",
        abortOnFail: true
      });
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/tests/saga.test.js",
        templateFile: "./read/saga.test.js.hbs",
        abortOnFail: true
      });
    }

    // Dummy Data
    if (data.wantDummyData) {
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/mocks/dummyData.js",
        templateFile: "./read/mocks/dummyData.js.hbs",
        abortOnFail: true
      });
    }
    // Loadable
    if (data.wantLoadable) {
      actions.push({
        type: "add",
        path: "../../app/containers/{{properCase name}}/Loadable.js",
        templateFile: "./component/loadable.js.hbs",
        abortOnFail: true
      });
    }

    // CRUD
    // if (data.wantCRUD) {
    //   actions.push({
    //     type: "add",
    //     path: "../../app/containers/{{properCase name}}/Loadable.js",
    //     templateFile: "./component/loadable.js.hbs",
    //     abortOnFail: true,
    //   });
    // }

    // SOCKET
    // if (data.wantSocket) {
    //   actions.push({
    //     type: "add",
    //     path: "../../app/containers/{{properCase name}}/Loadable.js",
    //     templateFile: "./component/loadable.js.hbs",
    //     abortOnFail: true,
    //   });
    // }

    // If wants CSS
    if (data.wantCSS) {
      actions.push({
        type: "add",
        path:
          "../../app/containers/{{properCase name}}/{{ properCase name}}.css",
        templateFile: "./read/read.css.hbs",
        abortOnFail: true
      });
    }

    actions.push({
      type: "prettify",
      path: "/containers/"
    });

    return actions;
  }
};
