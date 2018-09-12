import { BOOKINGS_FETCH, BOOKINGS_GET, BOOKINGS_CANCEL } from "./actionTypes";

export function getBookings() {
  return {
    type: BOOKINGS_GET
  };
}

export function fetchBookings(payload) {
  return {
    type: BOOKINGS_FETCH,
    payload
  };
}

export function cancelBooking(payload) {
  return {
    type: BOOKINGS_CANCEL,
    payload
  };
}
