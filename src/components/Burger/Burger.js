import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import BurgerBuilder from "../../containers/BurgerBuilder";

import {withRouter} from "react-router-dom";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      }); //prev,curr          //initial value is empty array transformIngredients.Length===4
    })
    .reduce((arr, el) => {
      return arr.concat(el); //now we are flaten the array
    }, []);

  //moro si

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Nisi jos nista dodao!</p>;
  }

  //OVO SI DOBIJAO PRIJE REDUCE A AKO JE BIO PRAZAN     [ [], [], [], [] ]
  //Array(3) [ (1) […], (1) […], (2) […] ]            [ {…}, {…} ]
  //Array of Arrays
  //ako su tamo svi 0 [Array[0],Array[0]...]  [ [], [], [], [] ]

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

//export default burger;

//da dodas match i history
export default withRouter(burger);

//igKey je  salad meat cheese
//Object.keys(props.ingredients).map((igKey) => [...Array(props.ingredients[igKey])] // [undefined, undefined, undefined]
//map((_, v) => { return <BurgerIngredient key={igKey + v} type={igKey} />;
//(_ , v) key nas ne zanima                 key zbog rat
//0: ["salad"]
//1: ["meat"]
//2: (2) ["cheese", "cheese"]       length :2
//0: "cheese"
//1: "cheese"

/*

<BurgerIngredient type="salad" />
      <BurgerIngredient type="cheese" />
      <BurgerIngredient type="meat" />


 {Object.keys(props.ingredients).map((item) => (
        <BurgerIngredient type={item} />
      ))}
*/
