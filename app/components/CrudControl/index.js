/* eslint-disable react/button-has-type */
/**
 *
 * CrudControl
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormattedMessage } from "react-intl";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
class CrudControl extends React.Component {
  render() {
    return (
      <div className="crudCtr">
        {/* <FormattedMessage {...messages.header} /> */}
        <td>
          <p
            className="tinyBtn"
            data-placement="top"
            data-toggle="tooltip"
            title="Edit"
          >
            <button
              className="btn btn-primary btn-xs"
              data-title="Edit"
              data-toggle="modal"
              data-target="#edit"
              onClick={this.props.clickEdit}
            >
              <span className="glyphicon glyphicon-pencil" />
            </button>
          </p>
        </td>
        <td>
          <p
            className="tinyBtn"
            data-placement="top"
            data-toggle="tooltip"
            title="Delete"
          >
            <button
              className="btn btn-danger btn-xs"
              data-title="Delete"
              data-toggle="modal"
              data-target="#delete"
              onClick={this.props.clickDel}
            >
              <span className="glyphicon glyphicon-trash" />
            </button>
          </p>
        </td>
      </div>
    );
  }
}

CrudControl.propTypes = {
  clickEdit: PropTypes.func,
  clickDel: PropTypes.func
};

export default CrudControl;
