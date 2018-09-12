import { cancelBooking } from "../../logic/bookings/actions";

export function mapStateToProps(state) {
  return {};
}

export function mapDispatchToProps(dispatch) {
  return {
    cancelBooking(data) {
      dispatch(cancelBooking(data));
    },
  };
}
