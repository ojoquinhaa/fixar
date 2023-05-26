import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, useWindowDimensions, ScaledSize } from "react-native";
import DrawerList from "../Drawer/DrawerList";
import { MD3Theme, useTheme } from "react-native-paper";
import { getFantasticStyleSheet } from "../../styles";
import { useEffect, useState } from "react";
import DataTableComponent from "../Fantastic/DataTableComponent";
import NewFantastic from "../Fantastic/NewFantastic";
import FantasticAPI, { Fantastic } from "../../API/Fantastic";
import FuncView from "../Fantastic/FuncView";
export default function Fantastics() {
  const route = useRoute<RouteProp<DrawerList>>();

  const window: ScaledSize = useWindowDimensions();
  const theme: MD3Theme = useTheme();
  const styles = getFantasticStyleSheet(window, theme);

  const { book, token } = route.params;

  const [visible, setVisible] = useState<boolean>(false);
  const [fantastics, setFantastics] = useState<Fantastic[]>([]);
  const [data, setData] = useState<Fantastic[]>([]);

  useEffect(() => {
    if (book.id !== undefined) {
      const api = new FantasticAPI(token, book.id);
      api.getByBook().then((data) => {
        setData(data);
        setFantastics(data);
      });
    }
  }, [route.params.book, visible]);

  return (
    <View style={styles.fantastic}>
      <View style={{ backgroundColor: book.background, ...styles.book }}>
        <Text style={{ fontSize: 25, color: book.color }}>{book.name}</Text>
      </View>
      <FuncView
        setFantastics={setFantastics}
        theme={theme}
        window={window}
        add={true}
        setVisible={setVisible}
        data={data}
      />
      {visible ? (
        <NewFantastic
          setVisible={setVisible}
          book={book}
          setFantastics={setFantastics}
          token={route.params.token}
        />
      ) : (
        <DataTableComponent fantastics={fantastics} />
      )}
    </View>
  );
}
