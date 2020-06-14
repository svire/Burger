import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter} from "react-router-dom";

import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {Provider} from "react-redux";
//import reducer from "./store/reducer";

import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import thunk from "redux-thunk";
import orderReducer from "./store/reducers/order";

import authReducer from "./store/reducers/auth";

const composeEnhancers =
  process.env.NODE_ENV === "developmenty" //e sad radi i u mozzili SVASTA
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  //now we can start writing async code in our action creators
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //da radi u chromu prije compose enhance
);

//if you are using nodejs server ...you need to write catch all route and return index.html
const nesto = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(nesto, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
