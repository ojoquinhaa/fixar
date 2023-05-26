import { ScaledSize, useWindowDimensions } from "react-native";
import { DataTable, MD3Theme, useTheme } from "react-native-paper";
import { getFantasticStyleSheet } from "../../styles";
import { Book } from "../../API/Book";
import { Fantastic } from "../../API/Fantastic";
import DataTableRow from "./DataTableRow";
import { ScrollView } from "react-native-gesture-handler";
type props = { fantastics: Fantastic[]; height?: number; book?: Book[] };
export default function DataTableComponent({
  fantastics,
  height,
  book,
}: props) {
  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();
  const styles = getFantasticStyleSheet(window, theme);

  return (
    <ScrollView
      style={{ maxHeight: height ?? 400, ...styles.data }}
      horizontal={true}
      contentContainerStyle={{ width: window.width * 2 }}
    >
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          height: "100%",
          maxHeight: 500,
          maxWidth: "100%",
          width: "100%",
        }}
      >
        <DataTable style={{ width: "100%" }}>
          <DataTable.Header style={{ width: "100%" }}>
            {book ? (
              <DataTable.Title
                style={{ width: "100%", ...styles.data.title.book }}
                textStyle={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                Livro
              </DataTable.Title>
            ) : null}
            <DataTable.Title
              style={{
                width: "100%",
                maxWidth: window.width * (0.75 - (book ? 0.25 : 0)),
              }}
              textStyle={{
                display: "flex",
                justifyContent: "center",
                flex: 1,
              }}
            >
              Fantástico
            </DataTable.Title>
            <DataTable.Title
              style={{ width: "100%", ...styles.data.title.pags }}
              textStyle={{
                display: "flex",
                justifyContent: "center",
                flex: 1,
              }}
            >
              Página
            </DataTable.Title>
            <DataTable.Title
              style={{ width: "100%", ...styles.data.title.tags }}
              textStyle={{
                display: "flex",
                justifyContent: "center",
                flex: 1,
              }}
            >
              Tags
            </DataTable.Title>
            <DataTable.Title
              style={{ width: "100%", ...styles.data.title.util }}
              textStyle={{
                display: "flex",
                justifyContent: "center",
                flex: 1,
              }}
            >
              Utilidade
            </DataTable.Title>
          </DataTable.Header>

          {fantastics?.map((fantastic: Fantastic, index: number) => (
            <DataTableRow fantastic={fantastic} key={index} book={book} />
          ))}
        </DataTable>
      </ScrollView>
    </ScrollView>
  );
}
