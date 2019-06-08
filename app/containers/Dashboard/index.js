/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-no-bind */
/**
 *
 * Canteen
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
import Card from "components/Card";
import { loadEvents, loadFeaturedEvents } from "./actions";
import {
  // makeSelectCanteen,
  makeEventsSelector,
  makeFeaturedEventSelector
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.Component {
  componentDidMount() {
    // load events
    this.props.loadEvents("12121", 0, 14, "");
    // load Featured Events
    this.props.loadFeaturedEvents("11111", 1, 12);
    console.log("this.props", this.props);
  }

  clickHandler(id) {
    // eslint-disable-next-line no-console
    console.log("id:", id);
  }

  render() {
    // console.log(Dashboard.propTypes);
    const featuredEvents = {
      ...this.props.featuredEvents
    };
    // // eslint-disable-next-line no-console
    console.log("featuredEvents in index", featuredEvents);

    const events = {
      ...this.props.events
    };
    // // // eslint-disable-next-line no-console
    console.log("events in index", events);


    return (
      <div>
        <Helmet>
          <title> Dashboard </title>
          <meta name="description" content="Description of Canteen" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div>
          {this.props.featuredEvents.map(each => (
            <Card
              key={each.id}
              {...each}
              click={this.clickHandler.bind(null, each.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  featuredEvents: PropTypes.array,
  events: PropTypes.array,
  loadEvents: PropTypes.func,
  loadFeaturedEvents: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  // canteen: makeSelectCanteen(),
  featuredEvents: makeFeaturedEventSelector(),
  events: makeEventsSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    loadEvents: (tenantId, skip, take, searchTerm) =>
      dispatch(loadEvents(tenantId, skip, take, searchTerm)),
    loadFeaturedEvents: (tenantId, skip, take) =>
      dispatch(loadFeaturedEvents(tenantId, skip, take))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({
  key: "dashboard",
  reducer
});
const withSaga = injectSaga({
  key: "dashboard",
  saga
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Dashboard);
