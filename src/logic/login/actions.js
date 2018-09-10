import {
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUBMIT
} from "./actionTypes";

export function loginSubmit(payload) {
  console.log("loginSubmit", payload);
  return {
    type: LOGIN_SUBMIT,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}


export function logout() {
  return {
    type: LOGOUT_SUBMIT
  }
}
