/* eslint-disable no-console */

/**
 *
 * Channel
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
import ChannelCard from "components/ChannelCard";
import Create from "containers/Create/Loadable";
import MediaLive from "containers/MediaLive/Loadable";
import Update from "containers/Update/Loadable";
import Delete from "containers/Delete/Loadable";
import SearchBox from "components/SearchBox";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { socket, subscribeToTimer } from "utils/socketio-client";
import { channelActionApiData } from "./actions";

import {
  // makeSelectChannel,
  makeChannelApiDataSelector
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";
import ChannelForm from "./mocks/dummyDataChannel";
import InputForm from "./mocks/dummyDataInput";
import WorkflowForm from "./mocks/dummyDataWorkflow";
import "./Channel.css";

/* eslint-disable react/prefer-stateless-function */
export class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchTerm: "",
      id: "",
      add: false,
      update: false,
      delete: false,
      read: true,
      modelInput: "inputs",
      createInput: false,
      formStructureInput: InputForm,
      modelChannel: "channels",
      formStructureChannel: ChannelForm,
      createChannel: false,
      modelWorkflow: "workflows",
      formStructureWorkflow: WorkflowForm,
      createWorkflow: false,
    };
    // subscribeToTimer((err, timestamp) =>
    //   this.setState({
    //     timestamp
    //   })
    // );
  }

  componentDidMount() {
    // load API Data
    this.props.channelDispatchApiData({
      model: this.state.model,
    });
    socket.on("get_add_data", data => {
      console.log("add data recieved", data);
      this.props.channelDispatchApiData({
        model: this.state.model,
      });
    });
    socket.on("save", data => {
      console.log("On channel:save Add event, socket call", data);
    });
    socket.on("get_update_data", data => {
      console.log("update data recieved", data);
      this.props.channelDispatchApiData({
        model: this.state.model,
      });
    });
    socket.on("get_delete_data", data => {
      console.log("delete data recieved", data);
      this.props.channelDispatchApiData({
        model: this.state.model,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("next CompWillReciProp Testprops", nextProps);
    console.log(
      "this CompWillReciProp Testprops",
      this.props.channelPropsApiData
    );
    if (nextProps.channelPropsApiData !== this.props.channelPropsApiData) {
      this.setState({
        data: nextProps.channelPropsApiData,
      });
    } else {
      this.setState({
        data: this.props.channelPropsApiData,
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
      read: false,
    });
  };

  clickUpdate = (id, e) => {
    console.log("clickupdate being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    this.setState({
      update: true,
      read: false,
      id,
    });
  };

  clickDelete = (id, e) => {
    console.log("clicDelete being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    // alert("You sure you want to delete?");
    this.setState({
      delete: true,
      read: false,
      id,
    });
    // console.log("Delete is :", <Delete />);
  };

  searchFunc = e => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  backButton = () => {
    this.setState({
      read: true,
      add: false,
      createInput: false,
      createChannel: false,
      createWorkflow: false,
      update: false,
      delete: false,
    });
  };

  createInputButton = e => {
    e.preventDefault();
    this.setState({
      createInput: true,
      read: false,
    });
  };

  createChannelButton = e => {
    e.preventDefault();
    this.setState({
      createChannel: true,
      read: false,
    });
  };

  createWorkflowButton = e => {
    e.preventDefault();
    this.setState({
      createWorkflow: true,
      read: false,
    });
  };

  clickStartChannel = (id, e) => {
    console.log("clickStartChannel being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    // this.setState({
    //   update: true,
    //   read: false,
    //   id,
    // });
  };

  clickStopChannel = (id, e) => {
    console.log("clickStopChannel being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    // this.setState({
    //   update: true,
    //   read: false,
    //   id,
    // });
  };

  render() {
    if (this.state.add) {
      return (
        <div>
          <Helmet>
            <title>Channel</title>
            <meta name="description" content="Description of Channel" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button
              className="btn btn-info"
              type="button"
              onClick={this.backButton}
            >
              Back
            </button>
          </div>
          <Create
            formStructure={this.state.formStructure}
            model={this.state.model}
            deploy={this.state.add}
          />
        </div>
      );
    }
    if (this.state.createInput) {
      return (
        <div>
          <Helmet>
            <title>Book</title>
            <meta name="description" content="Description of Book" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button
              className="btn btn-info"
              type="button"
              onClick={this.backButton}
            >
              Back
            </button>
          </div>
          <MediaLive
            formStructure={this.state.formStructureInput}
            model={this.state.modelInput}
            deploy={this.state.createInput}
          />
        </div>
      );
    }
    if (this.state.createChannel) {
      return (
        <div>
          <Helmet>
            <title>Book</title>
            <meta name="description" content="Description of Book" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button
              className="btn btn-info"
              type="button"
              onClick={this.backButton}
            >
              Back
            </button>
          </div>
          <MediaLive
            formStructure={this.state.formStructureChannel}
            model={this.state.modelChannel}
            deploy={this.state.createChannel}
          />
        </div>
      );
    }
    if (this.state.createWorkflow) {
      return (
        <div>
          <Helmet>
            <title>Book</title>
            <meta name="description" content="Description of Book" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button
              className="btn btn-info"
              type="button"
              onClick={this.backButton}
            >
              Back
            </button>
          </div>
          <MediaLive
            formStructure={this.state.formStructureWorkflow}
            model={this.state.modelWorkflow}
            deploy={this.state.createWorkflow}
            apiAction="POST"
          />
        </div>
      );
    }
    if (this.state.update) {
      return (
        <div>
          <Helmet>
            <title>Channel</title>
            <meta name="description" content="Description of Channel" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button
              className="btn btn-warning"
              type="button"
              onClick={this.backButton}
            >
              Back
            </button>
          </div>
          <Update
            id={this.state.id}
            formStructure={this.state.formStructureChannel}
            model={this.state.modelChannel}
            deploy={this.state.update}
          />
        </div>
      );
    }
    if (this.state.delete) {
      return (
        <div>
          <Helmet>
            <title>Book</title>
            <meta name="description" content="Description of Book" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.backButton}
            >
              Back
            </button>
          </div>
          <Delete
            id={this.state.id}
            model={this.state.modelWorkflow}
            deploy={this.state.delete}
          />
        </div>
      );
    }
    if (this.state.read) {
      return (
        <div>
          <Helmet>
            <title>Channel</title>
            <meta name="description" content="Description of Channel" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          {/* <div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={e => this.addFormButton(e)}
            >
              ADD Form
            </button>
          </div> */}
          <div className="awsCreate">
            <button
              className="btn btn-info"
              type="button"
              onClick={e => this.createInputButton(e)}
            >
              Create Input
            </button>
          </div>
          {/* <div>
            <p className="App-intro">
              This is the timer value: {this.state.timestamp}
            </p>
          </div> */}
          <div className="awsCreate">
            <button
              className="btn btn-success"
              type="button"
              onClick={e => this.createChannelButton(e)}
            >
              Create Channel
            </button>
          </div>

          <div className="awsCreate">
            <button
              className="btn btn-warning"
              type="button"
              onClick={e => this.createWorkflowButton(e)}
            >
              Create Workflow
            </button>
          </div>

          {/* <div>
            <p className="App-intro">
              This is the timer value: {this.state.timestamp}
            </p>
          </div> */}

          <div>
            <SearchBox
              searchFunc={e => {
                this.searchFunc(e);
              }}
              searchTerm={this.state.searchTerm}
            />
          </div>

          <div>
            {this.state.data
              .filter(
                each =>
                  `${each.Name} 
                   ${each.info}`
                    .toUpperCase()
                    .indexOf(this.state.searchTerm.toUpperCase()) >= 0
              )
              .map((each, index) => (
                <div>
                  <ChannelCard
                    key={each.id}
                    {...each}
                    id={index}
                    clickEdit={e => this.clickUpdate(each.cuid, e)}
                    clickDel={e => this.clickDelete(each.cuid, e)}
                    clickStartChannel={e =>
                      this.clickStartChannel(each.cuid, e)
                    }
                    clickStopChannel={e => this.clickStopChannel(each.cuid, e)}
                  />
                </div>
              ))}
          </div>
        </div>
      );
    }
  }
}

Channel.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  channelPropsApiData: PropTypes.array,
  channelDispatchApiData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // channel: makeSelectChannel(),
  channelPropsApiData: makeChannelApiDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    channelDispatchApiData: ({ model, id }) =>
      dispatch(channelActionApiData({ model, id })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "channel", reducer });
const withSaga = injectSaga({ key: "channel", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Channel);
