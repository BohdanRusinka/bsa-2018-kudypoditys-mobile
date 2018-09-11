import { SEARCH_UPDATE, PROPERTY_FETCH, SEARCH_SUBMIT } from "./actionTypes";
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
        lastUpdate: Date.parse(new Date())
      };
    }
    default: {
      return state;
    }
  }
}
