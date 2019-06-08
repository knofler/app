/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Form
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { FormattedMessage } from "react-intl";
import messages from "./messages";

import "./form.css";

/* eslint-disable react/prefer-stateless-function */
class Form extends React.Component {
  componentDidMount() {
    // this.props.submitFunc();
  }

  render() {
    if (this.props.formStructure) {
      return (
        <div>
          <FormattedMessage {...messages.header} />
          <form ref={this.props.ref} onSubmit={this.props.submitFunc}>
            {this.props.formStructure.map(each => (
              <div>
                <label>{each.label}</label>
                <input
                  type={each.type}
                  name={each.name}
                  // eslint-disable-next-line no-return-assign
                  // ref={input => this.input = input}
                />
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <form onSubmit={this.props.submitFunc}>
          {Object.keys(this.props.formUpdate).map((each, key) => {
            console.log("data in formUpdate is ", each);
            return (
              <div>
                <label>{each}</label>
                <input
                  type="text"
                  name={each}
                  placeholder={this.props.formUpdate[each]}
                  // eslint-disable-next-line no-return-assign
                  // ref={input => this.input = input}
                />
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  formStructure: PropTypes.array,
  formUpdate: PropTypes.object,
  ref: PropTypes.string,
  submitFunc: PropTypes.func
};

export default Form;
