import React from "react";
import {Link} from "react-router-dom";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {props.isAuth ? (
      <NavigationItem link="orders">Orders</NavigationItem>
    ) : null}

    {props.isAuth ? (
      <NavigationItem link="signout">Sign out</NavigationItem>
    ) : (
      <NavigationItem link="signin">Sign in</NavigationItem>
    )}
  </ul>
);
/*
  <NavigationItem link="signin">Sign in</NavigationItem>
 <NavigationItem link="look">
      {props.token ? "Log out" : "Log in"}
    </NavigationItem>
*/
export default navigationItems;

/*
active={true}    ne treba jer imas NavLink



 <Link to="/">
      <NavigationItem link="/" active={true}>
        Burger Builder
      </NavigationItem>
    </Link>
    <Link to="/checkout">
      <NavigationItem link="/">Checkout</NavigationItem>
    </Link>

*/
