import { View, ScaledSize, useWindowDimensions, Pressable } from "react-native";
import { Button, MD3Theme, TextInput, useTheme } from "react-native-paper";
import { getFantasticStyleSheet } from "../../styles";
import { Dispatch, SetStateAction, useState } from "react";
import { PaperSelect } from "react-native-paper-select";
import FantasticAPI, { Fantastic } from "../../API/Fantastic";
import { Book } from "../../API/Book";

type props = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  token: string;
  book: Book;
  setFantastics: Dispatch<SetStateAction<Fantastic[]>>;
};

export default function NewFantastic({
  setVisible,
  token,
  book,
  setFantastics,
}: props): JSX.Element {
  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();
  const styles = getFantasticStyleSheet(window, theme);

  const [fantastic, setFantastic] = useState<string>("");
  const [util, setUtil] = useState<string>("");
  const [pag, setPag] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [fantasticColor, setFantasticColor] = useState<string>("#FFBF00");

  const [fantasticTypes, setFantasticTypes] = useState({
    value: "Importante",
    list: [
      { _id: "0", value: "Importante" },
      { _id: "1", value: "Muito Importante" },
      { _id: "2", value: "Conceitos" },
      { _id: "3", value: "Aplicação para minha vida" },
    ],
    selectedList: [],
    error: "",
  });

  const fantasticColors = ["#FFBF00", "#DC143C", "#89CFF0", "#D27D2D"];

  async function createFantasticHandler() {
    if (book.id !== undefined) {
      const api = new FantasticAPI(token, book.id);
      const newFantastic: Fantastic = {
        fantastic: fantastic,
        util: util,
        book: book.id,
        color: fantasticColor,
        pag: pag,
        tag: tag,
      };
      const data = await api.create(newFantastic);
      if (data.id) {
        api.getByBook().then((data) => {
          setFantastics(data);
        });
        alert("Fantástico adicionado com sucesso!");
        setFantastic("");
        setPag("");
        setTag("");
        setUtil("");
        setFantasticColor("#FFBF00");
        setVisible(false);
        return;
      }
      if (data.response.data.fantastic) {
        alert("O valor do fantástico está inválido.");
        return;
      }
      if (data.response.data.pag) {
        alert("O valor da página está inválido.");
        return;
      }
      if (data.response.data.util) {
        alert("O valor da utilidade está inválido.");
        return;
      }
      if (data.response.data.tag) {
        alert("O valor da tag está inválido");
        return;
      }
      alert("Falha ao adicionar seu fantástico. Tente novamente mais tarde.");
    }
  }

  return (
    <View style={styles.newDiv}>
      <View
        style={{
          width: "100%",
          maxHeight: 20,
          marginBottom: 20,
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Button mode="text" onPress={() => setVisible(false)} icon="close">
          Close
        </Button>
      </View>
      <TextInput
        label="Fantástico"
        mode="flat"
        value={fantastic}
        onChangeText={setFantastic}
        style={{
          width: "100%",
          marginBottom: 10,
          height: 100,
          backgroundColor: fantasticColor,
        }}
        textColor="#000"
        selectionColor="#000"
        multiline={true}
        outlineColor="#000"
        underlineColor="#000"
        activeUnderlineColor="#000"
        theme={{
          colors: {
            onSurfaceVariant: "black",
          },
        }}
      />
      <PaperSelect
        label="Tipo do fantástico"
        value={fantasticTypes.value}
        onSelection={(selectedFantastic) => {
          setFantasticTypes({
            ...fantasticTypes,
            value: selectedFantastic.text,
            error: "",
          });
          fantasticTypes.list.map((obj, index) => {
            if (obj.value === selectedFantastic.text) {
              const color: string = fantasticColors[index];
              setFantasticColor(color);
            }
          });
        }}
        arrayList={[...fantasticTypes.list]}
        selectedArrayList={[...fantasticTypes.selectedList]}
        multiEnable={false}
        containerStyle={{
          width: "100%",
          marginBottom: 50,
        }}
        textInputStyle={{
          backgroundColor: theme.colors.background,
          color: "#FFFFFF",
        }}
        dialogStyle={{ backgroundColor: theme.colors.background }}
        searchStyle={{ backgroundColor: theme.colors.backdrop }}
        checkboxProps={{ checkboxLabelStyle: { color: "#FFFFFF" } }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          marginBottom: 40,
          maxHeight: 56,
          height: "100%",
        }}
      >
        <TextInput
          label="Página"
          mode="flat"
          value={pag}
          onChangeText={(text) => {
            const formated = text.replace(/[^0-9]/g, "");
            setPag(formated);
          }}
          style={{
            width: "40%",
          }}
        />
        <TextInput
          label="Tag"
          mode="flat"
          value={tag}
          onChangeText={setTag}
          style={{ width: "40%" }}
        />
      </View>
      <TextInput
        label="Utilidade (Faça suas anotações sobre o fantástico aqui)"
        mode="flat"
        value={util}
        onChangeText={setUtil}
        style={{ marginBottom: 20 }}
      />
      <Pressable>
        <Button mode="contained" onPress={createFantasticHandler}>
          Enviar
        </Button>
      </Pressable>
    </View>
  );
}
