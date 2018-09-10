import {GET_CURRENT_USER, FETCH_CURRENT_USER, REMOVE_CURRENT_USER} from "./actionTypes";
import defaultState from "../defaultState";

export default function authHOCReducer(state = defaultState.user, action) {
  switch (action.type) {
    case GET_CURRENT_USER: {
      return {
        ...state,
        ...action.payload
      };
    }
    case FETCH_CURRENT_USER: {
      return {
        ...state,
        ...action.payload
      };
    }

    case REMOVE_CURRENT_USER: {
      return {
        state
      };
    }
    default: {
      return state;
    }
  }
}
