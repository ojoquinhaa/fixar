import {
  ScaledSize,
  useWindowDimensions,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { MD3Theme, Text, useTheme } from "react-native-paper";
import { getBooksStyleSheet } from "../../styles";
import { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import BookAPI, { Book } from "../../API/Book";
import DrawerList from "../Drawer/DrawerList";
import BookPressable from "../Book/BookPressable";
import BookSearchBar from "../Book/BookSearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import NewBookView from "../Book/NewBookView";

export default function Books() {
  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();

  const styles = getBooksStyleSheet(window, theme);
  const route = useRoute<RouteProp<DrawerList>>();

  const { token } = route.params;

  const [books, setBooks] = useState<Book[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<Book[]>([]);

  const [name, setName] = useState("");
  const [bookColor, setBookColor] = useState<string>("#322f37");
  const [textColor, setTextColor] = useState<string>("#FFFFFF");

  useEffect(() => {
    const api = new BookAPI(token);
    api.getAll().then((data) => {
      setSearchData(data);
      setBooks(data);
    });
  }, [visible]);

  return (
    <SafeAreaView style={styles.books} key="Books">
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 100, height: 100, marginTop: 0 }}
      />
      <BookSearchBar data={searchData} setBooks={setBooks} />
      <Pressable
        style={{
          width: window.width * 0.2 + 200,
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#c83473",
          marginBottom: 10,
          borderRadius: 20,
        }}
        onPress={() => setVisible(true)}
      >
        <Text variant="labelLarge" style={{ color: "#FFFFFF" }}>
          Adicionar
        </Text>
      </Pressable>
      {visible ? (
        <NewBookView
          bookColor={bookColor}
          name={name}
          setBookColor={setBookColor}
          setBooks={setBooks}
          setName={setName}
          setTextColor={setTextColor}
          setVisible={setVisible}
          textColor={textColor}
          token={token}
        />
      ) : null}
      <FlatList
        data={books}
        renderItem={(item) => (
          <BookPressable
            book={item.item}
            books={books}
            setBooks={setBooks}
            setData={setSearchData}
            token={token}
            window={window}
          />
        )}
      />
    </SafeAreaView>
  );
}
