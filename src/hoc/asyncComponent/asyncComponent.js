import React, {Component} from "react";

// importComponent is a function
const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      //this will give us a promise which component are we going to load...
      importComponent().then((cmp) => this.setState({component: cmp.default}));
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
