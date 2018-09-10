import api from "../helpers/api";
import Storage from "../helpers/asyncStorage";

class SearchService {
  searchProperties(params) {
    return api
      .sendRequest("/search-page", "get", params)
      .then(response => response.data)
      .catch(err => {
        return Promise.reject(new Error(err.message));
      });
  }
}

export default new SearchService();
