import {
  REGISTRATION_SUBMIT,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from "./actionTypes";

export function registrationSubmit(payload) {
  return {
    type: REGISTRATION_SUBMIT,
    payload
  };
}

export function registrationSuccess(payload) {
  return {
    type: REGISTRATION_SUCCESS,
    payload
  };
}

export function registrationFailure(payload) {
  return {
    type: REGISTRATION_FAILURE,
    payload
  };
}

