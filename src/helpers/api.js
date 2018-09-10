import axios from "axios";
import Storage from "./asyncStorage";
const baseUrl = "http://kudypoditys.ml";

class Api {
  constructor() {
    this.adapter = axios.create({
      baseURL: baseUrl,
    });
  }

  sendAuthRequest = async (url, type, payload) => {
    try {
      await this.checkAccessToken();
      const headers = await this.getAuthHeader();
      return this.adapter.request({
        url: url, // url
        method: type.toUpperCase(), // 'get' -> 'GET'
        data: payload, // body
        headers: {
          ...headers,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  sendRequest = (url, type, payload) => {
    return this.adapter
      .request({
        url: url, // url
        method: type.toUpperCase(), // 'get' -> 'GET'
        data: payload, // body
      })
      .catch(this.handleApiError);
  };

  async getAuthHeader() {
    const { accessToken } = await Storage.getItem("tokenData");
    if (!accessToken) {
      return {};
    }

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  async checkAccessToken() {
    const { accessToken } = await Storage.getItem("tokenData");
    if (!accessToken) {
      return this.refreshTokens();
    }

    return Promise.resolve();
  }

  async refreshTokens() {
    const { refreshToken } = await Storage.getItem("tokenData");
    if (!refreshToken) {
      // when this error go to login page
      return Promise.reject(new Error("refresh token not found"));
    }

    const url = `/api/refreshtoken/${refreshToken}`;
    return this.adapter.get(url).then(response => {
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
    });
  }

  handleApiError(err) {
    if (err.response && err.response.data) {
      return Promise.reject(new Error(err.response.data));
    }

    return Promise.reject(new Error(err.message));
  }
}

export default new Api();
