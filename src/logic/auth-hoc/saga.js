import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_CURRENT_USER, FETCH_CURRENT_USER, REMOVE_CURRENT_USER } from "./actionTypes";
import userService from "../../services/userService";
import Storage from "../../helpers/asyncStorage";

function* getCurrentUser(action) {
  try {
    const user = yield call(userService.getCurrentUser);
    console.log("USER:", user);
    yield put({
      type: FETCH_CURRENT_USER,
      payload: user
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: REMOVE_CURRENT_USER,
    });
  }
}

export default function* userSaga() {
  yield all([
    takeLatest(GET_CURRENT_USER, getCurrentUser),
  ]);
}
