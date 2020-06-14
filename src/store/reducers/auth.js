import * as actionTypes from "../actions/actionTypes";

import {updateObject} from "../../store/utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const authStart = (state, action) => {
  return updateObject(state, {error: action.error, loading: true});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, {error: null, loading: true});
    // return updateObject(state, {error: false, loading: true});

    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
      });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, {error: action.error, loading: false});

    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, {
        token: null,
        userId: null
      });

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, {
        authRedirectPath: action.path
      });

    default:
      return state;
  }
};

export default reducer;

// you have to refresh the token to be sure that tokens dont expire
