import React, {Component} from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";

//import Checkout from "./containers/Checkout/Checkout";

import {Switch, Route, withRouter, Redirect} from "react-router-dom";

import Orders from "./containers/Orders/Orders";
//import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from "./store/actions/index";

import "./hoc/asyncComponent/asyncComponent";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

//argument should be function
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //console.log("AjdeeeBAAJAA" + this.props);
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/signin" component={asyncAuth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}></Route>
          <Route path="/orders" component={asyncOrders}></Route>
          <Route path="/signout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
//export default App;

//  <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>

/*
Kurs je cool. Ali vrlo velika. To je i plus i minus. Materijal je vrlo razumljiv, ali naizgled polugodišnji. 
Prošla sam 231 lekciju - pred urednicima - za mesec i po dana (ukupno 381 lekcija). Vježbala sam svaki dan nakon 
rada otprilike 3-4 sata - gledala sam i u isto vrijeme APSOLUTNO ponavljala sve i sređivala neshvatljive dijelove.
 10min video - potrebno je oko 25-40 minuta za prikaz + pisanje + raščlanjivanje nerazumljivo.
Jedini problem - fizički više ne mogu) Već mi je muka od riječi BurgerBilder. Odložio sam je pre nedelju dana 
i ne mogu ponovo da je pokrenem.


import React, {Component} from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";

//import Checkout from "./containers/Checkout/Checkout";

import {Switch, Route, withRouter, Redirect} from "react-router-dom";

import Orders from "./containers/Orders/Orders";
//import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from "react-redux";
import * as actions from "./store/actions/index";

import "./hoc/asyncComponent/asyncComponent";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

//argument should be function
const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //console.log("AjdeeeBAAJAA" + this.props);
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/signin" component={asyncAuth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/signout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
*/
