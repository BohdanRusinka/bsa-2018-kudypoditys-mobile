import { BOOKINGS_GET, BOOKINGS_FETCH } from "./actionTypes";
import defaultState from "../../logic/defaultState";

export default function bookingReducer(state = defaultState.bookings, action) {
  switch (action.type) {
    case BOOKINGS_FETCH: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case BOOKINGS_GET: {
      return {
        ...state,
        properties: {},
      };
    }

    default: {
      return state;
    }
  }
}
