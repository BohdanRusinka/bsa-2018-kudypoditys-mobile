import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  LOGIN_SUBMIT,
  LOGIN_SUCCESS,
  LOGOUT_SUBMIT,
  LOGOUT_SUCCESS,
  LOGIN_FAILURE,
} from "./actionTypes";
import { GET_CURRENT_USER, REMOVE_CURRENT_USER } from "../auth-hoc/actionTypes";
import authService from "../../services/authService";
import Storage from "../../helpers/asyncStorage";

function* login(action) {
  try {
    console.log("loginSAGA:", action);
    const { email, password } = action.payload;
    const response = yield call(authService.login, email, password);
    console.log("RESPONSE", response);
    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        loginStatus: "success"
      },
    });
    yield put({
      type: GET_CURRENT_USER,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      payload: {
        loginStatus: err,
      },
    });
  }
}

function* logout(action) {
  console.log("LOGOUT SAGA");
  try {
    yield call(authService.logout);
    yield put({
      type: LOGOUT_SUCCESS,
      payload: {
        loginStatus: null,
      },
    });
    yield put({
      type: REMOVE_CURRENT_USER
    })
  } catch (err) {
    console.log(err);
  }
}

export default function* loginSaga() {
  yield all([
    takeLatest(LOGIN_SUBMIT, login),
    takeLatest(LOGOUT_SUBMIT, logout),
  ]);
}
