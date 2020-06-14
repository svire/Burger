import React, {Component} from "react";
//import CheckoutSummary from "../../components/UI/Order/CheckoutSummary";
import CheckoutSummary from "../../components/UI/Order/CheckoutSummary/CheckoutSummary";

import {Route, Redirect} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

import {connect} from "react-redux";

import * as actions from "../../store/actions/index";

class Checkout extends Component {
  /* sad ces ovo sve uvesti iz iz iz reduxa
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {},
      totalPrice: 0
    };
  }
*/
  /*
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};

    let price = 0;
    for (let param of query.entries()) {
      //['salad','1']

      if (param[0] === "price") {
        //   this.setState({totalPrice: param[1]});
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ingredients: ingredients, totalPrice: price});
  }

componentDidMount() {
    this.props.onInitPurchase();
  }

  */

  checkoutContinued = () => {
    //this.props.history.push("/checkout");
    //this.props.history.replace("/checkout/contact-data");
    this.props.history.replace("/checkout/contact-data");
  };

  nazad = () => {
    console.log("Sexi ritam");
    // this.props.history.push("/");
    this.props.history.goBack();
  };
  ajde = () => {
    //Ovde ces uzeti iz URL GORE ono sto je poslano i staviti za state
    // pathname:   ...search: "?bacon=0&cheese=0&meat=2&salad=0

    console.log(this.props.location.search);
    let search = this.props.location.search;
    search = search.replace("?", "");
    search = search.split("&"); //Array(4) [ "bacon=0", "cheese=0", "meat=2", "salad=0" ]

    // for (let i = 0; i < search.length; i++) {
    //   console.log(search[i]);
    // }
    const novi = {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    };

    for (let alo of search) {
      let mini = alo.split("=");
      novi[mini[0]] = +mini[1];

      //cheese=0 Checkout.js:31    meat=2 Checkout.js:31    salad=0
    }
    console.log(novi);
    this.setState({ingredients: novi});

    console.log("Novi state je ");
    console.log(this.state.ingredients);
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutContinued={this.checkoutContinued}
            nazad={this.nazad}
            ingredients={this.props.ings}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            //component={ContactData} ako oces da prebaci props
            /*  render={() => (
          <ContactData
            ingredients={this.props.ings}
            price={this.props.total}
          />  
        )}  */
            component={ContactData}
          />
        </div>
      );
    }
    return (
      <div
        style={{
          background: "salmon",
          textalign: "center"
        }}
      >
        {summary}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
    //,    total: state.totalPrice
  };
};

/* sve nakuca da kaze da kasni u componentDidMounte  
const mapDispatchToProps = (dispatch) => {
  return {
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }; //, mapDispatchToProps
}; // */

export default connect(mapStateToProps)(Checkout);

/*
<button onClick={this.ajde}>AJDE</button>

 componentDidMount = () => {
    //Ovde ces uzeti iz URL GORE ono sto je poslano i staviti za state
    // pathname:   ...search: "?bacon=0&cheese=0&meat=2&salad=0

    console.log(this.props.location.search);
    let search = this.props.location.search;
    search = search.replace("?", "");
    search = search.split("&"); //Array(4) [ "bacon=0", "cheese=0", "meat=2", "salad=0" ]

    // for (let i = 0; i < search.length; i++) {
    //   console.log(search[i]);
    // }
    const novi = {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    };

    for (let alo of search) {
      let mini = alo.split("=");
      novi[mini[0]] = +mini[1];

      //cheese=0 Checkout.js:31    meat=2 Checkout.js:31    salad=0
    }
    console.log(novi);
    this.setState({ingredients: novi});

    console.log("Novi state je ");
    console.log(this.state.ingredients);
  };

ajde = () => {
    //Ovde ces uzeti iz URL GORE ono sto je poslano i staviti za state
    // pathname:   ...search: "?bacon=0&cheese=0&meat=2&salad=0

    console.log(this.props.location.search);
    let search = this.props.location.search;
    search = search.replace("?", "");
    search = search.split("&"); //Array(4) [ "bacon=0", "cheese=0", "meat=2", "salad=0" ]

    // for (let i = 0; i < search.length; i++) {
    //   console.log(search[i]);
    // }
    const novi = {
      salad: 0,
      meat: 0,
      cheese: 0,
      bacon: 0
    };

    for (let alo of search) {
      let mini = alo.split("=");
      novi[mini[0]] = mini[1];

      //cheese=0 Checkout.js:31    meat=2 Checkout.js:31    salad=0
    }
    console.log(novi);
    this.setState({ingredients: novi});

    console.log("Novi state je ");
    console.log(this.state.ingredients);
  };



 


*/
