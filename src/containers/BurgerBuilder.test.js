import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {BurgerBuilder} from "./BurgerBuilder"; //dodo si ispred BurgerBuilder export pa nije onaj dole sa connect Export

import BuildControls from "../components/Burger/BuildControls/BuildControls";

configure({adapter: new Adapter()}); //with this enzyme is connected

describe("<BurgerBuilder />", () => {
  //let wrapper;
  // beforeEach(() => {    wrapper = shallow(<BurgerBuilder />);  });

  const wrapper = shallow(<BurgerBuilder onInitIngredient={() => {}} />);

  it("Do we have ", () => {
    wrapper.setProps({ings: {salad: 0}}); //  wrapper.setProps({isAuth: true});
    //onInitIngredients sjebava sve
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
