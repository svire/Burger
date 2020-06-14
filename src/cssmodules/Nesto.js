import React, {Component} from "react";
import "./nesto.css";
import classes from "./Nesto.module.css";

//ne moras vise npm eject

class Nesto extends Component {
  render() {
    let broj = Math.floor(Math.random() * 10);

    let stil = broj % 2 === 0 ? classes.par : classes.nepar;
    console.log(broj);
    return (
      <div>
        <h1 className={stil}>Koje je ovo stoljece</h1>
      </div>
    );
  }
}

export default Nesto;

/*
/*
const Nesto = () => {
  return (
    <div className="">
      <h1>Koje je ovo stoljece</h1>
    </div>
  );
};
/*
*/
