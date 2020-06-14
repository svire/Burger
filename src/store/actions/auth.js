import * as actionTypes from "./actionTypes";
import axios from "axios";

//import fire from "../../store/config/fire";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

//export const authSuccess = (authData) => {
export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
    //authData: authData
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (emaily, passwordy, isSignup) => {
  return (dispatch) => {
    //console.log("emajl i paswo su" + email + password);
    dispatch(authStart());
    //api_key  api_key of our project https://firebase.google.com/docs/reference/rest/auth
    //request body payload ()

    const authData = {
      // email: email,
      // password: password,
      // email: "sirko@gmail.com",
      //  password: "[sirkoblas]",
      returnSecureToken: true
    };

    let dvica = {
      email: emaily.toString(), // email: "asds@gmail.com", // email: emaily, //email: "sirko5@gmail.com",
      password: passwordy.toString(), // password: passwordy, //password: "[sirkoblas]",
      returnSecureToken: true
    };

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASYtJla6ZSl4WJjX-g5EGBbTY_SHZEQXQ";

    if (!isSignup) {
      url =
        // "https://identitytoolkit.googleapis.com/v1/accounts:verifyPassword?key=AIzaSyASYtJla6ZSl4WJjX-g5EGBbTY_SHZEQXQ";
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASYtJla6ZSl4WJjX-g5EGBbTY_SHZEQXQ";
    }
    //zzz@gmail.com    zzzzzzzz
    axios
      .post(
        url,
        dvica
        // authData
      )
      .then((response) => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("mytoken", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSuccess(response.data.idToken, response.data.localId)); //u response data IMAS u authSuccess(localId, tokenId)
        dispatch(checkAuthTimeout(response.data.expiresIn)); //expiresIn: 3600
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("mytoken");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (exirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout()); //will dispatch the action after the expirition time
    }, exirationTime * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("mytoken");

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

/*


/*
export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
          dispatch(logout());
      } else {
          const expirationDate = new Date(localStorage.getItem('expirationDate'));
          if (expirationDate <= new Date()) {
              dispatch(logout());
          } else {
              const userId = localStorage.getItem('userId');
              dispatch(authSuccess(token, userId));
              dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
          }   
      }
  };
}; */

/*
return (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate > new Date()) {
        //new Date now
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout(expirationDate.getSeconds()-new Date().getSeconds()))
      }
    }
  };



export const auth = (emaily, passwordy) => {
  return (dispatch) => {
    //console.log("emajl i paswo su" + email + password);
    dispatch(authStart());
    //api_key  api_key of our project https://firebase.google.com/docs/reference/rest/auth
    //request body payload ()

    const authData = {
      // email: email,
      // password: password,
      // email: "sirko@gmail.com",
      //  password: "[sirkoblas]",
      returnSecureToken: true
    };

    let dvica = {
      email: emaily.toString(), // email: "asds@gmail.com", // email: emaily, //email: "sirko5@gmail.com",
      password: passwordy.toString(), // password: passwordy, //password: "[sirkoblas]",
      returnSecureToken: true
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASYtJla6ZSl4WJjX-g5EGBbTY_SHZEQXQ",
        dvica
        // authData
      )
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err));
      });
  };
};


*/
