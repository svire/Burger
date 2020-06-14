import React from "react";

import classes from "./Button.module.css";

const button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

export default button;

//btn.Type danger or success         .join(' ')
//className={[classes.Button, classes[props.btnType]].join(" ")}
//
