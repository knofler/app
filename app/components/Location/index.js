/**
 *
 * Location
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";

function Location() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Location.propTypes = {};

export default Location;
