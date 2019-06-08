/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/**
 *
 * Order
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
import Create from "containers/Create/Loadable";
import Update from "containers/Update/Loadable";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { socket, subscribeToTimer } from "utils/socketio-client";
import OrderForm from "./mocks/order.data";
import ChefForm from "./mocks/chef.data";
import { orderActionApiData } from "./actions";
import {
  // makeSelectOrder,
  makeOrderApiDataSelector
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      update: false,
      deploy: true,
      data: [],
      id: "",
      timestamp: "no timestamp yet"
    };
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
    //  subscribeToTimer((err, timestamp) => this.props.orderDispatchApiData({
    //    model: "orders"
    //  }));
    // subscribeToApiData((err, timestamp) =>
    //   this.props.orderDispatchApiData({
    //     model: "orders"
    //   })
    // );
  }

  componentDidMount() {
    // load API Data
    this.props.orderDispatchApiData({
      model: "orders"
    });
    socket.on("get_add_data", data => {
      console.log("add data recieved", data);
      this.props.orderDispatchApiData({
        model: "orders"
      });
    });
    socket.on("save", data => {
      console.log("On order:save Add event, socket call", data);
    });
    socket.on("get_update_data", data => {
      console.log("update data recieved", data);
      this.props.orderDispatchApiData({
        model: "orders"
      });
    });
    socket.on("get_delete_data", data => {
      console.log("delete data recieved", data);
      this.props.orderDispatchApiData({
        model: "orders"
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("next CompWillReciProp Testprops", nextProps);
    console.log(
      "this CompWillReciProp Testprops",
      this.props.orderPropsApiData
    );
    if (nextProps.orderPropsApiData !== this.props.orderPropsApiData) {
      this.setState({
        data: nextProps.orderPropsApiData
      });
    } else {
      this.setState({
        data: this.props.orderPropsApiData
      });
    }
  }

  // shouldComponentUpdate(nextProps,prevProps) {
  //   console.log("next ShouldComupdate Testprops", nextProps);
  //   console.log("prev ShouldComupdate Testprops", prevProps);
  //   console.log("this ShouldComupdate Testprops", this.props.orderPropsApiData);
  //   return true;
  // }

  addFormButton = e => {
    e.preventDefault();
    this.setState({
      add: true,
      deploy: false
    });
  };

  clickUpdate = (id, e) => {
    console.log("clickupdate being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    this.setState({
      update: true,
      deploy: false,
      id
    });
  };

  clickDelete = (id, e) => {
    console.log("clicDelete being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    alert("You sure you want to delete?");
    this.setState({
      id
    });
  };

  backButton = () => {
    this.setState({
      deploy: true,
      add: false,
      update: false
    });
  };

  render() {
    // setTimeout(() => {
    //   this.props.orderDispatchApiData({
    //     model: "orders"
    //   });
    // }, 4000);

    // const apiData = { ...this.props.orderPropsApiData };
    // console.log("apiData:: ", apiData);
    // console.log(
    //   "this.props.orderPropsApiData is :: ",
    //   this.props.orderPropsApiData
    // );
    // console.log("this.state.data", this.state.data);

    if (this.state.add) {
      return (
        <div>
          <Helmet>
            <title>Order</title>
            <meta name="description" content="Description of Order" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button type="button" onClick={this.backButton}>
              Back
            </button>
          </div>
          <Create
            formStructure={OrderForm}
            model="orders"
            deploy={this.state.add}
          />
        </div>
      );
    }
    if (this.state.update) {
      return (
        <div>
          <Helmet>
            <title>Order</title>
            <meta name="description" content="Description of Order" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button type="button" onClick={this.backButton}>
              Back
            </button>
          </div>
          <Update
            id={this.state.id}
            formStructure={OrderForm}
            model="orders"
            deploy={this.state.update}
          />
        </div>
      );
    }
    if (this.state.deploy) {
      return (
        <div>
          <Helmet>
            <title>Order</title>
            <meta name="description" content="Description of Order" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button type="button" onClick={e => this.addFormButton(e)}>
              ADD Form
            </button>
          </div>
          <div>
            <p className="App-intro">
              This is the timer value: {this.state.timestamp}
            </p>
          </div>

          <div>
            {this.state.data.map(each => (
              <div>
                <Card
                  key={each.id}
                  {...each}
                  clickEdit={e => this.clickUpdate(each.cuid, e)}
                  clickDel={e => this.clickDelete(each.cuid, e)}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

Order.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  orderPropsApiData: PropTypes.array,
  orderDispatchApiData: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  // order: makeSelectOrder(),
  orderPropsApiData: makeOrderApiDataSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    orderDispatchApiData: ({ model, id }) =>
      dispatch(orderActionApiData({ model, id }))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "order", reducer });
const withSaga = injectSaga({ key: "order", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Order);
