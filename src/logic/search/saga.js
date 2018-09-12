import {
  SEARCH_SUBMIT,
  PROPERTY_FETCH,
  SEARCH_PROPERTY,
  PROPERTY_SINGLE_FETCH,
  PROPERTY_FETCH_ERROR,
  BOOK_PROPERTY,
  BOOK_PROPERTY_SUCCESS,
  BOOK_PROPERTY_FAILURE,
} from "./actionTypes";
import { all, call, put, takeLatest } from "redux-saga/effects";
import searchService from "../../services/searchService";

function* search(action) {
  try {
    const {
      query,
      rooms,
      adults,
      children,
      startDate,
      endDate,
      page,
    } = action.payload;
    //http://kudypoditys.ml/search-page?query=Lviv&rooms=1&adults=1&children=1&startDate=1536606838947&endDate=1537038838947&page=1
    const queryString = `?query=${query}&rooms=${rooms}&adults=${adults}&children=${children}&startDate=${startDate}&endDate=${endDate}&page=${page}`;
    const response = yield call(searchService.searchProperties, queryString);
    // console.log(response.properties[0].name);

    yield put({
      type: PROPERTY_FETCH,
      payload: response,
    });
  } catch (err) {
    console.log("Search saga error ->", err);
    yield put({
      type: PROPERTY_FETCH_ERROR,
      payload: err,
    });
  }
}

function* getProperty(action) {
  try {
    const id = action.payload.id;
    const response = yield call(searchService.searchProperty, id);
    yield put({
      type: PROPERTY_SINGLE_FETCH,
      payload: response,
    });
  } catch (err) {
    console.log(err);
  }
}

function* bookProperty(action) {
  try {
    const response = yield call(
      searchService.bookProperty,
      action.payload.bookingData,
    );
    yield put({
      type: BOOK_PROPERTY_SUCCESS,
      payload: {
        bookResponse: response,
      },
    });
    console.log(response);
  } catch (err) {
    yield put({
      type: BOOK_PROPERTY_FAILURE,
      payload: {
        bookResponse: response,
      },
    });
  }
}

export default function* searchSaga() {
  yield all([
    takeLatest(SEARCH_SUBMIT, search),
    takeLatest(SEARCH_PROPERTY, getProperty),
    takeLatest(BOOK_PROPERTY, bookProperty),
  ]);
}
