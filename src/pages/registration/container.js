import { registrationSubmit } from "../../logic/registration/actions";

export function mapStateToProps(state) {
  const { registration } = state;
  return {
    registration
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    registrationSubmit(data) {
      dispatch(registrationSubmit(data));
    }
  }
}
