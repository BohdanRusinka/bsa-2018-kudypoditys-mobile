import api from "../helpers/api";

class BookingService {
  getBookings() {
    return api
      .sendAuthRequest(`/api/reservation/byuser`, "get")
      .then(response => response.data)
      .catch(err => {
        return Promise.reject(err.message);
      });
  }
  cancelBooking(id) {
    return api
      .sendAuthRequest(`/api/reservation/${id}`, "delete")
      .then(response => response.data)
      .catch(err => {
        return Promise.reject(err.message);
      });
  }
}

export default new BookingService();
