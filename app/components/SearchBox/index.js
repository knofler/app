/* eslint-disable comma-dangle */
/**
 *
 * SearchBox
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormattedMessage } from "react-intl";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
class SearchBox extends React.Component {
  goTosearch = e => {
    e.preventDefault();
    console.log("search is ::", e.target.value);
  };

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <div className="searchLanding">
          <h3>Search Box Component</h3>
          <input
            type="search"
            id="container-search"
            className="form-control"
            onChange={this.props.searchFunc}
            value={this.props.searchTerm}
            placeholder="Search"
          />
        </div>
      </div>
    );
  }
}

SearchBox.propTypes = {
  searchTerm: [],
  seachFunc: Function
};

export default SearchBox;
