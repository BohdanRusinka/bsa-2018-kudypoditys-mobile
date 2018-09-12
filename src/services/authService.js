import api from "../helpers/api";
import Storage from "../helpers/asyncStorage";

class AuthService {
  signup(user) {
    return api
      .sendRequest("/api/signup", "post", user)
      .then(response => response.data)
      .catch(err => {
        return Promise.reject(err.message);
      });
  }

  login(email, password) {
    return api
      .sendRequest("/api/login", "post", {
        email,
        password,
      })
      .then(response => {
        const {
          accessToken,
          refreshToken,
          accessExpiryDate,
          refreshExpiryDate,
        } = response.data;
        Storage.setItem("tokenData", {
          accessToken,
          refreshToken,
          accessExpiryDate,
          refreshExpiryDate,
        });
        return response.data;
      })
      .catch(err => {
        console.log("AuthService ERR: ", err);
        return Promise.reject(err.message);
      });
  }

  logout() {
    Storage.setItem("tokenData", null);
    Storage.setItem("loginStatus", null);
  }
}

export default new AuthService();
