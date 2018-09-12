const state = {
  search: {
    query: "",
    rooms: "1",
    adults: "1",
    children: "0",
    checkin: "",
    checkout: "",
    page: "1",
    foundProperties: {},
    lastUpdate: 0
  },
  user: {},
  login: {
    loginStatus: null
  },
  bookings: {
    lastUpdate: 0
  },
  registration: {
    lastUpdate: 0
  }
};

export default state;
