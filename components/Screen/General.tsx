import { ScaledSize, View, useWindowDimensions } from "react-native";
import { getFantasticStyleSheet } from "../../styles";
import { MD3Theme, useTheme } from "react-native-paper";
import FuncView from "../Fantastic/FuncView";
import { useCallback, useState } from "react";
import FantasticAPI, { Fantastic } from "../../API/Fantastic";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import DrawerList from "../Drawer/DrawerList";
import DataTableComponent from "../Fantastic/DataTableComponent";
import BookAPI, { Book } from "../../API/Book";

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
        bookAPI.getAll().then(setBooks);
      });
    }, [])
  );

  return (
    <View style={styles.fantastic}>
      <FuncView
        setFantastics={setFantastics}
        theme={theme}
        window={window}
        add={false}
        data={data}
      />
      <DataTableComponent fantastics={fantastics} height={700} book={books} />
    </View>
  );
}
