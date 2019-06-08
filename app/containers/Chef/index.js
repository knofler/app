/* eslint-disable prettier/prettier */
/**
 *
 * Chef
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
import Crud from "containers/Crud/Loadable";

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { chefActionApiData } from "./actions";
import {
// makeSelectChef,
// makeChefApiDataSelector,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

/* eslint-disable react/prefer-stateless-function */
export class Chef extends React.Component {
  constructor(props) {
    super(props)
    // this.add = this.add.bind(this)
    this.state = {
      name: "This is Default Chef State",
      method:"read",
    }
  }

  componentDidMount() {
    // load API Data
    // this.props.chefDispatchApiData("111111", 88, 99);
  }

  add(data,e) {
    e.preventDefault()
    console.log('button clicked')
    this.setState({
      method:"add",
    })
  }

  render() {
    // CRUD EXASMPLE TEST BELOW
    // const apiData = { ...this.props.chefPropsApiData };
    // const createData = {
    //   name: "Rumman",
    //   age: 38,
    //   sex: "Male",
    //   skills: "Beef",
    //   latitude: "-33.7061491",
    //   longitude: "150.90369529999998",
    //   address: "9 husting street",
    //   popular: "true",
    //   suburb: "Woodcroft",
    //   postcode: 2567,
    //   country: "Australia",
    //   phone: "0456789023",
    //   ethnicity: "Bengali",
    //   created_at: "2008-04-17T11:01:00.000Z",
    // };
    
    const chefFormStructure = [
      { name: 'name', type: 'text', label: 'Name' },
      { name: 'age', type: 'number', label: 'Age' },
      { name: 'sex', type: 'text', label: 'Sex' },
      { name: 'skills', type:'text',label: 'Skills' },
      { name: 'latitude', type: 'text', label: 'Latitude' },
      { name: 'longitude', type: 'text', label: 'Longitude' },
      { name: 'address', type: 'text', label: 'Address' },
      { name: 'popular', type: 'text', label: 'Popular' },
      { name: 'suburb', type:'text',label: 'Suburb' },
      { name: 'postcode', type: 'number', label: 'Postcode' },
      { name: 'country', type: 'text', label: 'Country' },
      { name: 'phone', type: 'text', label: 'Phone' },
      { name: 'ethnicity', type:'text',label: 'Ethnicity' },
    ];


    const foodFormStructure = [
      { name: 'info', type: 'text', label: 'Info' },
      { name: 'img', type: 'text', label: 'Img' },
      { name: 'genre', type: 'text', label: 'Genre' },
      { name: 'cost', type: 'number', label: 'Costs' },
      { name: 'privacy', type: 'text', label: 'Privacy' },
      { name: 'latitude', type: 'text', label: 'Latitude' },
      { name: 'longitude', type: 'text', label: 'Longitude' },
      { name: 'popular', type: 'text', label: 'Popular' },
      { name: 'suburb', type:'text',label: 'Suburb' },
      { name: 'state', type: 'text', label: 'state' },
      { name: 'country', type: 'text', label: 'Country' },
      { name: 'recipe', type: 'text', label: 'recipe' },
    ];

    // const updateData = {
    //   name: "Zurab",
    //   age: 1,
    //   sex: "Male",
    //   suburb: "The Ponds",
    //   postcode: 2769,
    //   country: "Australia",
    //   phone: "0456789023",
    //   ethnicity: "Bengali",
    //   created_at: "2008-04-17T11:01:00.000Z",
    // };


    const orderFormStructure = [
      { name: 'items', type: 'text', label: 'Item'},
      { name: 'info', type: 'text', label: 'Info' },
      { name: 'img', type: 'text', label: 'Img' },
      { name: 'totalCost', type:'number',label: 'Total Cost' },
      { name: 'subTotal', type: 'number', label: 'Sub Total' },
      { name: 'shipping', type: 'number', label: 'Shipping' },
      { name: 'quantity', type: 'text', label: 'Quantity' },
      { name: 'location', type: 'text', label: 'Location' },
      { name: 'ordered_by', type:'text',label: 'Ordered By' },
    ];

    

    // console.log("apiData:: ", apiData);
    return (
      <div>
        <Helmet>
          <title>Chef</title>
          <meta name="description" content="Description of Chef" />
        </Helmet>
        <FormattedMessage {...messages.header} />
        <div>{this.state.name}</div>
        <button
          type="submit" onClick={e =>
            this.add(chefFormStructure, e)
          }>Add Me</button>

        {/* 
           INJECT CRUD COMPONENT FOR CRUD OPERATION   
        */}
        
        {/* CREATE   */}
        
        {/* <Crud
          method="add"
          model="orders"
          formStructure={orderFormStructure}
        /> */}

        {/* READ */}
        
        <Crud
          model="chefs"
          method={this.state.method}
          // id ="cju46xpa100010zoc7s3gjmgy"
          formStructure={chefFormStructure}
        />

        {/* UPDATE */}

        {/* <Crud
          method="update"
          model="chefs"
          id = "cju46xpa100010zoc7s3gjmgy"
          // data={updateData}
          formStructure={chefFormStructure}
        /> */}


        {/* DELETE */}

        {/* <Crud
          method="delete"
          model="chefs"
          id="cju5axmyj00010yocrhe5e5j2"
        /> */}

        
        {/* Render Form component for input */}
        {/* <Form formData={createFormData} /> */}

        {/* render Chef container API data with card component */}
        {/* <div>
          {this.props.chefPropsApiData.map(each => (
            <div>
              <Card
                key={each.id}
                {...each}
                // click={this.clickHandler.bind(null, each.id)}
              />
            </div>
          ))}
        </div> */}
      </div>
    );
  }
}

Chef.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // chefPropsApiData: PropTypes.array,
  chefDispatchApiData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // chef: makeSelectChef(),,
  // chefPropsApiData: makeChefApiDataSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    chefDispatchApiData: (tenantId, skip, take) =>
      dispatch(chefActionApiData(tenantId, skip, take)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "chef", reducer });
const withSaga = injectSaga({ key: "chef", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Chef);
