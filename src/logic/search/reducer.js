import {
  SEARCH_UPDATE,
  PROPERTY_FETCH,
  SEARCH_SUBMIT,
  PROPERTY_SINGLE_FETCH,
  PROPERTY_FETCH_ERROR,
  BOOK_PROPERTY_SUCCESS,
  BOOK_PROPERTY_FAILURE
} from "./actionTypes";
import defaultState from "../defaultState";

export default function searchReducer(state = defaultState.search, action) {
  switch (action.type) {
    case SEARCH_SUBMIT: {
      return {
        ...state,
        ...action.payload,
        foundProperties: {},
      };
    }
    case SEARCH_UPDATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case PROPERTY_FETCH: {
      return {
        ...state,
        foundProperties: action.payload,
        lastUpdate: Date.parse(new Date()),
      };
    }

    case PROPERTY_FETCH_ERROR: {
      return {
          ...state,
        foundProperties: undefined,
        lastUpdate: Date.parse(new Date()),
      };
    }

    case PROPERTY_SINGLE_FETCH: {
      return {
        ...state,
        searchResultProperty: action.payload,
      };
    }

    case BOOK_PROPERTY_SUCCESS: {
      return {
          ...state,
          ...action.payload
      };
    }

    case BOOK_PROPERTY_FAILURE: {
      return {
          ...state,
          ...action.payload
      };
    }

    default: {
      return state;
    }
  }
}
