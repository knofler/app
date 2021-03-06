/* eslint-disable no-console */

/**
 *
 * Pencil
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
import Create from "containers/Create/Loadable";
import Update from "containers/Update/Loadable";
import Delete from "containers/Delete/Loadable";
import SearchBox from "components/SearchBox";

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { socket, subscribeToTimer } from "utils/socketio-client";
import { 
  pencilActionApiData,
 } from "./actions";

import {
  makeSelectPencil,
  makePencilApiDataSelector,
 } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import PencilForm from "./mocks/dummyData";
import "./Pencil.css";

/* eslint-disable react/prefer-stateless-function */
export class Pencil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      update: false,
      delete: false,
      read: true,
      model: "pencils",
      formStructure: PencilForm,
      data: [],
      searchTerm: "",
      id: "",
      timestamp: "no timestamp yet"
    };
    subscribeToTimer((err, timestamp) =>
      this.setState({
        timestamp
      })
    );
  }

  componentDidMount() {
    // load API Data
    this.props.pencilDispatchApiData({
      model: this.state.model
    });
    socket.on("get_add_data", data => {
      console.log("add data recieved", data);
      this.props.pencilDispatchApiData({
        model: this.state.model
      });
    });
    socket.on("save", data => {
      console.log("On pencil:save Add event, socket call", data);
    });
    socket.on("get_update_data", data => {
      console.log("update data recieved", data);
      this.props.pencilDispatchApiData({
        model: this.state.model
      });
    });
    socket.on("get_delete_data", data => {
      console.log("delete data recieved", data);
      this.props.pencilDispatchApiData({
        model: this.state.model
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("next CompWillReciProp Testprops", nextProps);
    console.log(
      "this CompWillReciProp Testprops",
      this.props.pencilPropsApiData
    );
    if (nextProps.pencilPropsApiData !== this.props.pencilPropsApiData) {
      this.setState({
        data: nextProps.pencilPropsApiData
      });
    } else {
      this.setState({
        data: this.props.pencilPropsApiData
      });
    }
  }


/**
*
  * CRUD FUNCTIONS STATE CONTROL
*
*/
  addFormButton = e => {
    e.preventDefault();
    this.setState({
      add: true,
      read: false
    });
  };

  clickUpdate = (id, e) => {
    console.log("clickupdate being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    this.setState({
      update: true,
      read: false,
      id
    });
  };

  clickDelete = (id, e) => {
    console.log("clicDelete being clicked");
    e.preventDefault();
    console.log("e is ", e);
    console.log("id is ", id);
    // alert("You sure you want to delete?");
    this.setState({
      delete: true,
      read: false,
      id
    });
    // console.log("Delete is :", <Delete />);
  };

  searchFunc = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  backButton = () => {
    this.setState({
      read: true,
      add: false,
      update: false,
      delete: false,
    });
  };


  render() {
    if (this.state.add) {
      return (
        <div>
          <Helmet>
            <title>Pencil</title>
            <meta name="description" content="Description of Pencil" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button 
              className="btn btn-info"
              type="button" 
              onClick={this.backButton}>
              Back
            </button>
          </div>
          <Create
            formStructure={ this.state.formStructure}
            model={this.state.model}
            deploy={this.state.add}
          />
        </div>
      );
    }
    if (this.state.update) {
      return (
        <div>
          <Helmet>
            <title>Pencil</title>
            <meta name="description" content="Description of Pencil" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button 
              className="btn btn-warning"
              type="button" 
              onClick={this.backButton}>
              Back
            </button>
          </div>
          <Update
            id={this.state.id}
            formStructure={this.state.formStructure}
            model={this.state.model}
            deploy={this.state.update}
          />
        </div>
      );
    }
    if (this.state.delete) {
      return (
        <div>
          <Helmet>
            <title>Book</title>
            <meta name="description" content="Description of Book" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button
              className="btn btn-danger"
              type="button"
              onClick={this.backButton}
            >
              Back
            </button>
          </div>
          <Delete 
            id={this.state.id} 
            model={this.state.model} 
            deploy={this.state.delete} 
          />
        </div>
      );
    }
    if (this.state.read) {
      return (
        <div>
          <Helmet>
            <title>Pencil</title>
            <meta name="description" content="Description of Pencil" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>
            <button 
              className="btn btn-primary"
              type="button" 
              onClick={e => this.addFormButton(e)}>
              ADD Form
            </button>
          </div>
          <div>
            <p className="App-intro">
              This is the timer value: {this.state.timestamp}
            </p>
          </div>

            <div>
              <SearchBox
                searchFunc={e => {
                  this.searchFunc(e);
                }}
                searchTerm={this.state.searchTerm}
              />
            </div>

          <div>
            {this.state.data
              .filter(
                each =>
                  `${each.item} 
                   ${each.info}`
                    .toUpperCase()
                    .indexOf(this.state.searchTerm.toUpperCase()) >= 0
              )
              .map((each, index) => (
                <div>
                  <Card
                    key={each.id}
                    {...each}
                    id={index}
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

Pencil.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  pencilPropsApiData: PropTypes.array,
  pencilDispatchApiData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  //pencil: makeSelectPencil(),
  pencilPropsApiData : makePencilApiDataSelector()
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    pencilDispatchApiData: ({ model, id }) =>
    dispatch(pencilActionApiData({ model, id })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'pencil', reducer });
const withSaga = injectSaga({ key: 'pencil', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Pencil);
