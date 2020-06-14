import React, {Component} from "react";
import classes from "./Modal.module.css";

import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  //kako bi se komponenta OrderSummary(koja je Wrapovana u Modalu) koja se re-renderuje i kada nema potrebe
  //treba prvo zaustaviti Modal da se re-renderuje

  //a sad ovo isto sranje NE PRIKAZUJE PROMJENE AKO SE PROMJENE PROPS od djece dodaj props.children
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    ) {
      return true;
    } else {
      return false;
    }
  }
  //i ovaj gore kod sad ne updajtuje nepotrebno prilikom klikanja GORE/DOLE
  //modal je samo to bijelo oko OrderSummary

  componentWillUpdate() {
    console.log("[Modal will Update]");
  }

  //PureCOmponent will also check modalClosed was been checked
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
            backgroundColor: !this.props.transparent ? "white" : "transparent"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;

//treba Aux da wrapujes to  i Modal

/*


const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.modalClosed} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0"
      }}
    >
      {props.children}
    </div>
  </Aux>
);


*/
