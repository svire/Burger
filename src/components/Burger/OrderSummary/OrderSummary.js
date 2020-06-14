import React, {Component} from "react";

import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span>
          {igKey} : {props.ingredients[igKey]}
        </span>
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>Delicios burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total price:{props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.cancel} btnType={"Danger"}>
        CANCEL
      </Button>
      <Button clicked={props.continue} btnType={"Success"}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;

/*

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span>
          {igKey} : {props.ingredients[igKey]}
        </span>
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order</h3>
      <p>Delicios burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total price:{props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clicked={props.cancel} btnType={"Danger"}>
        CANCEL
      </Button>
      <Button clicked={props.continue} btnType={"Success"}>
        CONTINUE
      </Button>
    </Aux>
  );
};


*/

/*  OVO NEMA SMISLA JER JE  VAMO <Modal show={}> <OrderSummary/> </Modal>

import React from "react";

import Aux from "../../../hoc/Auxiliary";
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span>
          {igKey} : {props.ingredients[igKey]}
        </span>
      </li>
    );
  });

  let komponenta = props.purchasing ? (
    <Aux>
      <h3>Your order</h3>
      <p>Delicios burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
    </Aux>
  ) : null;
  return <Aux>{komponenta}</Aux>;
};

export default orderSummary;


*/
