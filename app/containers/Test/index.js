/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/**
 *
 * Test
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Create from "containers/Create/Loadable";
// import Book from "containers/Book/Loadable";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import OrderForm from "./mocks/order.data";
import ChefForm from "./mocks/chef.data";
import FoodForm from "./mocks/food.data";
import makeSelectTest from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deploy: false
    };
  }

  addFormButton = e => {
    e.preventDefault();
    this.setState({
      deploy: true
    });
  };

  backButton = () => {
    this.setState({
      deploy: false
    });
  };

  render() {
    if (this.state.deploy) {
      return (
        <div>
          <Helmet>
            <title>Test</title>
            <meta name="description" content="Description of Test" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          {/* <Link to="/test">Back</Link> */}
          <div>
            <button type="button" onClick={this.backButton}>
              Back
            </button>
          </div>
          <Create
            formStructure={OrderForm}
            model="orders"
            deploy={this.state.deploy}
          />
          {/* <Book
            formStructure={this.state.formStructure}
            deploy={this.state.deploy}
            model={this.state.model}
          /> */}
        </div>
      );
    }
    return (
      <div>
        <Helmet>
          <title>Test</title>
          <meta name="description" content="Description of Test" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div>
          <button type="button" onClick={e => this.addFormButton(e)}>
            ADD Form
          </button>
        </div>
      </div>
    );
  }
}

Test.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  test: makeSelectTest()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "test", reducer });
const withSaga = injectSaga({ key: "test", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Test);
