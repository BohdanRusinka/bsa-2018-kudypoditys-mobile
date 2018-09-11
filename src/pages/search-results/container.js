import { searchSubmit } from "../../logic/search/actions";

export function mapStateToProps(state) {
  const search = state.search;
  return {
      ...search
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchProperties(data) {
      dispatch(searchSubmit(data));
    },
  };
}
