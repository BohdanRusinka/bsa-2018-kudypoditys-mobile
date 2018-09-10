import { GET_CURRENT_USER, FETCH_CURRENT_USER } from "./actionTypes";

export function getCurrentUser(payload) {
  return {
    type: GET_CURRENT_USER,
    payload
  };
}


export function fetchCurrentUser(payload) {
  return {
    type: FETCH_CURRENT_USER,
    payload
  };
}
