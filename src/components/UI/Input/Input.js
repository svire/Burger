import React from "react";
import classes from "./Input.module.css";
import {checkPropTypes} from "prop-types";

const input = (props) => {
  let inputElement = null;

  const inputClasses = [classes.InputElement]; //ovo treba da stil bude crven

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      ); // {...props}-> js object sa pravilima
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      let opcije = [];
      for (let kej in props.elementConfig) {
        // console.log(props.elementConfig[kej]); // [ {…}, {…} ]
        props.elementConfig[kej].map((item) => {
          // console.log(item.value);
          // console.log(item.displayValue);
          opcije.push(
            <option key={item.value} id={item.value}>
              {item.displayValue}
            </option>
          );
        });
      }
      inputElement = <select onChange={props.changed}>{opcije} </select>;
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
