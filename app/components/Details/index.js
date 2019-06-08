/**
 *
 * Details
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
class Details extends React.Component {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

Details.propTypes = {};

export default Details;
