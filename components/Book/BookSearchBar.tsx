import { Searchbar } from "react-native-paper";
import { Book } from "../../API/Book";
import { Dispatch, SetStateAction, useState } from "react";
import { ScaledSize, useWindowDimensions } from "react-native";
type props = {
  data: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
};
export default function BookSearchBar({ setBooks: setBooks, data }: props) {
  const [searchBarText, setSearchBarText] = useState<string>("");
  const { width }: ScaledSize = useWindowDimensions();
  return (
    <Searchbar
      placeholder="Search"
      value={searchBarText}
      onChangeText={(text) => {
        if (!data) return;
        setBooks(data.filter((f: Book) => f.name?.search(text) !== -1));
        if (text === "") {
          setBooks(data);
        }
        setSearchBarText(text);
      }}
      mode="view"
      style={{ width: width * 0.2 + 200, marginTop: 20 }}
    />
  );
}
