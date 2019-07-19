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

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  createActionAdd,
  createActionAddPost,
  createActionAddAwsPost,
  createActionAddChangeModel,
  createActionAddFormStructure,
  createActionAddSetFormState,
  createActionAddFormInputReset
} from "./actions";
import {
  makeSelectCreate,
  makeCreateAddPayloadSelector,
  makeCreateAddAwsPayloadSelector,
  makeCreateAddModelSelector,
  makeCreateAwsModelSelector,
  makeCreateAddFormStructureSelector,
  makeCreateAddInputSelector,
  makeCreateAddFormItemResetSelector
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

import "./create.css";

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
      aws: this.props.aws,
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
    console.log("this.props.aws", this.props.awsModel);
    const userInput = {};
    this.props.formStructure.map(
      // eslint-disable-next-line no-return-assign
      each => (userInput[each.name] = `${e.target[each.name].value}`)
    );
    setTimeout(() => {
      console.log("userInput in add is :", userInput);
      console.log(
        "After input setInput CREATE_STATE_ADD_INPUT in addFormApi Func is  :",
        this.props.createPropsAddInput
      );
      // Make API call
      if (this.props.awsModel == undefined) {
        console.log("this.props.createDispactchAddPost will be executed");
        this.props.createDispatchAddPost({
          model: this.props.model,
          input: userInput
        });
      } else {
        console.log("this.props.createDispactAddAwsPost will be executed");
        this.props.createDispatchAddAwsPost({
          model: this.props.model,
          awsModel: this.props.awsModel,
          input: userInput
        });
      }

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
              <p>
                Submited Forms AWS JSON Response :: <br />
                <pre className="jsonAwsResponse">
                  {JSON.stringify(this.props.createPropsAddAwsPayload)}
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
          {/* <Form
                formStructure={this.props.formStructure}
                submitFunc={this.addFormAPICall}
                ref={this.state.ref}
              /> */}
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
  // dispatch: PropTypes.func.isRequired,
  formStructure: PropTypes.array.isRequired,
  model: PropTypes.string.isRequired,
  awsModel: PropTypes.string,
  deploy: PropTypes.bool.isRequired,
  createDispatchAdd: PropTypes.func,
  createDispatchAddPost: PropTypes.func,
  createActionAddAwsPost: PropTypes.func,
  createDispatchAddFormStructure: PropTypes.func,
  createDispatchAddChangeModel: PropTypes.func,
  createDispatchAddFormInputReset: PropTypes.func,
  createDispatchAddSetFormState: PropTypes.func,
  createPropsAddPayload: PropTypes.object,
  createPropsAddAwsPayload: PropTypes.object,
  createPropsAddInput: PropTypes.object,
  createPropsAddFormReset: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  // create: makeSelectCreate(),
  createPropsAddPayload: makeCreateAddPayloadSelector(),
  createPropsAddAwsPayload: makeCreateAddAwsPayloadSelector(),
  createPropsAddModel: makeCreateAddModelSelector(),
  createPropsAwsModel: makeCreateAwsModelSelector(),
  createPropsAddFormStructure: makeCreateAddFormStructureSelector(),
  createPropsAddInput: makeCreateAddInputSelector(),
  createPropsAddFormReset: makeCreateAddFormItemResetSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    createDispatchAdd: ({ struct, model, aws }) =>
      dispatch(createActionAdd({ struct, model, aws })),
    createDispatchAddPost: ({ input, model }) =>
      dispatch(createActionAddPost({ input, model })),
    createDispatchAddAwsPost: ({ input, model, awsModel }) =>
      dispatch(createActionAddAwsPost({ input, model, awsModel })),
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
