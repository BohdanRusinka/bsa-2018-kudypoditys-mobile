import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from "./actionTypes";
import defaultState from "../defaultState";

export default function(state = defaultState.login, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
          ...state,
          ...action.payload
      };
    }

    case LOGIN_FAILURE: {
      return {
        ...state,
        ...action.payload
      };
    }

    case LOGOUT_SUCCESS: {
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
