import api from "../helpers/api";
import Storage from "../helpers/asyncStorage";

class SearchService {
  searchProperties(params) {
    return api
      .sendRequest(`/api/search-property${params}`, "get")
      .then(response => response.data)
      .catch(err => {
        return Promise.reject(err.message);
      });
  }

  searchProperty(params) {
    return api
        .sendRequest(`/api/property/${params}`, "get")
        .then(response => response.data)
        .catch(err => {
          return Promise.reject(err.message);
        });
  }

  bookProperty(params) {
    return api
        .sendAuthRequest(`/api/reservation`, "post", params)
        .then(response => response.data)
        .catch(err => {
          return Promise.reject(err.message);
        });
  }
}

export default new SearchService();
