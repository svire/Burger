import React, {Component} from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import classes from "./Auth.module.css";
import {connect} from "react-redux";

import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";

//import {firebase} from "../../store/config/fire";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  /*
  switchAuthMode() {
    console.log("asdsaddd");

    console.log(this.state.controls["email"]);
  }*/

  switchAuthMode = () => {
    //  this.setState({isSignup: !this.state.isSignup});
    //   console.log(this.state.isSignup);

    this.setState((prevState) => {
      return {isSignup: !prevState.isSignup};
    });
    console.log(this.state.isSignup);
  };

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName], // distribute that property
        value: [event.target.value], //overwrite some propertyeis
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({controls: updatedControls});
  };

  submitHandler = (event) => {
    event.preventDefault(); // jer se reloading app na form submit
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  render() {
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    let formElementsArray = [];

    for (let kej in this.state.controls) {
      formElementsArray.push({
        id: kej,
        config: this.state.controls[kej]
      });
    }

    let form = formElementsArray.map((item) => {
      return (
        <Input
          key={item.id}
          elementType={item.config.elementType}
          elementConfig={item.config.elementConfig}
          value={item.config.value}
          touched={item.config.touched}
          shouldValidate={item.config.validation}
          invalid={!item.config.valid} //tebu treba invalid
          changed={(event) => this.inputChangeHandler(event, item.id)}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        {errorMessage} {authRedirect}
        <form onSubmit={this.submitHandler}>
          {form}

          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthMode}>
          Switch to {this.state.isSignup ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}
/*
const mapStateToProps = (state) => {
  return {};
};      koij ce ti kurac ovde state??? samo da posaljes tamo da ses authenticate 
*/

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token != null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onAuth: (email, password) => dispatch(actions.auth(email, password))
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
//export default Auth;
