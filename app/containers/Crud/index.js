/* eslint-disable no-lone-blocks */
/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/**
 *
 * Crud
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
  crudActionApiData,
  crudActionCreate,
  crudActionRead,
  crudActionUpdate,
  crudActionUpdateItem,
  crudActionDelete,
} from "./actions";

import {
  // makeSelectCrud,
  makeCrudApiDataSelector,
  makeCrudCreateSelector,
  makeCrudReadSelector,
  makeCrudUpdateSelector,
  makeCrudUpdateItemSelector,
  makeCrudMethod,
  makeCrudDeleteSelector,
} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";


/* eslint-disable react/prefer-stateless-function */
export class Crud extends React.Component {
  constructor() {
    super()
    // this.clickHandler = this.clickHandler.bind(this)
    this.clickUpdate = this.clickUpdate.bind(this)
    // this.addData = this.addData.bind(this)
    this.updateData = this.updateData.bind(this)
    this.state = {
      display: "Componenets will display here",
      reads: "This is default Crud state",
      method:"read",
    }
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("this.props.WillMount ::: ", this.props);
    console.log("this.state.WillMount::: ::", this.state);
    console.log("nextProps:::", nextProps);
    console.log("nextState::: ::", nextState);
  };

  componentDidMount(prevProps,prevState) {

    console.log("this.props.DidMount ::: ", this.props);
    console.log("this.state.DidMount::: ::", this.state);
    console.log("prevProps:::", prevProps);
    console.log("prevState::: ::", prevState);
    
    
    // setTimeout(function(){
    //   this.setState({
    //     reads:this.props.crudReadPayload,
    //   })
    // },200)

    

    // load API Data
    // this.props.crudDispatchApiData("111111", 88, 99);
    
    /**
     * TEST CRUD CREATE
     */

    // this.props.crudDispatchCreate({
    //   model: this.props.model || "orders",
    //   data: this.props.data || {
    //     items: 'Steak',
    //     info: 'This is a steak info',
    //     product_id: '5c98704d8a04420022be9412',
    //     produced_by: 'David Hick test',
    //     img: 'http://res.cloudinary.com/hlmdbpwv9/image/upload/w_400,h_600,c_fit/aircanteen_v2_steak.jpg',
    //     totalCost: 13,
    //     subTotal: 7,
    //     shipping: 2,
    //     quantity: 3,
    //     location: 'The Ponds',
    //     ordered_by: 'Rumman Ahmed',
    //   },
    // });

    /**
      * TEST CRUD READ
      */

    // this.props.crudDispatchRead({
    //   model: this.props.model || "chefs",
    //   id: "cju46xpa100010zoc7s3gjmgy",
    // })

    /**
      * TEST CRUD UPDATE
      */

    // this.props.crudDispatchUpdate({
    //   id: "cju262l9n000c3oqfcvph29vr",
    //   model: this.props.model || "chefs",
    //   data: {
    //     "name": "Zurab",
    //     "age": 1,
    //     "sex": "Male",
    //   },
    // })
    
    /**
      * TEST CRUD DELETE
      */
    
    // this.props.crudDispatchDelete({
    //   id: "cju3iyvmm00021eqf9zu7eyv3",
    //   model: this.props.model || "chefs",
    // })

    // Apply all component config
    console.log("method:", this.props.method)
    if (this.props.method === "add") {
      console.log("formStructure received is :",this.props.formStructure)
      this.props.crudDispatchCreate({
        model: this.props.model,
        data: this.props.data,
      });
    } else if (this.props.method === "read") {
      this.props.crudDispatchRead({
        model: this.props.model,
        id: this.props.id,
      })
    } else if (this.props.method === "update") {
      this.props.crudDispatchUpdate({
        id: this.props.id,
        model: this.props.model,
        data: this.props.data,
      })
    } else if (this.props.method === "delete") {
      this.props.crudDispatchDelete({
        id: this.props.id,
        model: this.props.model,
      })
    } else {
      // this.props.crudDispatchRead({
      //   model: this.props.model || "cruds",
      // })
    }
  }



