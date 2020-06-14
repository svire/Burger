import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl";

const controls = [
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"},
  {label: "Cheese", type: "cheese"},
  {label: "meat", type: "meat"}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current price:<strong>{props.price.toFixed(2)}</strong>{" "}
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]} //{salad: false, bacon: true, meat: true, cheese: true}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? "ORDER NOW" : "SIGN IN FIRST"}
    </button>
  </div>
);

export default buildControls;

// added={() => props.ingredientAdded(ctrl.type)}    addIng={props.addIng}  type={ctrl.type}
