/* eslint-disable react/button-has-type */
/**
 *
 * ChannelControl
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormattedMessage } from "react-intl";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
class ChannelControl extends React.Component {
  render() {
    return (
      <div className="channelCtr">
        {/* <FormattedMessage {...messages.header} /> */}
        <td>
          <p
            className="tinyBtn"
            data-placement="top"
            data-toggle="tooltip"
            title="Start"
          >
            <button
              className="btn btn-info btn-xs"
              data-title="Start"
              data-toggle="modal"
              data-target="#start"
              onClick={this.props.clickStart}
            >
              <span className="glyphicon glyphicon-play" />
            </button>
          </p>
        </td>
        <td>
          <p
            className="tinyBtn"
            data-placement="top"
            data-toggle="tooltip"
            title="End"
          >
            <button
              className="btn btn-danger btn-xs"
              data-title="Stop"
              data-toggle="modal"
              data-target="#stop"
              onClick={this.props.clickStop}
            >
              <span className="glyphicon glyphicon-stop" />
            </button>
          </p>
        </td>
      </div>
    );
  }
}

ChannelControl.propTypes = {
  clickStart: PropTypes.func,
  clickStop: PropTypes.func,
};

export default ChannelControl;
