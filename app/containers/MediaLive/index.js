/* eslint-disable no-return-assign */
/* eslint-disable func-names */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */

/**
 *
 * MediaLive
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
  mediaLiveActionAdd,
  mediaLiveActionAddPost,
  mediaLiveActionAddAwsPost,
  mediaLiveActionAddChangeModel,
  mediaLiveActionAddFormStructure,
  mediaLiveActionAddSetFormState,
  mediaLiveActionAddFormInputReset
} from "./actions";
import {
  makeSelectmediaLive,
  makeMediaLiveAddPayloadSelector,
  makeMediaLiveAddAwsPayloadSelector,
  makeMediaLiveAddModelSelector,
  makeMediaLiveAwsModelSelector,
  makeMediaLiveAddFormStructureSelector,
  makeMediaLiveAddInputSelector,
  makeMediaLiveAddFormItemResetSelector
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

import "./medialive.css";

/* eslint-disable react/prefer-stateless-function */
export class MediaLive extends React.Component {
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
    this.props.mediaLiveDispatchAdd({
      awsModel: this.props.awsModel,
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
      this.props.mediaLiveDispatchAddSetFormState(userInput);
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
        "After input setInput mediaLive_STATE_ADD_INPUT in addFormApi Func is  :",
        this.props.mediaLivePropsAddInput
      );
      // Make API call
      if (this.props.awsModel == undefined) {
        console.log("this.props.mediaLiveDispactchAddPost will be executed");
        this.props.mediaLiveDispatchAddPost({
          model: this.props.model,
          input: userInput
        });
      } else {
        console.log("this.props.mediaLiveDispactAddAwsPost will be executed");
        this.props.mediaLiveDispatchAddAwsPost({
          model: this.props.model,
          awsModel: this.props.awsModel,
          input: userInput
        });
      }

      // clear the local form
      this.refs.form.reset();
      // clear mediaLive_STATE_ADD_INPUT
      // this.props.mediaLiveDispatchAddFormInputReset();
    }, 200);
  };

  render() {
    if (this.props.formStructure && this.props.deploy === true) {
      return (
        <div>
          <Helmet>
            <title>MediaLive</title>
            <meta name="description" content="Description of MediaLive" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <div>
              Injected DB Model is :::
              <strong> {this.props.mediaLivePropsAddModel}</strong>
            </div>
            <div>
              Injected AWS Action Route is :::
              <strong> {this.props.mediaLivePropsAwsModel}</strong>
            </div>
            <div>
              Form Structure Passed on ::
              <pre>
                {JSON.stringify(this.props.mediaLivePropsAddFormStructure)}
              </pre>
            </div>
            <div>
              <p>
                Submited Forms JSON Response :: <br />
                <pre className="jsonResponse">
                  {JSON.stringify(this.props.mediaLivePropsAddPayload)}
                </pre>
              </p>
            </div>
            <div>
              <p>
                Submited Forms AWS JSON Response :: <br />
                <pre className="jsonAwsResponse">
                  {JSON.stringify(this.props.mediaLivePropsAddAwsPayload)}
                </pre>
              </p>
            </div>
            <div>
              User Input is ::
              <pre className="userInput">
                {JSON.stringify(this.props.mediaLivePropsAddInput)}
              </pre>
            </div>
            <div>
              Form Reset Status :::
              <strong>
                {" "}
                {JSON.stringify(this.props.mediaLivePropsAddFormReset)}
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
                    className="form-control"
                    id={each.name}
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
          <title>MediaLive</title>
          <meta name="description" content="Description of MediaLive" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div>
          <pre>{/* <code>{this.state.mediaLivePropsAddPayload}</code> */}</pre>
        </div>
      </div>
    );
  }
}

MediaLive.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  formStructure: PropTypes.array.isRequired,
  model: PropTypes.string.isRequired,
  awsModel: PropTypes.string.isRequired,
  deploy: PropTypes.bool.isRequired,
  mediaLiveDispatchAdd: PropTypes.func,
  mediaLiveDispatchAddPost: PropTypes.func,
  mediaLiveActionAddAwsPost: PropTypes.func,
  mediaLiveDispatchAddFormStructure: PropTypes.func,
  mediaLiveDispatchAddChangeModel: PropTypes.func,
  mediaLiveDispatchAddFormInputReset: PropTypes.func,
  mediaLiveDispatchAddSetFormState: PropTypes.func,
  mediaLivePropsAddPayload: PropTypes.object,
  mediaLivePropsAddAwsPayload: PropTypes.object,
  mediaLivePropsAddInput: PropTypes.object,
  mediaLivePropsAddFormReset: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  // MediaLive: makeSelectmediaLive(),
  mediaLivePropsAddPayload: makeMediaLiveAddPayloadSelector(),
  mediaLivePropsAddAwsPayload: makeMediaLiveAddAwsPayloadSelector(),
  mediaLivePropsAddModel: makeMediaLiveAddModelSelector(),
  mediaLivePropsAwsModel: makeMediaLiveAwsModelSelector(),
  mediaLivePropsAddFormStructure: makeMediaLiveAddFormStructureSelector(),
  mediaLivePropsAddInput: makeMediaLiveAddInputSelector(),
  mediaLivePropsAddFormReset: makeMediaLiveAddFormItemResetSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    mediaLiveDispatchAdd: ({ struct, model, awsModel }) =>
      dispatch(mediaLiveActionAdd({ struct, model, awsModel })),
    mediaLiveDispatchAddPost: ({ input, model }) =>
      dispatch(mediaLiveActionAddPost({ input, model })),
    mediaLiveDispatchAddAwsPost: ({ input, model, awsModel }) =>
      dispatch(mediaLiveActionAddAwsPost({ input, model, awsModel })),
    mediaLiveDispatchAddSetFormState: input =>
      dispatch(mediaLiveActionAddSetFormState(input)),
    mediaLiveDispatchAddFormInputReset: () =>
      dispatch(mediaLiveActionAddFormInputReset()),
    mediaLiveDispatchAddFormStructure: ({ data }) =>
      dispatch(mediaLiveActionAddFormStructure({ data })),
    mediaLiveDispatchAddChangeModel: ({ model }) =>
      dispatch(mediaLiveActionAddChangeModel({ model }))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "MediaLive", reducer });
const withSaga = injectSaga({ key: "MediaLive", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(MediaLive);
