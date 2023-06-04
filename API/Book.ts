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
  constructor(token: string, url: string = "https://metodofixar.com.br") {
    this.url = url;
    this.token = token;
  }

  async getAll() {
    try {
      const request = await axios({
        method: "GET",
        url: `${this.url}/api/books/`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
      return request.data;
    } catch (e) {
      return e;
    }
  }

  async create(book: Book) {
    console.log(book);
    try {
      const request = await axios({
        method: "POST",
        url: `${this.url}/api/books/`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
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
        url: `${this.url}/api/books/${id}/`,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      });
      return request.status;
    } catch (e) {
      return e as Error;
    }
  }
}
