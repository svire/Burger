import reducer from "../reducers/auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the inital state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });

  it("should store token on auth_success", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/"
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "someUserId"
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "someUserId",
      error: null,
      loading: false,
      authRedirectPath: "/"
    });
  });
});
