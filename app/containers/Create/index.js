/* eslint-disable no-return-assign */
/* eslint-disable func-names */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */

/**
 *
 * Create
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
import Form from "components/Form";
import {
  createActionAdd,
  createActionAddPost,
  createActionAddChangeModel,
  createActionAddFormStructure,
  createActionAddSetFormState,
  createActionAddFormInputReset
} from "./actions";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  makeSelectCreate,
  makeCreateAddPayloadSelector,
  makeCreateAddModelSelector,
  makeCreateAddFormStructureSelector,
  makeCreateAddInputSelector,
  makeCreateAddFormItemResetSelector
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

import "./Create.css";

/* eslint-disable react/prefer-stateless-function */
export class Create extends React.Component {
  constructor(props) {
    super(props);
    // Local component States
    this.state = {
      render: "This is Default Add Form Render Space"
    };
    // Binding Component specific methods
    // this.addFormAPICall = this.addFormAPICall.bind(this);
  }

  componentDidMount() {
    // On Component Mount, set the form structure and Model
    this.props.createDispatchAdd({
      model: this.props.model,
      struct: this.props.formStructure
    });
  }

  // Form Handlechange event handlers
  handleChange = (element, e) => {
    e.preventDefault();
    console.log(
      "e.currentTarget.name:",
      e.currentTarget.name,
      "e.currentTarget.value",
      e.currentTarget.value
    );

    const userInput = {};
    userInput[e.currentTarget.name] = e.currentTarget.value;

    setTimeout(() => {
      this.props.createDispatchAddSetFormState(userInput);
    }, 10);
  };

  // ADD Form Methods
  addFormAPICall = e => {
    e.preventDefault();
    console.log("Add Form Data Method is invoked");
    const userInput = {};
    this.props.formStructure.map(
      // eslint-disable-next-line no-return-assign
      each => (userInput[each.name] = `${e.target[each.name].value}`)
    );
    setTimeout(() => {
      console.log("userInput in add is :", userInput);
      console.log(
        "After input setInput CREATE_STATE_ADD_INPUT in addFormApi Func is :",
        this.props.createPropsAddInput
      );
      // Make API call
      this.props.createDispatchAddPost({
        model: this.props.model,
        input: userInput
      });
      // clear the local form
      this.refs.form.reset();
      // clear CREATE_STATE_ADD_INPUT
      // this.props.createDispatchAddFormInputReset();
    }, 200);
  };

  render() {
    if (this.props.formStructure && this.props.deploy === true) {
      return (
        <div>
          <Helmet>
            <title>Create</title>
            <meta name="description" content="Description of Create" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <div>
              Injected Model is :::
              <strong> {this.props.createPropsAddModel}</strong>
            </div>
            <div>
              Form Structure Passed on ::
              <pre>
                {JSON.stringify(this.props.createPropsAddFormStructure)}
              </pre>
            </div>
            <div>
              <p>
                Submited Forms JSON Response :: <br />
                <pre className="jsonResponse">
                  {JSON.stringify(this.props.createPropsAddPayload)}
                </pre>
              </p>
            </div>
            <div>
              User Input is ::
              <pre className="userInput">
                {JSON.stringify(this.props.createPropsAddInput)}
              </pre>
            </div>
            <div>
              Form Reset Status :::
              <strong>
                {" "}
                {JSON.stringify(this.props.createPropsAddFormReset)}
              </strong>
            </div>
          </div>
          {/*
  <Form formStructure={this.props.formStructure} submitFunc={this.addFormAPICall} ref={this.state.ref} /> */}
          {/* Display Form */}
          <div>
            <form ref="form" onSubmit={this.addFormAPICall}>
              {this.props.formStructure.map(each => (
                <div>
                  <label>{each.label}</label>
                  <input
                    type={each.type}
                    name={each.name}
                    onChange={e => this.handleChange(each.name, e)}
                  />
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Helmet>
          <title>Create</title>
          <meta name="description" content="Description of Create" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div>
          <pre>{/* <code>{this.state.createPropsAddPayload}</code> */}</pre>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  formStructure: PropTypes.array.isRequired,
  model: PropTypes.string.isRequired,
  deploy: PropTypes.bool.isRequired,
  createDispatchAdd: PropTypes.func,
  createDispatchAddPost: PropTypes.func,
  createDispatchAddFormStructure: PropTypes.func,
  createDispatchAddChangeModel: PropTypes.func,
  createDispatchAddFormInputReset: PropTypes.func,
  createDispatchAddSetFormState: PropTypes.func,
  createPropsAddPayload: PropTypes.object,
  createPropsAddInput: PropTypes.object,
  createPropsAddFormReset: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  //create: makeSelectCreate(),
  createPropsAddPayload: makeCreateAddPayloadSelector(),
  createPropsAddModel: makeCreateAddModelSelector(),
  createPropsAddFormStructure: makeCreateAddFormStructureSelector(),
  createPropsAddInput: makeCreateAddInputSelector(),
  createPropsAddFormReset: makeCreateAddFormItemResetSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    createDispatchAdd: ({ struct, model }) =>
      dispatch(createActionAdd({ struct, model })),
    createDispatchAddPost: ({ input, model }) =>
      dispatch(createActionAddPost({ input, model })),
    createDispatchAddSetFormState: input =>
      dispatch(createActionAddSetFormState(input)),
    createDispatchAddFormInputReset: () =>
      dispatch(createActionAddFormInputReset()),
    createDispatchAddFormStructure: ({ data }) =>
      dispatch(createActionAddFormStructure({ data })),
    createDispatchAddChangeModel: ({ model }) =>
      dispatch(createActionAddChangeModel({ model }))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "create", reducer });
const withSaga = injectSaga({ key: "create", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Create);
