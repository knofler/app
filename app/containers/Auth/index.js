/* eslint-disable no-console */
/**
 *
 * Auth
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Login from "components/Login";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  authActionApiData,
  authActionSetEmail,
  authActionSetPassword,
  authActionSignin,
  authActionSignup
} from "./actions";
import {
  // makeSelectAuth,
  makeAuthApiDataSelector,
  makeAuthSignupSelector,
  makeAuthSigninSelector,
  makeAuthEmailSelector,
  makeAuthPasswordSelector,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class Auth extends React.Component {
  componentDidMount() {
    // // load API Data
    // this.props.loadAuthApiData("111111", 88, 99);
  }

  setEmailState(e) {
    e.preventDefault();
    this.props.AuthSetEmail({
      [e.target.name]: e.target.value
    });
    console.log("change value in auth ", e.target.value);
    console.log("change name in auth ", e.target.name);
  }

  setPasswordState(e) {
    e.preventDefault();
    this.props.AuthSetPassword({
      [e.target.name]: e.target.value
    });
    console.log("change value in auth ", e.target.value);
    console.log("change name in auth ", e.target.name);
  }

  submit(e) {
    e.preventDefault();
    this.props.AuthLogin(this.props.email_auth, this.props.password_auth);
    // call Saga with Action
    console.log("saga called");
  }

  render() {
    const AuthToken = {
      ...this.props.AuthToken
    };
    // console.log("featuredEvents in index", AuthToken);

    // const AuthEmailState = {
    //   ...this.props.email_auth
    // };
    // console.log("AuthEmailState in index", AuthEmailState);

    // const AuthPasswordState = {
    //   ...this.props.password_auth
    // };
    // console.log("AuthEmailState in index", AuthPasswordState);

    return (
      <div>
        <Helmet>
          <title>Auth</title>
          <meta name="description" content="Description of Auth" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <Login
          setEmail={e => this.setEmailState(e)}
          setPassword={e => this.setPasswordState(e)}
          submitFunc={e => this.submit(e)}
        />
      </div>
    );
  }
}

Auth.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  apiDataEvents_Auth: PropTypes.array,
  loadAuthApiData: PropTypes.func,
  AuthToken: PropTypes.string,
  AuthSetEmail: PropTypes.func,
  AuthSetPassword: PropTypes.func,
  AuthLogin: PropTypes.func,
  AuthSignUp: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  // auth: makeSelectAuth(),
  email_auth: makeAuthEmailSelector(),
  password_auth: makeAuthPasswordSelector(),
  login_Auth: makeAuthSigninSelector()
  // signup_Auth: makeAuthSignupSelector(),
  // apiDataEvents_Auth: makeAuthApiDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    // loadAuthApiData: (tenantId, skip, take) =>
    //   dispatch(loadAuthApiData(tenantId, skip, take)),
    AuthLogin: (authEmail, authPassword) =>
      dispatch(authActionSignin(authEmail, authPassword)),
    AuthSetEmail: authEmail => dispatch(authActionSetEmail(authEmail)),
    AuthSetPassword: authPassword =>
      dispatch(authActionSetPassword(authPassword)),
    // AuthSignUp: (authEmail, authPassword) =>
    //   dispatch(AuthSignUp(authEmail, authPassword))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "auth", reducer });
const withSaga = injectSaga({ key: "auth", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Auth);
