/* eslint-disable no-console */

/**
 *
 * Read
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Card from "components/Card";
import Create from "containers/Create/Loadable";
import Update from "containers/Update/Loadable";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { socket, subscribeToTimer } from "utils/socketio-client";
import { readActionApiData } from "./actions";

import { makeSelectRead, makeReadApiDataSelector } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import ReadForm from "./mocks/dummyData";
import "./Read.css";

/* eslint-disable react/prefer-stateless-function */
export class Read extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      update: false,
      deploy: true,
      data: [],
      id: "",
      timestamp: "no timestamp yet"
    };
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
  }

  componentDidMount() {
    // load API Data
    this.props.readDispatchApiData({
      model: "orders"
    });
    socket.on("get_add_data", data => {
      console.log("add data recieved", data);
      this.props.readDispatchApiData({
        model: "orders"
      });
    });
    socket.on("save", data => {
      console.log("On read:save Add event, socket call", data);
    });
    socket.on("get_update_data", data => {
      console.log("update data recieved", data);
      this.props.readDispatchApiData({
        model: "orders"
      });
    });
    socket.on("get_delete_data", data => {
      console.log("delete data recieved", data);
      this.props.readDispatchApiData({
        model: "orders"
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("next CompWillReciProp Testprops", nextProps);
    console.log("this CompWillReciProp Testprops", this.props.readPropsApiData);
    if (nextProps.readPropsApiData !== this.props.readPropsApiData) {
      this.setState({
        data: nextProps.readPropsApiData
      });
    } else {
      this.setState({
        data: this.props.readPropsApiData
      });
    }
  }

  /**
   *
   * CRUD FUNCTIONS STATE CONTROL
   *
   */
  addFormButton = e => {
    e.preventDefault();
    this.setState({
      add: true,
      deploy: false
    });
  };

  clickUpdate = (id, e) => {
    console.log("clickupdate being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    this.setState({
      update: true,
      deploy: false,
      id
    });
  };

  clickDelete = (id, e) => {
    console.log("clicDelete being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    alert("You sure you want to delete?");
    this.setState({
      id
    });
  };

  backButton = () => {
    this.setState({
      deploy: true,
      add: false,
      update: false
    });
  };

  render() {
    if (this.state.add) {
      return (
        <div>
          <Helmet>
            <title>Read</title>
            <meta name="description" content="Description of Read" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button type="button" onClick={this.backButton}>
              Back
            </button>
          </div>
          <Create
            formStructure={ReadForm}
            model="orders"
            deploy={this.state.add}
          />
        </div>
      );
    }
    if (this.state.update) {
      return (
        <div>
          <Helmet>
            <title>Read</title>
            <meta name="description" content="Description of Read" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button type="button" onClick={this.backButton}>
              Back
            </button>
          </div>
          <Update
            id={this.state.id}
            formStructure={ReadForm}
            model="orders"
            deploy={this.state.update}
          />
        </div>
      );
    }
    if (this.state.deploy) {
      return (
        <div>
          <Helmet>
            <title>Read</title>
            <meta name="description" content="Description of Read" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button type="button" onClick={e => this.addFormButton(e)}>
              ADD Form
            </button>
          </div>
          <div>
            <p className="App-intro">
              This is the timer value: {this.state.timestamp}
            </p>
          </div>

          <div>
            {this.state.data.map(each => (
              <div>
                <Card
                  key={each.id}
                  {...each}
                  clickEdit={e => this.clickUpdate(each.cuid, e)}
                  clickDel={e => this.clickDelete(each.cuid, e)}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

Read.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  readPropsApiData: PropTypes.array,
  readDispatchApiData: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  //read: makeSelectRead(),
  readPropsApiData: makeReadApiDataSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    readDispatchApiData: ({ model, id }) =>
      dispatch(readActionApiData({ model, id }))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "read", reducer });
const withSaga = injectSaga({ key: "read", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Read);
