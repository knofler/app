/**
 *
 * Scan
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from "react-intl";
import messages from "./messages";

function Scan() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

Scan.propTypes = {};

export default Scan;
