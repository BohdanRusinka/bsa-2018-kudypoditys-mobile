import { all, fork } from "redux-saga/effects";
import search from "./search/saga";
import login from "./login/saga";
import user from "./auth-hoc/saga";

export default function* rootSaga() {
  yield all([fork(search), fork(login), fork(user)]);
}
