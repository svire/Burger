import React, {Component} from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";

import {connect} from "react-redux";

//import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../../store/actions/index";

import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {value: "fastest", displayValue: "Fastest"},
            {value: "cheapest", displayValue: "Cheapest"}
          ]
        },
        validation: false,
        value: "fastest",
        valid: true
      }
    },
    loading: false,
    formIsValid: false
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

  //ODAVDE SALJES NA ORDERS.JS ono sranje
  orderHandler = (event) => {
    //  Form reloads the page defaul behaviour
    event.preventDefault(); // u FORM si stisno Button i on je reload the page i izgubio se state
    // this.setState({loading: true}); //da moze vrtiti dok cekas

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price, //inace ovo nije dobro(recalcualte price on the server)
      formData,
      userId: this.props.userId
    };

    this.props.onOrderBurger(order, this.props.token);

    /*
    axios
      .post("https://react-my-burger-7289d.firebaseio.com/orders.json", order)
      .then((response) => {
        this.setState((prevState) => {
          return {loading: !prevState.loading};
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState((prevState) => {
          return {loading: !prevState.loading};
        }); //even if the error occured we want to stop loading
      });  */
  };

  //sad da bi mogo updejtovati treba dodati i second argument indetifier
  inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      //copy it to be in immutable way
      ...this.state.orderForm //OVO NE COPIRA DEEPLE ovo ugnjezdeno unutra se ne pika
    };
    //kloniraj jedan objekat  DEEPLY  //name,street i to
    const updateFormElement = {...updatedOrderForm[inputIdentifier]};

    updateFormElement.value = event.target.value;

    updateFormElement.touched = true;

    updateFormElement.valid = this.checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updateFormElement;

    //  const formIsValid=false;        samo za zadnji OKRENI
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      //formIsValid=updatedOrderForm[inputIdentifier].valid  //ovako bi samo zadnji bio provjeren, a GORE false
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid; //i novi element i stari svi moraju biti TRUE
    }
    //ovo ne radi zbog selecta UNDEFINED is always treated like false

    //console.log(updateFormElement);
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  };

  render() {
    let formElementsArray = [];

    for (let kej in this.state.orderForm) {
      //console.log(this.state.orderForm[kej]);
      formElementsArray.push({
        id: kej, //KEY
        config: this.state.orderForm[kej] //bitno VALUE
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((item) => (
          <Input
            key={item.id}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            value={item.config.value}
            touched={item.config.touched}
            shouldValidate={item.config.validation}
            invalid={!item.config.valid} //tebu treba invalid
            changed={(event) => this.inputChangeHandler(event, item.id)} //to su iz niza name, street, ....
          />
        ))}

        <Button
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
          btnType="Success"
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
//  const userId = localStorage.getItem("userId");
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));

/*

import React, {Component} from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";

import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "aaa",
      postalCode: "aaa"
    },
    loading: false
  };

  //ODAVDE SALJES NA ORDERS.JS ono sranje
  orderHandler = (event) => {
    //  Form reloads the page defaul behaviour
    event.preventDefault(); // u FORM si stisno Button i on je reload the page i izgubio se state
    this.setState({loading: true}); //da moze vrtiti dok cekas

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, //inace ovo nije dobro(recalcualte price on the server)
      customer: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.address.street,
          postalCode: this.state.address.postalCode
        }
      }
    };
    axios
      .post("https://react-my-burger-7289d.firebaseio.com/orders.json", order)
      .then((response) => {
        this.setState((prevState) => {
          return {loading: !prevState.loading};
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        this.setState((prevState) => {
          return {loading: !prevState.loading};
        }); //even if the error occured we want to stop loading
      });
  };

  Promjeni = (event) => {
    let naziv = event.target.name;
    let vrednost = event.target.value;
    this.setState({[naziv]: vrednost});
  };
  Promjeni2 = (event) => {
    //event.preventDefault();
    let naziv = event.target.name;
    let vrednost = event.target.value;

    let stari = this.state.address;

    // console.log(stari);
    stari.street = vrednost;
    // console.log(stari);
    this.setState({address: stari});
  };

  render() {
    let form = (
      <form>
        <Input
          inputtype="text"
          type="text"
          name="name"
          onChange={this.Promjeni}
          placeholder="Your Name"
        />
        <Input
          inputtype="text"
          type="text"
          name="email"
          onChange={this.Promjeni}
          placeholder="Your Mail"
        />
        <Input
          inputtype="text"
          type="text"
          name="street"
          onChange={this.Promjeni2}
          placeholder="Your street"
        />
        <Input
          inputtype="text"
          type="text"
          name="postalCode"
          onChange={this.Promjeni2}
          placeholder="Postal Code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);


*/

/*

 <input
          className={classes.Input}
          type="text"
          name="postalCode"
          onChange={this.Promjeni2}
          placeholder="Postal Code"
        />



 const ingredients = this.props.ingredients;
    console.log(ingredients);

    const order = {
      ingredients: this.props.ingredients,
      price: "20", //inace ovo nije dobro(recalcualte price on the server)
      customer: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.address.street,
          postalCode: this.state.address.postalCode
        }
      }
    };
    axios
      .post("https://react-my-burger-7289d.firebaseio.com/orders.json", order)
      .then((response) => {
        this.setState((prevState) => {
          return {loading: !prevState.loading, purchasing: false};
        });
      })
      .catch((error) => {
        console.log(error);
        //  this.setState((prevState) => {
        //    return {loading: !prevState.loading, purchasing: false};
        //  }); //even if the error occured we want to stop loading
      }); //kreirace sam valjda sta posaljes na firebase




purchaseContinueHandler = () => {

    this.setState((prevState) => {
      return {loading: !prevState.loading};
    });

    
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice, //inace ovo nije dobro(recalcualte price on the server)
      customer: {
        name: "Max",
        address: {
          street: "Mk ",
          zipCode: "4443",
          country: "Germany"
        },
        email: "aaale@gmail.com"
      }
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState((prevState) => {
          return {loading: !prevState.loading, purchasing: false};
        });
      })
      .catch((error) => {
        this.setState((prevState) => {
          return {loading: !prevState.loading, purchasing: false};
        }); //even if the error occured we want to stop loading
      }); //kreirace sam valjda sta posaljes na firebase

  };

*/
