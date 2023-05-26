import axios from "axios";

export type Book = {
  id?: number;
  name?: string;
  color?: string;
  background?: string;
};

export default class BookAPI {
  private token: string;
  private url: string;
  constructor(token: string, url: string = "http://metodofixar.com.br") {
    this.url = url;
    this.token = token;
  }

  async getAll() {
    try {
      const request = await axios({
        method: "GET",
        url: `${this.url}/api/books`,
        headers: {
          Authorization: `Berear ${this.token}`,
          Accept: "application/json",
        },
      });
      return request.data;
    } catch (e) {
      return e;
    }
  }

  async create(book: Book) {
    try {
      const request = await axios({
        method: "POST",
        url: `${this.url}/api/books`,
        headers: {
          Authorization: `Berear ${this.token}`,
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf8",
        },
        data: JSON.stringify(book),
      });
      return request.data;
    } catch (e) {
      return e as Error;
    }
  }

  async delete(id: number) {
    try {
      const request = await axios({
        method: "DELETE",
        url: `${this.url}/api/books?book=${id}`,
        headers: {
          Authorization: `Berear ${this.token}`,
          Accept: "application/json",
        },
      });
      return request.data;
    } catch (e) {
      return e as Error;
    }
  }
}
