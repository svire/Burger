import React, {Component} from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientsOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.key}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc"
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <h4>{props.idd}</h4>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price :<strong>USD {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;

/*





<div className={classes.Order}>
      <h4>{props.idd}</h4>
      <p>
        Ingredients: Meat: {props.meat} Cheese: {props.cheese} Salad:{" "}
        {props.salad} bacon: {props.bacon}
      </p>
      <p>
        Price :<strong>USD {props.price}</strong>
      </p>
    </div>

*/
