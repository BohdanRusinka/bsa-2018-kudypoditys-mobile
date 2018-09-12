import { searchProperty, bookProperty } from "../../logic/search/actions";

export function mapStateToProps(state) {
  const { search } = state;
  return {
    property: search.searchResultProperty,
    bookResponse: search.bookResponse,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getProperty(data) {
      dispatch(searchProperty(data));
    },
    bookProperty(data) {
      dispatch(bookProperty(data));
    },
  };
}
