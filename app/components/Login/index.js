/**
 *
 * Login
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormattedMessage } from "react-intl";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
class Login extends React.Component {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <form onSubmit={this.props.submitFunc}>
          <label> Email</label>
          <input
            type="email"
            name="email"
            value={this.props.email}
            onChange={this.props.setEmail}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={this.props.password}
            onChange={this.props.setPassword}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  submitFunc: PropTypes.func
};

export default Login;
