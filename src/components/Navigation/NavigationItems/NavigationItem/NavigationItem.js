import React from "react";
import classes from "./NavigationItem.module.css";
import {NavLink} from "react-router-dom";

const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink exact activeClassName={classes.active} to={props.link}>
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;

//<a class="Navigationitem__active__2zJd0"
//dodaj activeClassName
//Active class in Nav link wont match active class imace neko ime classJfkgaj

//NAV LINK AUTOMATICALY DETERMINES STLE NE TREBA  className={props.active ? classes.active : null}>

/*

 <li className={classes.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : null}>
      {props.children}
    </a>
  </li>

*/
