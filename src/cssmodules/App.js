import React, {Component} from "react";

import "./App.css";
import Nesto from "./cssmodules/Nesto";
import BurgerBuilder from "./containers/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ale: true
    };
  }

  clickHandler = () => {
    this.setState({ale: !this.state.ale});
  };

  //https://fonts.google.com/

  render() {
    return (
      <div className="App">
        <button onClick={this.clickHandler}>WONT START NOW</button>
        <Nesto />
      </div>
    );
  }
}

export default App;
