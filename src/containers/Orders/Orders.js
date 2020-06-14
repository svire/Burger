import React, {Component} from "react";

import Order from "../../components/UI/Order/Order";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
//import {fetchOrders} from "../../store/actions";

import * as actions from "../../store/actions/index";

class Orders extends Component {
  /*
  state = {
    orders: [],
    loading: false
  };  */

  //ORDERS JE SAD
  //   /Object { customer: {…}, ingredients: {…}, price: "5" } .....

  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId); //OnInitOrders();

    /*
    this.setState({loading: true});
    axios
      .get("https://react-my-burger-7289d.firebaseio.com/orders.json")
      .then((response) => {
        //pretvori prvo object in array
        let novi = [];
        for (let key in response.data) {
          //key je bio :   -Lz-T6xOxQaY8iCcfD_u
          //novi.push(response.data[key]);
          novi.push({
            ...response.data[key],
            id: key //sa keyom tipa -Lz-T6xOxQaY8iCcfD_u
          });
        }

        this.setState({orders: novi, loading: false});
      })
      .catch((err) => {
        this.setState({loading: false});
      });


      */
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((item) => {
        return (
          <Order
            key={item.id}
            price={parseFloat(item.price).toFixed(2)}
            ingredients={item.ingredients}
          />
        );
      });
    }

    return <div>{orders}</div>;
    /*
    let orderi = <p>You dont have orders yet!</p>;
    if (this.props.orders.length > 0) {
      orderi = this.props.orders.map((item) => {
        return (
          <Order
            key={item.id}
            price={parseFloat(item.price).toFixed(2)}
            ingredients={item.ingredients}
          />
        );
      });
    }
    */

    // return <div>{this.props.loading ? <Spinner /> : orderi}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders, //REACHING OUT TO THE ORDER REDUCER
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
/*
zasto bi to tu radio prebaci to tamo u Order props.ingredients pa raspakuj
<Order
            key={item.id}
            idd={item.id}
            price={parseFloat(item.price).toFixed(2)}
            bacon={item.ingredients.bacon}
            cheese={item.ingredients.cheese}
            meat={item.ingredients.meat}
            salad={item.ingredients.salad}
          />




{…}​
"-Lz-T6xOxQaY8iCcfD_u": {…}​​
customer: Object { address: {…}, email: "Sirko", name: "Sirko" }​​
ingredients: Object { bacon: 0, cheese: 0, meat: 0, … }​​
price: "5"


*/
