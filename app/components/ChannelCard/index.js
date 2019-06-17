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
          <h3> {this.props.Name} </h3>
          <h4> {this.props.info} </h4>
          <h6>
            <span>{this.props.created_by}</span>
            {/* <span className="green_span">{this.props.totalCost}</span>
            <span className="green_span">{this.props.subTotal}</span>
            <span className="green_span">{this.props.shipping}</span>
            <span className="created_at">{this.props.created_at}</span> */}
          </h6>
          <img className="mainImg" src={this.props.img} alt="" />
          <p>{this.props.info}</p>
          {/* <span className="green_span">{this.props.genre}</span>
          <span className="green_span">{this.props.quantity}</span>
          <span className="green_span"> {this.props.suburb} </span>
          <span>{this.props.ordered_by}</span> */}
          {/* <button onClick={this.handleClick.bind(this, this.props._id)}>
            Title-
            {this.props._id}
          </button> */}
          {/* <button onClick={this.props.click}>
            Title-
            {this.props.cuid}
          </button> */}
          <CrudControl
            clickEdit={this.props.clickEdit}
            clickDel={this.props.clickDel}
          />
          <ChannelControl
            clickStart={this.props.clickStartChannel}
            clickStop={this.props.clickStopChannel}
          />
        </Wrapper>
      </div>
    );
  }
}

ChannelCard.propTypes = {
  data: PropTypes.array
};

export default ChannelCard;
