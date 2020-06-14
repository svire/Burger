import React from "react";

import classes from "./DrawerToggle.module.css";

const drawerToggle = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div className={classes.dd}></div>
    <div className={classes.df}></div>
  </div>
);

export default drawerToggle;
//https://firebase.google.com/downloads/Firebase_One_Football_Case_Study.pdf
