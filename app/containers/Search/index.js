/* eslint-disable no-console */
/**
 *
 * Search
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

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import SearchBox from "components/SearchBox";
import {
  searchActionApiData,
  searchActionSearchTerm,
  searchActionSearchTermChange
} from "./actions";
import {
  // makeSelectSearch,
  makeSearchApiDataSelector,
  makeSearchSearchTermSelector,
  makeSearchSearchTermChangeSelector
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class Search extends React.Component {
  componentDidMount() {
    // load API Data
    this.props.searchDispatchApiData("111111", 88, 99);
  }

  render() {
    const apiData = { ...this.props.searchPropsApiData };
    console.log("apiData:: ", apiData);

    return (
      <div>
        <Helmet>
          <title>Search</title>
          <meta name="description" content="Description of Search" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div className="searchLanding">
          <h1>Search Landing Page Container</h1>

          {/* SearchBox Component for HTML and input interaction */}
          <SearchBox
            searchFunc={e => this.props.searchDispatchSearchTermChange(e)}
            searchTerm={this.props.searchTerm}
          />
          {/* Search functionality and state management */}
          <div>
            {this.props.searchPropsApiData
              .filter(
                each =>
                  `${each.item} 
                ${each.info} 
                ${each.genre} 
                ${each.suburb}
                ${each.recipe} 
                ${each.cost}
                ${each.country}
                ${each.createdBy}`
                    .toUpperCase()
                    .indexOf(this.props.searchTerm.toUpperCase()) >= 0
              )
              .map((each, index) => (
                <Card {...each} key={each.id} id={index} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  searchPropsApiData: PropTypes.array,
  searchDispatchApiData: PropTypes.func,
  searchDispatchSearchTermChange: PropTypes.func,
  // eslint-disable-next-line comma-dangle
  searchDispatchSearchTerm: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  // search: makeSelectSearch(),
  searchTerm: makeSearchSearchTermSelector(),
  searchTermChange: makeSearchSearchTermChangeSelector(),
  searchPropsApiData: makeSearchApiDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    searchDispatchSearchTerm: searchTerm =>
      dispatch(searchActionSearchTerm(searchTerm)),
    searchDispatchSearchTermChange: event =>
      dispatch(searchActionSearchTermChange(event.target.value)),
    searchDispatchApiData: (tenantId, skip, take) =>
      dispatch(searchActionApiData(tenantId, skip, take))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "search", reducer });
const withSaga = injectSaga({ key: "search", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Search);
