import { ScaledSize, View, useWindowDimensions } from "react-native";
import { getFantasticStyleSheet } from "../../styles";
import { MD3Theme, useTheme } from "react-native-paper";
import { useCallback, useState } from "react";
import FantasticAPI, { Fantastic } from "../../API/Fantastic";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import DrawerList from "../Drawer/DrawerList";
import DataTableComponent from "../Fantastic/DataTableComponent";
import BookAPI, { Book } from "../../API/Book";
import FantasticSearchBar from "../Fantastic/FantasticSearchBar";

export default function General() {
  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();
  const styles = getFantasticStyleSheet(window, theme);

  const [fantastics, setFantastics] = useState<Fantastic[]>([]);
  const [data, setData] = useState<Fantastic[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  const route = useRoute<RouteProp<DrawerList>>();

  const { token } = route.params;

  useFocusEffect(
    useCallback(() => {
      const fantasticAPI = new FantasticAPI(token);
      const bookAPI = new BookAPI(token);
      fantasticAPI.getByOwner().then((data) => {
        setData(data);
        setFantastics(data);
        bookAPI.getAll().then((books) => {
          setBooks(books);
        });
      });
    }, [])
  );

  return (
    <View style={styles.fantastic}>
      <FantasticSearchBar setFantastics={setFantastics} data={data} />
      <DataTableComponent
        fantastics={fantastics}
        book={books}
        setData={setData}
        setFantastics={setFantastics}
        token={token}
      />
    </View>
  );
}
