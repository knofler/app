/**
 *
 * Food
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Card from "components/Card";
import { foodActionApiData } from "./actions";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { makeSelectFood, makeFoodApiDataSelector } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class Food extends React.Component {
  componentDidMount() {
    // load API Data
    this.props.foodDispatchApiData("111111", 88, 99);
  }
  render() {
    const apiData = { ...this.props.foodPropsApiData };
    console.log("apiData:: ", apiData);
    return (
      <div>
        <Helmet>
          <title>Food</title>
          <meta name="description" content="Description of Food" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div>
          {this.props.foodPropsApiData.map(each => (
            <div>
              <Card
                key={each.id}
                {...each}
                // click={this.clickHandler.bind(null, each.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Food.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  foodPropsApiData: PropTypes.array,
  foodDispatchApiData: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  //food: makeSelectFood(),
  foodPropsApiData: makeFoodApiDataSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    foodDispatchApiData: (tenantId, skip, take) =>
      dispatch(foodActionApiData(tenantId, skip, take))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "food", reducer });
const withSaga = injectSaga({ key: "food", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Food);
