import React from "react";
import Burger from "../../../Burger/Burger";
import Button from "../../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div style={{width: "100%", margin: "auto"}}>
        <Burger ingredients={props.ingredients} />

        <Button clicked={props.nazad} btnType="Danger">
          Cancel
        </Button>
        <Button clicked={props.checkoutContinued} btnType="Success">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default checkoutSummary;

// <Button clicked={() => console.log("jebem ti kru")} btnType="Danger">
//moras withRouterom dodati da bi ti radio   withRouter ubaci u Burger
//burger nema jos props.history   this.props.history.push("/checkout"); moras pass history
