import { all, call, put, takeLatest } from "redux-saga/effects";
import { REGISTRATION_SUBMIT, REGISTRATION_SUCCESS, REGISTRATION_FAILURE } from "./actionTypes";
import authService from "../../services/authService";

function* registrationSubmit(action) {
  try {
    const userData = action.payload.userData;
    const response = yield call(authService.signup, userData);
    console.log("REGISTRATION Response ->", response);
    yield put({
      type: REGISTRATION_SUCCESS
    })
  } catch (err) {
    console.log("REGISTRATION ERR ->", err);
    yield put({
      type: REGISTRATION_FAILURE,
      payload: err
    });
  }
}

export default function* registrationSaga() {
  yield all([takeLatest(REGISTRATION_SUBMIT, registrationSubmit)]);
}
