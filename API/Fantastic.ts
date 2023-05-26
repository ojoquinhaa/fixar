import axios from "axios";

export type Fantastic = {
  id?: number;
  fantastic?: string;
  color?: string;
  util?: string;
  tag?: string;
  pag?: string;
  book?: number;
  owner?: number;
};

export default class FantasticAPI {
  private token?: string;
  private url?: string;
  private book?: number;
  constructor(
    token: string,
    bookID?: number,
    url: string = "http://metodofixar.com.br"
  ) {
    this.url = url;
    this.token = token;
    this.book = bookID;
  }
  async getByOwner() {
    try {
      const response = await axios({
        method: "GET",
        url: `${this.url}/api/fantastics`,
        headers: {
          Authorization: `Berear ${this.token}`,
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (e) {
      return e;
    }
  }
  async getByBook() {
    try {
      const response = await axios({
        method: "GET",
        url: `${this.url}/api/fantastics?book=${this.book}`,
        headers: {
          Authorization: `Berear ${this.token}`,
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (e) {
      return e;
    }
  }

  async create(fantastic: Fantastic) {
    try {
      const request = await axios({
        method: "POST",
        url: `${this.url}/api/fantastics`,
        headers: {
          Authorization: `Berear ${this.token}`,
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf8",
        },
        data: JSON.stringify(fantastic),
      });
      return request.data;
    } catch (e) {
      return e;
    }
  }
}
