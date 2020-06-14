import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import {useImperativeHandle} from "react";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

//    const userId = localStorage.getItem("userId");
export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    // const userId = localStorage.getItem("userId");
    dispatch(purchaseBurgerStart());
    axios
      .post(
        "https://react-my-burger-7289d.firebaseio.com/orders.json?auth=" +
          token, //to reach protected resources
        orderData //, userId
      )
      .then((response) => {
        //dispatch(purchaseBurgerStart(response.data, orderData));
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        //this.setState((prevState) => { return {loading: !prevState.loading};  });  this.props.history.push("/");
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
        //  console.log(error); this.setState((prevState) => { return {loading: !prevState.loading}; }); //even if the error occured we want to stop loading
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
export const fetchOrdersSuccess = (orders) => {
  //
  //localStorage.getItem("")
  localStorage.getItem("userId");
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());

    const queryParams =
      // OVAKO RADI "https://react-my-burger-7289d.firebaseio.com/orders.json" + queryParams  QUERYPARAMS= "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get(
        "https://react-my-burger-7289d.firebaseio.com/orders.json" + queryParams
        // radi "https://react-my-burger-7289d.firebaseio.com/orders.json?auth=" + token
      )
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
        dispatch(fetchOrdersSuccess(novi));
        // this.setState({orders: novi, loading: false});
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
        // this.setState({loading: false});
      });
  };
};