  addData = (e) =>{
    e.preventDefault();
    console.log("How many times add called");
    // console.log("form data is :", this.props.formData);
    // console.log("Ref data from form is ",this.input.value)
    // console.log("event data from form submit is :", e.target.value);
    const data = {}
    this.props.formStructure.map((each) => 
      data[each.name] = `${e.target[each.name].value}`
    )
    setTimeout(() => {
      console.log('data in add is :',data)
      this.props.crudDispatchCreate({
        model: this.props.model,
        data,
      });
      console.log("add api call is")
      this.setState({
        method:"read",
      })
      console.log("state now is :",this.state.method)
    },200)
  }

  updateData = (id,structure,e) => {
    e.preventDefault();
    // get data from server to prefill the form
    // this.props.crudDispatchRead({
    //   model: this.props.model,
    //   id: this.props.id,
    // })
    // console.log("field values now can be acquired from crudReadPayload", this.props.crudReadPayload)
    // console.log("form data is :", this.props.formData);
    // console.log("event data from form submit is :", e.target.value);
    const data = {}
    structure.map((each) =>
      data[each.name] = `${e.target[each.name].value}`
    )
    setTimeout(() => {
      console.log("data in update is",data)
      this.props.crudDispatchUpdate({
        id,
        model: this.props.model,
        data,
      })
    }, 200)
  }

  clickHandler = (id, e) => {
    // this.props.id = id
    e.preventDefault();
    console.log("e is ", e)
    const formStructure = [];
    console.log("id from click handler is", id)
    // console.log("formStrurcture outside is : ", formStructure)
    this.props.crudDispatchUpdateItem({
      model: this.props.model,
      id,
    })
    console.log("this.props.crudUpdate got assigned first")
    console.log("this.props.crudMethod", this.props.crudMethod)
    setTimeout(() => {
      console.log("this.props.crudUpdateItem is", this.props.crudUpdateItem)
      console.log("this.props.crudUpdate got assigned seconnd")
      this.setState({
        display: <Crud
          method = "update"
          model = "chefs"
          id = "cju46xpa100010zoc7s3gjmgy"
          // data={updateData}
          formStructure = {this.props.formStructure}
        />,
      })
      
      // Object.keys(this.props.crudUpdateItem).map((each, key) => (
      //   // console.log('each is ', readPayload[each]),
      //   // formStructure[each] = readPayload[each]
      //   console.log(`<div><lable>${each}</lable><input type="text" name=${each} placeholder=${this.props.crudUpdateItem[each]}`)
      //   // formStructure.push(`<div><lable>${each}</lable><input type="text" name=${each} placeholder=${readPayload[each]}`)
      // ))
      // console.log("formStrurcture is : ", formStructure)

    }, 200).bind(this)
    return formStructure
  };

  clickUpdate = (id,data, e) => {
    console.log("clickupdate being clicked")
    e.preventDefault()
    console.log('e is ', e)
    console.log('data is ',data)
    this.setState({
      reads: <Form
        formStructure={data}
        submitFunc={e =>this.updateData(id,data,e)}
      />,
    })
  }


