import { SEARCH_SUBMIT, PROPERTY_FETCH } from "./actionTypes";
import { all, call, put, takeLatest } from "redux-saga/effects";
import searchService from "../../services/searchService";

function* search(action) {
  try {
    const { query, rooms, adults, children, startDate, endDate, page } = action.payload;
    //http://kudypoditys.ml/search-page?query=Lviv&rooms=1&adults=1&children=1&startDate=1536606838947&endDate=1537038838947&page=1
    const queryString =
        `?query=${query}&rooms=${rooms}&adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&page=${page}`;
    const response = yield call(searchService.searchProperties, queryString);
    // console.log(response.properties[0].name);

    yield put({
      type: PROPERTY_FETCH,
      payload: response
    });

  } catch (err) {
    console.log("Search saga error ->", err);
  }
}

export default function* searchSaga() {
  yield all([takeLatest(SEARCH_SUBMIT, search)]);
}
