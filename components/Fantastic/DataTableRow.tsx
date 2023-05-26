import { DataTable, MD3Theme, useTheme, Text } from "react-native-paper";
import { Fantastic } from "../../API/Fantastic";
import { Book } from "../../API/Book";
import { ScaledSize, View, useWindowDimensions } from "react-native";
import { getFantasticStyleSheet } from "../../styles";
type props = { fantastic: Fantastic; book?: Book[] };
export default function DataTableRow({ fantastic, book }: props) {
  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();
  const styles = getFantasticStyleSheet(window, theme);
  function getBook() {
    return book?.filter((b) => b.id === fantastic.book)[0];
  }
  return (
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
  );
}
