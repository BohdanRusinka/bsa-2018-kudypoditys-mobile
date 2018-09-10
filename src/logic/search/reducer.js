import { SEARCH_UPDATE, SEARCH_SUBMIT } from "./actionTypes";
import defaultState from "../defaultState";

export default function searchReducer(state = defaultState.search, action) {
  switch (action.type) {
    case SEARCH_UPDATE: {
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