  render() {
    // const apiData = { ...this.props.crudPropsApiData };
    console.log("typeof (this.props.crudReadPayload)", typeof (this.props.crudReadPayload))
    console.log("this.props.method", this.props.method)
    console.log("this.props.crudMethod", this.props.crudMethod)
    console.log("crudUpdate get rerendered fifth")
    // console.log("apiData:: ", apiData);
    if (this.props.method === "add") {
      console.log("add get rerendered")
      return (
        <div>
          <Helmet>
            <title>CRUD CREATE</title>
            <meta name="description" content="Description of Crud" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <Form
            formStructure={this.props.formStructure}
            submitFunc={this.addData}
          />
        </div>
      )
    } 
    if (this.props.method === "update") {
      console.log("crudUpdate get rerendered first")
      setTimeout(() => {
        console.log("crudUpdate get rerendered fourth")
        return (
          <div>
            <Helmet>
              <title>CRUD UPDATE</title>
              <meta name="description" content="Description of Crud" />
            </Helmet>
            <FormattedMessage {...messages.header} />
            <h3>{this.state.display}</h3>
            <Form
              formUpdate={this.props.crudUpdateItem}
              submitFunc={e => this.updateData(e)}
            />
          
            {/* {Object.keys(this.props.crudReadPayload).map(each => (
              <div>
                <Card
                  key={each._id}
                  {...each}
                  click={this.clickHandler.bind(this, each.cuid)}
                />
              </div>
            ))} */}
      
          </div>
        )
      },800)
     
    } if (this.props.method === "delete") {
      console.log("delete get rerendered")
      return (
        <div>
          <Helmet>
            <title>CRUD DELETE</title>
            <meta name="description" content="Description of Crud" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <Form
            formStructure={this.props.formStructure}
            submitFunc={e => this.deleteData(e)}
          />
        </div>
      )
    }
    if(this.state.method === "read"){
      console.log("read gets rerendered")
      return (
        <div>
          <Helmet>
            <title>CRUD READ</title>
            <meta name="description" content="Description of Crud" />
          </Helmet>
          <FormattedMessage {...messages.header} />
          <div>{this.state.reads}</div>
          <pre><code>{JSON.stringify(this.props.crudReadPayload)}</code></pre>
          <div>
            {this.props.crudReadPayload.map(each => (
              <div>
                <Card
                  key={each.cuid}
                  {...each}
                  click={
                    e => this.clickUpdate(each.cuid,this.props.formStructure, e)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
    
}


Crud.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  model: PropTypes.string,
  data: PropTypes.object,
  id: PropTypes.string,
  method: PropTypes.string,
  crudMethod: PropTypes.string,
  formStructure: PropTypes.array,
  crudPropsApiData: PropTypes.array,
  crudReadPayload: PropTypes.array,
  crudCreatePayload: PropTypes.object,
  crudUpdatePayload: PropTypes.object,
  crudUpdateItem: PropTypes.object,
  crudDeletePayload: PropTypes.object,
  crudDispatchApiData: PropTypes.func,
  crudDispatchCreate: PropTypes.func,
  crudDispatchRead: PropTypes.func,
  crudDispatchUpdate: PropTypes.func,
  crudDispatchUpdateItem: PropTypes.func,
  crudDispatchDelete: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // crud: makeSelectCrud(),
  crudPropsApiData: makeCrudApiDataSelector(),
  crudCreatePayload: makeCrudCreateSelector(),
  crudReadPayload: makeCrudReadSelector(),
  crudUpdatePayload: makeCrudUpdateSelector(),
  crudUpdateItem: makeCrudUpdateItemSelector(),
  crudMethod: makeCrudMethod(),
  crudDeletePayload: makeCrudDeleteSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatch,
    crudDispatchApiData: (tenantId, skip, take) =>
      dispatch(crudActionApiData(tenantId, skip, take)),
    crudDispatchCreate: ({data, model}) =>
      dispatch(crudActionCreate({data, model})),
    crudDispatchRead: ({id, model}) =>
      dispatch(crudActionRead({id, model})),
    crudDispatchUpdate: ({data,id, model}) =>
      dispatch(crudActionUpdate({ data, id, model })),
    crudDispatchUpdateItem: ({id, model}) =>
      dispatch(crudActionUpdateItem({id, model})),
    crudDispatchDelete: ( {id, model} ) =>
      dispatch(crudActionDelete({id, model})),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "crud", reducer });
const withSaga = injectSaga({ key: "crud", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Crud);
