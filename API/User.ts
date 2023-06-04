import axios from "axios";

export type User = {
  username?: string;
  password?: string;
  token?: string;
};

export default class UserAPI {
  url: string;
  private username: string;
  private password: string;
  private token: string;
  constructor(
    username: string = "",
    password: string = "",
    token: string = "",
    url: string = "https://metodofixar.com.br"
  ) {
    this.url = url;
    this.username = username;
    this.password = password;
    this.token = token;
  }

  async login() {
    try {
      const request = await axios({
        method: "POST",
        url: `${this.url}/api/token/`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Cache-Control": "no-cache",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: this.username,
          password: this.password,
        }),
      });
      return request.data;
    } catch (e) {
      return e;
    }
  }

  async confirmLogin() {
    try {
      const request = await axios({
        method: "GET",
        url: `${this.url}/api/users`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      });
      return request.data;
    } catch (e) {
      return e;
    }
  }

  async changePassword(password: string) {
    try {
      const request = await axios({
        method: "PUT",
        url: `${this.url}/api/users`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          "Cache-Control": "no-cache",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          password,
        }),
      });
      return request.data;
    } catch (e) {
      return e;
    }
  }
}
