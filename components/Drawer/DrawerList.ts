import { Dispatch, SetStateAction } from "react";
import { Book } from "../../API/Book";

type DrawerList = {
  Books: {
    token: string;
    book: Book;
  };
  Fantastic: { token: string; book: Book };
  Fantastics: { token: string; book: Book };
  Accont: {
    token: string;
    book: Book;
    setToken: Dispatch<SetStateAction<string>>;
    setLogged: Dispatch<SetStateAction<boolean>>;
  };
};
export default DrawerList;
