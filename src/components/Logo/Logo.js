import React from "react";
import classes from "./Logo.module.css";
import image from "../../assets/images/logo.png";
const logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={image} alt={"mySirko"} />
    </div>
  );
};

export default logo;
