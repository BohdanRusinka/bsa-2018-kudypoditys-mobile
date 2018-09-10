import { searchSubmit } from "../../logic/search/actions";

export function mapStateToProps(state) {
  const { login } = state;
  return {
      ...login
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    searchSubmit(data) {
      dispatch(searchSubmit(data));
    }
  }
}
