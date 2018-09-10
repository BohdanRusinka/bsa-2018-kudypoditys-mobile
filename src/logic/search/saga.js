import { SEARCH_SUBMIT } from "./actionTypes";
import { all, call, takeLatest } from "redux-saga/effects";
import searchService from "../../services/searchService";

function* search(action) {
  try {
    const params = action.payload;
    const properties = yield call(searchService.searchProperties, params);
    console.log("Properties from Search", properties);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}

export default function* searchSaga() {
  all([takeLatest(SEARCH_SUBMIT, search)]);
}
