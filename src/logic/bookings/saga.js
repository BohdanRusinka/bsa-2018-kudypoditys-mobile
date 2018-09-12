import { all, call, takeLatest, put } from "redux-saga/effects";
import { BOOKINGS_FETCH, BOOKINGS_GET, BOOKINGS_CANCEL } from "./actionTypes";
import bookingService from "../../services/bookingService";

function* getBookings(action) {
  try {
    const response = yield call(bookingService.getBookings);
    // console.log("BookingNow bookings Response ->", response);
    yield put({
      type: BOOKINGS_FETCH,
      payload: {
        properties: response,
        lastUpdate: Date.parse(new Date()),
      },
    });
  } catch (err) {
    console.log("BookingNow Saga Err ->", err);
  }
}

function* cancelBooking(action) {
  try {
    const id = action.payload.id;
    const response = yield call(bookingService.cancelBooking, id);
  } catch (err) {
    console.log(err);
  }
}

export default function* bookingSaga() {
  yield all([
    takeLatest(BOOKINGS_GET, getBookings),
    takeLatest(BOOKINGS_CANCEL, cancelBooking),
  ]);
}
