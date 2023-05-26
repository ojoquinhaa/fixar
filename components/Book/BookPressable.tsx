import { Pressable, ScaledSize, Text, View } from "react-native";
import BookAPI, { Book } from "../../API/Book";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import DrawerList from "../Drawer/DrawerList";
import { Dispatch, SetStateAction, useState } from "react";
import { Button, Menu } from "react-native-paper";

type props = {
  book: Book;
  window: ScaledSize;
  token: string;
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
  setData: Dispatch<SetStateAction<Book[]>>;
};

export default function BookPressable(props: props) {
  const navigation = useNavigation<NavigationProp<DrawerList>>();
  const route = useRoute<RouteProp<DrawerList>>();

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { token } = route.params;

  function bookHandler() {
    navigation.navigate("Fantastic", {
      book: props.book,
      token: props.token,
    });
  }

  function deleteBook() {
    const api = new BookAPI(token);
    api.delete(props.book.id!).then((res) => {
      if (res.msg) {
        props.setBooks(props.books.filter((b) => b.id !== props.book.id));
        props.setData(props.books.filter((b) => b.id !== props.book.id));
        alert(res.msg);
        return;
      }
      alert("Falha ao deletar seu livro.");
    });
  }

  return (
    <Pressable
      style={{
        flex: 1,
        width: props.window.width * 0.25 + 250,
        height: "100%",
        maxHeight: 150,
        backgroundColor: props.book.background,
        minHeight: 150,
        marginTop: 20,
      }}
      onPress={bookHandler}
    >
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            onPress={openMenu}
            style={{ alignSelf: "flex-end", height: "10%" }}
            icon="menu"
          >
            Menu
          </Button>
        }
      >
        <Menu.Item onPress={deleteBook} title="Deletar" />
      </Menu>
      <View
        style={{
          width: "100%",
          maxHeight: "50%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: props.book.color,
            textAlign: "center",
          }}
        >
          {props.book.name}
        </Text>
      </View>
    </Pressable>
  );
}
