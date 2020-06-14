import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
  orders: [],
  loading: false, //,
  purchased: false
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, {loading: false});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };

    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.PURCHASE_BURGER_SUCCESS:
      //merge two in one object before add to orders array
      const newOrder = {
        ...action.orderData, //copy the object
        id: action.orderId //add a property id
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder),
        purchased: true
      };

    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, {loading: true});
    /*  return {
        ...state,
        loading: true
      };
*/
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders,
        loading: false
      };

    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
        //error: true  to neces ovde
      };

    default:
      return state;
  }
};

export default reducer;
