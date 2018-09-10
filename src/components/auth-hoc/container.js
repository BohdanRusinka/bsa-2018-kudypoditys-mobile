import { getCurrentUser } from "../../logic/auth-hoc/actions";
import { logout } from "../../logic/login/actions";

export function mapStateToProps(state) {
  const { user } = state;
  return {
    user,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getCurrentUser(data) {
      dispatch(getCurrentUser(data));
    },
    logout() {
      dispatch(logout());
    }
  };
}
