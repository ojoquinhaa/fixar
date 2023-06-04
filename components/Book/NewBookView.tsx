import { View, Text, ScaledSize, useWindowDimensions } from "react-native";
import { Button, MD3Theme, TextInput, useTheme } from "react-native-paper";
import { getBooksStyleSheet } from "../../styles";
import { Dispatch, SetStateAction } from "react";
import BookAPI, { Book } from "../../API/Book";

type props = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  bookColor: string;
  setBookColor: Dispatch<SetStateAction<string>>;
  textColor: string;
  setTextColor: Dispatch<SetStateAction<string>>;
  token: string;
  setBooks: Dispatch<SetStateAction<Book[]>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function NewBookView(props: props): JSX.Element | null {
  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();
  const styles = getBooksStyleSheet(window, theme);

  async function createNewBookHandler() {
    const api = new BookAPI(props.token);
    const book: Book = {
      name: props.name,
      background: props.bookColor.toString(),
      color: props.textColor.toString(),
    };
    const data = await api.create(book);
    if (data.id) {
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
    if (data.response.data["name"]) {
      alert("O nome do livro está inválido.");
      return;
    }
    alert("Falha ao criar o seu livro.");
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
