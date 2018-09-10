import { loginSubmit } from "../../logic/login/actions";

export function mapStateToProps(state) {
  const { login } = state;
  return {
      ...login
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    submitLogin(data) {
      dispatch(loginSubmit(data));
    }
  }
}
