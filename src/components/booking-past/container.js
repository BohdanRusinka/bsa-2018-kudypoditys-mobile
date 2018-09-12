import { getBookings } from "../../logic/bookings/actions";

export function mapStateToProps(state) {
  const { bookings } = state;
  return {
    ...bookings,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getBookings() {
      dispatch(getBookings());
    },
  };
}
