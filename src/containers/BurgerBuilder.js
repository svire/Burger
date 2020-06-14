import React, {Component} from "react";
import Aux from "../hoc/Auxiliary";
import Burger from "../components/Burger/Burger";
import BuildControls from "../components/Burger/BuildControls/BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../components/Burger/OrderSummary/OrderSummary";
import axios from "../axios-orders";
import Spinner from "../components/UI/Spinner/Spinner";
import WithErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";

//import * as actionTypes from "../store/actions";
import * as burgerBuilderActions from "../store/actions/index"; ///index  moze i bez index automatically

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // ingredients: { salad: 0,bacon: 0, meat: 0, cheese: 0     },
      // ingredients: null,
      // totalPrice: 3,
      // purchasable: false,
      purchasing: false //kad je order button click
      // loading: false,
      // error: null
    };
  }

  //ovo je sad prebaceno tamo u setIngredient
  componentDidMount() {
    //console.log(this.props);
    /* axios.get("/ingredients.json").then((response) => { // console.log(response.data);
        this.setState({ingredients: response.data}); }).catch((error) => {this.setState({error: error});   });  */
    this.props.onInitIngredient();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/signin");
    }
    //console.log("aaa");
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {
    //this.props.history.push("/checkout");
    //UMjesto direkt na firebase
    //   const queryParams = [];
    //   for (let i in this.state.ingredients) {
    //     queryParams.push(
    //       encodeURIComponent(i) +
    //         "=" +
    //         encodeURIComponent(this.state.ingredients[i])
    //     );
    //  }
    // queryParams.push("price=" + this.props.total);
    //  const queryString = queryParams.join("&");
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
    // this.props.history.push({ pathname: "/checkout",  search: "?" + queryString    });
  };

  //call at the end of addIngred removeIngred
  updatePurchaseState(updatedIngredients) {
    const ingredients = {
      ...updatedIngredients
    };

    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);

    //   if (sum > 0) {      const novi = !this.state.purchasable;
    //     this.setState({purchasable: novi});    }

    return sum > 0;
  }

  render() {
    //console.log(this.updatePurchaseState());

    const disabledInfo = {...this.props.ings}; //copy in immutable way

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; // true/false  {salad: false, bacon: true, meat: true, cheese: true}
    }

    let transparent = false;
    //if (this.state.loading) {   transparent = true;  }

    let burger = this.props.error ? (
      <p>Ingredient can' be loaded! {this.props.error.message}</p>
    ) : (
      <Spinner />
    );
    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.deleteIngredient}
            disabled={disabledInfo}
            // price={this.state.totalPrice}
            price={this.props.total}
            purchasable={this.updatePurchaseState(this.props.ings)} //stavis ovako jer oces da bude
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchasing={this.state.purchasing}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
          totalPrice={this.props.total}
        />
      );
    }
    /*   if (this.state.loading) {
      orderSummary = <Spinner />;
    } */

    return (
      <Aux>
        <Modal
          transparent={transparent}
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    total: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (name) =>
      // dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
      dispatch(burgerBuilderActions.addIngredient(name)),
    deleteIngredient: (name) =>
      // dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name})
      dispatch(burgerBuilderActions.removeIngredient(name)),
    onInitIngredient: () => dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));

/*



    /*
    this.setState((prevState) => {
      return {loading: !prevState.loading};
    });

    //alert("You 
    ed something");
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

      */
