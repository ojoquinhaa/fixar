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
    url: string = "http://metodofixar.com.br"
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
        url: `${this.url}/api/user/login?username=${this.username}&password=${this.password}`,
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
        url: `${this.url}/api/user`,
        headers: {
          Authorization: `Berear ${this.token}`,
        },
      });
      return request.data;
    } catch (e) {
      return e;
    }
  }
}
