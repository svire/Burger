import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

//specific helper method SHALLOW renders the component with all its content but the content isnt deeply rendered
//dont render whole subtree of the component (NOT THINGS NESTED INSIDE)

configure({adapter: new Adapter()}); //with this enzyme is connected

import NavigationItems from "./NavigationItems";
//import NavigationItems from "./NavigationItem/NavigationItem"
import NavigationItem from "./NavigationItem/NavigationItem";

describe("<NavigationItems/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("it should be render two NavigationItems if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2); //we pass things that we want to check,   find() utility function provided by enzyme
  });

  it("it should be render three NavigationItems if authenticated", () => {
    //const wrapper = shallow(<NavigationItems isAuth />);
    wrapper.setProps({isAuth: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3); //to.have.length(3) depend on validation library
  });

  it("it should contain nav item with signout NavigationItems if authenticated", () => {
    wrapper.setProps({isAuth: true});
    expect(
      wrapper.contains(<NavigationItem link="signout">Sign out</NavigationItem>)
    ).toEqual(true); //.toHaveLength(1);
  });

  /* it("it should be render two NavigationItems if not authenticated", () => {
    const wrapper = shallow(<NavigationItems />); //we pass JSX TO shallow method, storing the result in wrapper const
    //shallow rendering NavigationItems not sending any props here so,auth is not passed and therefore will be treated like false
    // pa ce proci jer stv 2 componente ce biti

    expect(wrapper.find(NavigationItem)).toHaveLength(2); //we pass things that we want to check,   find() utility function provided by enzyme
  });

  it("it should be render three NavigationItems if authenticated", () => {
    const wrapper = shallow(<NavigationItems isAuth />); //isAuth ocekuje
    const wrapper=shallow(<BurgerBuilder/>)
    expect(wrapper.find(NavigationItem)).toHaveLength(3); //we pass things that we want to check,   find() utility function provided by enzyme
  }); */
});
