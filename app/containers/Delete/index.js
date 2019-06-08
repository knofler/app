/* eslint-disable no-return-assign */
/* eslint-disable func-names */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */

/**
 *
 * Delete
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";


import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import {
  deleteAction,
  deleteActionPost,
  deleteActionChangeModel
} from "./actions";
import {
  // makeSelectDelete,
  makeDeletePostPayloadSelector,
  makeDeleteModelSelector,
  makeDeleteIdSelector
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

import "./Delete.css";

/* eslint-disable react/prefer-stateless-function */
export class Delete extends React.Component {
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
    // // make api call to delete the entry with matching id
    this.props.deleteDispatchPost({
      id: this.props.id,
      model: this.props.model
    });
  }

  //  DELETE Form Methods
  deleteFormAPICall = (id, e) => {
    e.preventDefault();
    console.log(" Form Data Method is invoked");
    console.log("Delete received id is ", id);
    setTimeout(() => {
      // console.log("userInput in  is :", userInput);
      console.log(
        "After input setInput DELETE_STATE_INPUT in FormApi Func is  :",
        this.props.deletePropsInput
      );
      // Make API call
      this.props.deleteDispatchPost({
        id: this.props.id,
        model: this.props.model
      });
      // clear the local form
      // this.refs.form.reset();
      // clear DELETE_STATE__INPUT
      // this.props.deleteDispatchFormInputReset();
    }, 200);
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Delete</title>
          <meta name="description" content="Description of Delete" />
        </Helmet>
        {/* <FormattedMessage {...messages.header} /> */}
        <div>
          <p>
            Deleted payload JSON Response :: <br />
            <pre className="jsonResponseRed">
              {JSON.stringify(this.props.deletePostPropsPayload)}
            </pre>
          </p>
        </div>
      </div>
    );
  }
}

Delete.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  id: PropTypes.string,
  model: PropTypes.string.isRequired,
  deploy: PropTypes.bool.isRequired,
  deleteDispatchPost: PropTypes.func,
  deleteDispatchChangeModel: PropTypes.func,
  deletePostPropsPayload: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  // delete: makeSelectDelete(),
  deletePostPropsPayload: makeDeletePostPayloadSelector(),
  deletePropsModel: makeDeleteModelSelector(),
  deletePropsId: makeDeleteIdSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    deleteDispatchPost: ({ id, model }) =>
      dispatch(deleteActionPost({ id, model })),
    deleteDispatchChangeModel: ({ model }) =>
      dispatch(deleteActionChangeModel({ model }))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "delete", reducer });
const withSaga = injectSaga({ key: "delete", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Delete);
