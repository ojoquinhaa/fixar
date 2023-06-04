import { View, Text, ScaledSize, useWindowDimensions } from "react-native";
import { Button, MD3Theme, TextInput, useTheme } from "react-native-paper";
import { getBooksStyleSheet } from "../../styles";
import { Dispatch, SetStateAction, useState } from "react";
import BookAPI, { Book } from "../../API/Book";
import ColorPicker from "./ColorPicker";

type ColorState = {
  value: string;
  list: { _id: string; value: string }[];
  selectedList: any[];
  error: string;
};

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

  const colorTextState = useState<ColorState>({
    value: "Padrão",
    list: [
      { _id: "0", value: "Padrão" },
      { _id: "1", value: "Roxo" },
      { _id: "2", value: "Vermelho" },
      { _id: "3", value: "Azul" },
      { _id: "4", value: "Verde" },
      { _id: "5", value: "Amarelo" },
      { _id: "6", value: "Laranja" },
      { _id: "7", value: "Rosa" },
      { _id: "8", value: "Preto" },
      { _id: "9", value: "Branco" },
      { _id: "10", value: "Cinza" },
      { _id: "11", value: "Marrom" },
      { _id: "12", value: "Bege" },
      { _id: "13", value: "Violeta" },
      { _id: "14", value: "Amarelo-ouro" },
      { _id: "15", value: "Prata" },
      { _id: "16", value: "Dourado" },
      { _id: "17", value: "Turquesa" },
      { _id: "18", value: "Chocolate" },
      { _id: "19", value: "Bordô" },
      { _id: "20", value: "Salmão" },
    ],
    selectedList: [],
    error: "",
  });

  const colorBgState = useState<ColorState>({
    value: "Padrão",
    list: [
      { _id: "0", value: "Padrão" },
      { _id: "1", value: "Roxo" },
      { _id: "2", value: "Vermelho" },
      { _id: "3", value: "Azul" },
      { _id: "4", value: "Verde" },
      { _id: "5", value: "Amarelo" },
      { _id: "6", value: "Laranja" },
      { _id: "7", value: "Rosa" },
      { _id: "8", value: "Preto" },
      { _id: "9", value: "Branco" },
      { _id: "10", value: "Cinza" },
      { _id: "11", value: "Marrom" },
      { _id: "12", value: "Bege" },
      { _id: "13", value: "Violeta" },
      { _id: "14", value: "Amarelo-ouro" },
      { _id: "15", value: "Prata" },
      { _id: "16", value: "Dourado" },
      { _id: "17", value: "Turquesa" },
      { _id: "18", value: "Chocolate" },
      { _id: "19", value: "Bordô" },
      { _id: "20", value: "Salmão" },
    ],
    selectedList: [],
    error: "",
  });

  const colorsBgHEX = [
    "#2F3237",
    "#BF40BF",
    "#FF0000",
    "#0000FF",
    "#008000",
    "#FFFF00",
    "#FFA500",
    "#FFC0CB",
    "#000000",
    "#FFFFFF",
    "#808080",
    "#8B4513",
    "#F5F5DC",
    "#EE82EE",
    "#FFD700",
    "#C0C0C0",
    "#FFD700",
    "#40E0D0",
    "#D2691E",
    "#800000",
    "#FA8072",
  ];

  const colorsTextHEX = [
    "#FFFFFF",
    "#BF40BF",
    "#FF0000",
    "#0000FF",
    "#008000",
    "#FFFF00",
    "#FFA500",
    "#FFC0CB",
    "#000000",
    "#FFFFFF",
    "#808080",
    "#8B4513",
    "#F5F5DC",
    "#EE82EE",
    "#FFD700",
    "#C0C0C0",
    "#FFD700",
    "#40E0D0",
    "#D2691E",
    "#800000",
    "#FA8072",
  ];

  async function createNewBookHandler() {
    const api = new BookAPI(props.token);
    const book: Book = {
      name: props.name,
      background: props.bookColor,
      color: props.textColor,
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
      colorTextState[1]({
        ...colorTextState[0],
        value: "#FFFFFF",
      });
      colorBgState[1]({
        ...colorBgState[0],
        value: "#2F3237",
      });
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
        style={{ marginBottom: 20, ...styles.input }}
        value={props.name}
        onChangeText={props.setName}
      />
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View style={{ width: "49%", marginRight: "1%" }}>
          <Text
            style={{
              fontSize: 16,
              color: props.textColor.toString(),
              textAlign: "left",
            }}
          >
            Cor do livro:{" "}
          </Text>
          <ColorPicker
            colorState={colorBgState}
            colorsHex={colorsBgHEX}
            returnColor={props.setBookColor}
          />
        </View>
        <View style={{ width: "50%" }}>
          <Text
            style={{
              fontSize: 16,
              color: props.textColor.toString(),
              textAlign: "left",
            }}
          >
            Cor do texto:{" "}
          </Text>
          <ColorPicker
            colorState={colorTextState}
            colorsHex={colorsTextHEX}
            returnColor={props.setTextColor}
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
