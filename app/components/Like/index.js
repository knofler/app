/**
 *
 * Like
 *
 */

import React from "react";
import { FormattedMessage } from "react-intl";
// import PropTypes from "prop-types";
import Button from "../Button";
// import styled from 'styled-components';

import messages from "./messages";
const like = "Like";

/* eslint-disable react/prefer-stateless-function */
class Like extends React.Component {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <Button props={this.props.name}>{like}</Button>
      </div>
    );
  }
}

Like.propTypes = {
  name: "like"
};

export default Like;
