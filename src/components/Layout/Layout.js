import React, {Component} from "react";
import Aux from "../../hoc/Auxiliary";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: true
    };
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
    console.log("klik");
    //da se zatvori i sideDrawer
  };

  sideDrawerToggleHandler = () => {
    // this.setState({showSideDrawer: !this.state.showSideDrawer});
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer};
    });
  };

  // closeSide = () => {};

  render() {
    return (
      <Aux>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuthenticated} // token={this.props.token}
        />
        <SideDrawer
          clicked={this.sideDrawerClosedHandler}
          show={this.state.showSideDrawer}
          isAuth={this.props.isAuthenticated}
        />

        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
} //toolbar sadrzi navigation items

const mapStateToProps = (state) => {
  return {
    //  token: state.auth.token
    isAuthenticated: state.auth.token !== null
  };
};

//export default Layout;
export default connect(mapStateToProps)(Layout);

/*
TURN layout component into statefull component da mozes znati kad je kliknut SideDrawer valjda
const layout = (props) => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

*/
