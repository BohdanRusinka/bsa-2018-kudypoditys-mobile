import { SEARCH_UPDATE, SEARCH_SUBMIT, SEARCH_PROPERTY, BOOK_PROPERTY } from "./actionTypes";

export function searchUpdate(payload) {
  return {
    type: SEARCH_UPDATE,
    payload
  };
}

export function searchSubmit(payload) {
  return {
    type: SEARCH_SUBMIT,
    payload
  };
}

export function searchProperty(payload) {
  return {
    type: SEARCH_PROPERTY,
    payload
  }
}

export function bookProperty(payload) {
  return {
    type: BOOK_PROPERTY,
    payload
  }
}
