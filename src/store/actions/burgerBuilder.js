import * as actionTypes from "../actions/actionTypes";
import axios from "../../axios-orders";
//CREATING ACTION CREATORS

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

//ovo je synchronous
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  //asynchronous code
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        //  this.setState({ingredients: response.data});
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        // this.setState({error: error});
        dispatch(fetchIngredientsFailed());
      });
  };
};
