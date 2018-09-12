import {
  REGISTRATION_SUBMIT,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from "./actionTypes";
import defaultState from "../../logic/defaultState";

export default function registrationReducer(state = defaultState, action) {
  switch (action.type) {
    case REGISTRATION_SUBMIT: {
      return {
        ...state,
        ...action.payload,
        registrationStatus: undefined
      };
    }

    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registrationStatus: {
          error: false,
          message: "success"
        },
        lastUpdate: Date.parse(new Date())
      };
    }

    case REGISTRATION_FAILURE: {
      return {
        ...state,
        registrationStatus: {
          error: true,
          message: action.payload
        },
        lastUpdate: Date.parse(new Date())
      };
    }

    default: {
      return state;
    }
  }
}
