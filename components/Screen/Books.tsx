import { Pressable, Text, ScaledSize, useWindowDimensions } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";
import { getBooksStyleSheet } from "../../styles";
import { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import BookAPI, { Book } from "../../API/Book";
import DrawerList from "../Drawer/DrawerList";
import BookPressable from "../Book/BookPressable";
import NewBookView from "../Book/NewBookView";
import { Color } from "react-color";
import { ScrollView } from "react-native-gesture-handler";
import BookSearchBar from "../Book/BookSearchBar";

export default function Books() {
  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();

  const styles = getBooksStyleSheet(window, theme);
  const route = useRoute<RouteProp<DrawerList>>();

  const [books, setBooks] = useState<Book[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<Book[]>([]);

  const [name, setName] = useState("");
  const [bookColor, setBookColor] = useState<Color>("#322f37");
  const [textColor, setTextColor] = useState<Color>("#FFFFFF");

  useEffect(() => {
    const { token } = route.params;
    const api = new BookAPI(token);
    api.getAll().then((data) => {
      setSearchData(data);
      setBooks(data);
    });
  }, [visible]);

  return (
    <ScrollView
      style={{ maxHeight: "100%", height: "100%" }}
      contentContainerStyle={styles.books}
      key="Books"
    >
      <BookSearchBar data={searchData} setBooks={setBooks} />
      <Pressable style={styles.addBook} onPress={() => setVisible(true)}>
        <Text style={{ fontSize: 50 }}>+</Text>
      </Pressable>
      {visible ? (
        <NewBookView
          bookColor={bookColor}
          name={name}
          setBookColor={setBookColor}
          setName={setName}
          setTextColor={setTextColor}
          textColor={textColor}
          token={route.params.token}
          setBooks={setBooks}
          setVisible={setVisible}
        />
      ) : null}
      {books.map((book: Book, index: number) => (
        <BookPressable
          book={book}
          window={window}
          key={index}
          token={route.params.token}
          books={books}
          setBooks={setBooks}
          setData={setSearchData}
        />
      ))}
    </ScrollView>
  );
}
