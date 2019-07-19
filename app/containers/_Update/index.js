/* eslint-disable no-return-assign */
/* eslint-disable func-names */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */

/**
 *
 * Update
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Card from "components/Card";
import Form from "components/Form";
import {
  updateAction,
  updateActionGet,
  updateActionPost,
  updateActionChangeModel,
  updateActionFormStructure,
  updateActionSetFormState,
  updateActionFormInputReset
} from "./actions";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  // makeSelectUpdate,
  makeUpdateGetPayloadSelector,
  makeUpdatePostPayloadSelector,
  makeUpdateModelSelector,
  makeUpdateIdSelector,
  makeUpdateFormStructureSelector,
  makeUpdateInputSelector,
  makeUpdateFormItemResetSelector
 } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import "./update.css";

/* eslint-disable react/prefer-stateless-function */
export class Update extends React.Component {
  constructor(props) {
    super(props);
    // Local component States
    this.state = {
      // render: "This is Default  Form Render Space"
    };
    // Binding Component specific methods
    // this.FormAPICall = this.FormAPICall.bind(this);
  }

  componentDidMount() {
    // On Component Mount, set the form structure and Model
    this.props.updateDispatch({
      id: this.props.id,
      model: this.props.model,
      struct: this.props.formStructure
    });

    // make get api call to get the place holder object
    this.props.updateDispatchGet({
      id: this.props.id,
      model: this.props.model
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

    // For form display input purpose
    const userInput = {};
    userInput[e.currentTarget.name] = e.currentTarget.value;

    // updating each item of the form input and change the state, which on submit pushed to database to make change
    this.props.updateGetPropsPayload[e.currentTarget.name] =
      e.currentTarget.value;

    // make input state change
    setTimeout(() => {
      this.props.updateDispatchSetFormState(userInput);
      //   this.props.updateDispatchSetFormState(userInput);
    }, 10);
  };

  //  UPDATE Form Methods
  updateFormAPICall = (id, e) => {
    e.preventDefault();
    console.log(" Form Data Method is invoked");
    console.log("Update received id is ", id);
    setTimeout(() => {
      // console.log("userInput in  is :", userInput);
      console.log(
        "After input setInput UPDATE_STATE__INPUT in FormApi Func is  :",
        this.props.updatePropsInput
      );
      // Make API call
      this.props.updateDispatchPost({
        id: this.props.id,
        model: this.props.model,
        input: this.props.updateGetPropsPayload
      });
      // clear the local form
      this.refs.form.reset();
      // clear UPDATE_STATE__INPUT
      // this.props.updateDispatchFormInputReset();
    }, 200);
  };

  render() {

     

    if (this.props.formStructure && this.props.deploy === true) {
      return (
        <div>
          <Helmet>
            <title>Update</title>
            <meta name="description" content="Description of Update" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <div>
              Injected Model is :::
              <strong> {this.props.updatePropsModel}</strong>
            </div>
            <div>
              Injected ID is :::
              <strong> {this.props.updatePropsId} </strong>
            </div>
            <div>
              <p>
                Retrieved Field JSON Response :: <br />
                <pre className="jsonResponseRed">
                  {JSON.stringify(this.props.updateGetPropsPayload)}
                </pre>
              </p>
            </div>
            <div>
              Form Structure Passed on ::
              <pre>{JSON.stringify(this.props.updatePropsFormStructure)}</pre>
            </div>
            <div>
              <p>
                Submited Forms JSON Response :: <br />
                <pre className="jsonResponse">
                  {JSON.stringify(this.props.updatePostPropsPayload)}
                </pre>
              </p>
            </div>
            <div>
              User Input is ::
              <pre className="userInput">
                {JSON.stringify(this.props.updatePropsInput)}
              </pre>
            </div>
            <div>
              Form Reset Status :::
              <strong>
                {" "}
                {JSON.stringify(this.props.updatePropsFormReset)}
              </strong>
            </div>
          </div>
          {/* <Form
                formStructure={this.props.formStructure}
                submitFunc={this.FormAPICall}
                ref={this.state.ref}
              /> */}
          {/* Display Form */}
          <div>
            <form
              ref="form"
              onSubmit={e => this.updateFormAPICall(this.props.id, e)}
            >
              {this.props.formStructure.map(element => (
                <div>
                  <label>{element.label}</label>
                  <input
                    type={element.type}
                    name={element.name}
                    // placeholder={this.props.updateGetPropsPayload[element.name]}
                    value={this.props.updateGetPropsPayload[element.name]}
                    onChange={e => this.handleChange(element.name, e)}
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
          <title>Update</title>
          <meta name="description" content="Description of Update" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div>
          <pre>{/* <code>{this.state.updatePropsPayload}</code> */}</pre>
        </div>
      </div>
    );
  }
}

Update.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  id: PropTypes.string,
  formStructure: PropTypes.array.isRequired,
  model: PropTypes.string.isRequired,
  deploy: PropTypes.bool.isRequired,
  updateDispatch: PropTypes.func,
  updateDispatchGet: PropTypes.func,
  updateDispatchPost: PropTypes.func,
  updateDispatchFormStructure: PropTypes.func,
  updateDispatchChangeModel: PropTypes.func,
  updateDispatchFormInputReset: PropTypes.func,
  updateDispatchSetFormState: PropTypes.func,
  updateGetPropsPayload: PropTypes.object,
  updatePostPropsPayload: PropTypes.object,
  updatePropsInput: PropTypes.object,
  updatePropsFormReset: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  // update: makeSelectUpdate(),
  updateGetPropsPayload: makeUpdateGetPayloadSelector(),
  updatePostPropsPayload: makeUpdatePostPayloadSelector(),
  updatePropsModel: makeUpdateModelSelector(),
  updatePropsId: makeUpdateIdSelector(),
  updatePropsFormStructure: makeUpdateFormStructureSelector(),
  updatePropsInput: makeUpdateInputSelector(),
  updatePropsFormReset: makeUpdateFormItemResetSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    updateDispatch: ({ id, struct, model }) =>
      dispatch(updateAction({ id, struct, model })),
    updateDispatchGet: ({ id, model }) =>
      dispatch(updateActionGet({ id, model })),
    updateDispatchPost: ({ id, input, model }) =>
      dispatch(updateActionPost({ id, input, model })),
    updateDispatchSetFormState: input =>
      dispatch(updateActionSetFormState(input)),
    updateDispatchFormInputReset: () => dispatch(updateActionFormInputReset()),
    updateDispatchFormStructure: ({ data }) =>
      dispatch(updateActionFormStructure({ data })),
    updateDispatchChangeModel: ({ model }) =>
      dispatch(updateActionChangeModel({ model }))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'update', reducer });
const withSaga = injectSaga({ key: 'update', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Update);
