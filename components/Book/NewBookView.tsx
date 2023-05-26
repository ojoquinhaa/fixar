import { View, Text, ScaledSize, useWindowDimensions } from "react-native";
import { Button, MD3Theme, TextInput, useTheme } from "react-native-paper";
import { getBooksStyleSheet } from "../../styles";
import { Dispatch, SetStateAction } from "react";
import BookAPI, { Book } from "../../API/Book";
import { Color, SwatchesPicker } from "react-color";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import DrawerList from "../Drawer/DrawerList";

type props = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  bookColor: Color;
  setBookColor: Dispatch<SetStateAction<Color>>;
  textColor: Color;
  setTextColor: Dispatch<SetStateAction<Color>>;
  token: string;
  setBooks: Dispatch<SetStateAction<Book[]>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function NewBookView(props: props): JSX.Element | null {
  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();
  const styles = getBooksStyleSheet(window, theme);

  const navigation = useNavigation<NavigationProp<DrawerList>>();
  const route = useRoute<RouteProp<DrawerList>>();

  async function createNewBookHandler() {
    const api = new BookAPI(props.token);
    const book: Book = {
      name: props.name,
      background: props.bookColor.toString(),
      color: props.textColor.toString(),
    };
    const data = await api.create(book);
    if (data.msg) {
      api.getAll().then((data) => {
        props.setBooks(data);
      });
      alert("Livro adicionado com sucesso!");
      props.setName("");
      props.setBookColor("#322f37");
      props.setTextColor("#FFFFFF");
      props.setVisible(false);
      return;
    }

    alert(data.error.msg);
  }

  return (
    <View
      style={{
        backgroundColor: props.bookColor.toString(),
        ...styles.newBook,
      }}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Button
          mode="text"
          onPress={() => props.setVisible(false)}
          icon="close"
        >
          Close
        </Button>
      </View>
      <TextInput
        label="Nome do livro"
        mode="flat"
        style={styles.input}
        value={props.name}
        onChangeText={props.setName}
      />
      <View style={styles.colorSelect}>
        <View style={styles.colorSelect}>
          <Text
            style={{
              fontSize: 16,
              color: props.textColor.toString(),
              marginRight: 20,
            }}
          >
            Cor do livro:{" "}
          </Text>
          <SwatchesPicker
            color={props.bookColor}
            onChangeComplete={(color) => props.setBookColor(color.hex)}
            height={80}
          />
        </View>
        <View style={styles.colorSelect}>
          <Text
            style={{
              fontSize: 16,
              color: props.textColor.toString(),
              marginRight: 20,
              marginLeft: 10,
            }}
          >
            Cor do texto:{" "}
          </Text>
          <SwatchesPicker
            color={props.textColor}
            onChangeComplete={(color) => props.setTextColor(color.hex)}
            height={80}
          />
        </View>
      </View>
      <Button
        mode="contained"
        style={styles.button}
        dark={true}
        onPress={createNewBookHandler}
      >
        Enviar
      </Button>
    </View>
  );
}
