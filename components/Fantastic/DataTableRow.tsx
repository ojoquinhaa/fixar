import { DataTable, MD3Theme, useTheme, Text, Menu } from "react-native-paper";
import FantasticAPI, { Fantastic } from "../../API/Fantastic";
import { Pressable, ScaledSize, View, useWindowDimensions } from "react-native";
import { getFantasticStyleSheet } from "../../styles";
import { Dispatch, SetStateAction, useState } from "react";
import { Book } from "../../API/Book";
type props = {
  fantastic: Fantastic;
  book?: Book[];
  token: string;
  fantastics: Fantastic[];
  setFantastics: Dispatch<SetStateAction<Fantastic[]>>;
  setData: Dispatch<SetStateAction<Fantastic[]>>;
};
export default function DataTableRow({
  fantastic,
  book,
  token,
  fantastics,
  setFantastics,
  setData,
}: props) {
  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();
  const styles = getFantasticStyleSheet(window, theme);

  const [visible, setVisible] = useState<boolean>(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  function getBook() {
    return book?.filter((b) => b.id === fantastic.book)[0];
  }

  function deleteFantastic() {
    const api = new FantasticAPI(token);
    api.delete(fantastic.id!).then((res) => {
      if (res === 204) {
        setFantastics(fantastics.filter((b) => b.id !== fantastic.id));
        setData(fantastics.filter((b) => b.id !== fantastic.id));
        alert("Fantástico deletado com sucesso!");
        return;
      }
      alert("Falha ao deletar seu fantástico.");
    });
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Pressable onPress={openMenu}>
          <DataTable.Row style={{ maxWidth: "100%", width: "100%" }}>
            {book ? (
              <View
                style={{
                  width: "100%",
                  backgroundColor: getBook()?.background,
                  ...styles.data.title.book,
                }}
              >
                <Text
                  numberOfLines={100}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flex: 1,
                    textAlign: "center",
                    alignItems: "center",
                    color: getBook()?.color,
                  }}
                >
                  {getBook()?.name}
                </Text>
              </View>
            ) : null}
            <View
              style={{
                width: "100%",
                backgroundColor: fantastic.color,
                maxWidth: window.width * (0.75 - (book ? 0.25 : 0)),
              }}
            >
              <Text
                numberOfLines={100}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  textAlign: "center",
                  alignItems: "center",
                  color: "#000",
                }}
              >
                {fantastic.fantastic}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                ...styles.data.title.pags,
              }}
            >
              <Text
                numberOfLines={100}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                {fantastic.pag}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                ...styles.data.title.tags,
              }}
            >
              <Text
                numberOfLines={100}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  textAlign: "center",
                  alignItems: "center",
                  color: theme.colors.primary,
                }}
              >
                #{fantastic.tag}
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                ...styles.data.title.util,
              }}
            >
              <Text
                numberOfLines={100}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                {fantastic.util}
              </Text>
            </View>
          </DataTable.Row>
        </Pressable>
      }
    >
      <Menu.Item onPress={deleteFantastic} title="Deletar" />
    </Menu>
  );
}
