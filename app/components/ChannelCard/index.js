/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable comma-dangle */
/* eslint-disable react/button-has-type */
/**
 *
 * ChannelCard
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import CrudControl from "components/CrudControl";
import ChannelControl from "components/ChannelControl";
import messages from "./messages";

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 4px;
  margin-bottom: 25px;
  padding: 10px;
  overflow: hidden;
  color: black;
  text-decoration: none;
`;

const Image = styled.img`
  width: 46%;
  float: left;
  margin: 10px;
`;

/* eslint-disable react/prefer-stateless-function */
class ChannelCard extends React.Component {
  componentDidMount() {
    // this.props.click();
  }

  handleClick = id => {
    console.log("this is:", this);
    console.log("id is :", id);
    console.log("whatever");
  };

  render() {
    // console.log("props", this.props);
    return (
      <div>
        {/* <FormattedMessage {...messages.header} /> */}
        <Wrapper>
          <div className="cardBox">
            <div className="metaName">
              <span className="green_span">
                Document ID :: {this.props.cuid}
              </span>
              <div className="created_at">
                Created at :: {this.props.created_at}
              </div>
            </div>
            <div className="channelBox">
              <h4 className="subH4"> Channel :: {this.props.channelName} </h4>
              <div className="channelSubBox">
                <h5 className="subH5">Channel ID :: {this.props.channelId} </h5>
                <h5 className="subH5">
                  Channel Class :: {this.props.channelClass}
                </h5>
              </div>
            </div>

            <div className="inputBox">
              <h4 className="subH4"> Input :: {this.props.inputName}</h4>
              <div className="inputSubBox">
                <h5 className="subH5">Input ID :: {this.props.inputId}</h5>
                <h5 className="subH5">
                  Input Class :: {this.props.inputClass}
                </h5>
                <h5 className="subH5">Input Type :: {this.props.inputType} </h5>
              </div>
            </div>

            <div className="destBox">
              <div className="destSubBox">
                <span className="new_span">
                  Destination-1 IP :: {this.props.destinationsOneIp}
                </span>
                <span className="new_span">
                  Destination-1 Port :: {this.props.destinationsOnePort}{" "}
                </span>
                <span className="new_span">
                  Destination-1 URL :: {this.props.destinationsOneUrl}{" "}
                </span>
              </div>
              <div className="destSubBox">
                <span className="new_span">
                  Destination-2 IP :: {this.props.destinationsTwoIp}
                </span>
                <span className="new_span">
                  Destination-2 Port :: {this.props.destinationsTwoPort}{" "}
                </span>
                <span className="new_span">
                  Destination-2 URL :: {this.props.destinationsTwoUrl}{" "}
                </span>
              </div>
            </div>

            <div className="controlPanel">
              <CrudControl
                clickEdit={this.props.clickEdit}
                clickDel={this.props.clickDel}
              />
              <ChannelControl
                clickStart={this.props.clickStartChannel}
                clickStop={this.props.clickStopChannel}
              />
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

ChannelCard.propTypes = {
  data: PropTypes.array
};

export default ChannelCard;
