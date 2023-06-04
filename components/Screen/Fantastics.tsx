import { RouteProp, useRoute } from "@react-navigation/native";
import { View, Text, useWindowDimensions, ScaledSize } from "react-native";
import DrawerList from "../Drawer/DrawerList";
import { MD3Theme, useTheme, Button } from "react-native-paper";
import { getFantasticStyleSheet } from "../../styles";
import { useEffect, useState } from "react";
import DataTableComponent from "../Fantastic/DataTableComponent";
import NewFantastic from "../Fantastic/NewFantastic";
import FantasticAPI, { Fantastic } from "../../API/Fantastic";
import FantasticSearchBar from "../Fantastic/FantasticSearchBar";

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
        console.log(data);
        setData(data);
        setFantastics(data);
      });
    }
  }, [route.params.book, visible]);

  return (
    <View style={styles.fantastic}>
      <View style={{ backgroundColor: book.background, ...styles.book }}>
        <Text style={{ fontSize: 25, color: book.color, marginTop: 40 }}>
          {book.name}
        </Text>
      </View>
      <View style={{ width: window.width * 0.3 + 100, marginBottom: 20 }}>
        <Button
          mode="outlined"
          style={styles.newButton}
          onPress={() => setVisible!(true)}
        >
          <Text style={{ color: theme.colors.background, fontSize: 20 }}>
            +
          </Text>
        </Button>
        <FantasticSearchBar setFantastics={setFantastics} data={data} />
      </View>
      {visible ? (
        <NewFantastic
          setVisible={setVisible}
          book={book}
          setFantastics={setFantastics}
          token={route.params.token}
        />
      ) : (
        <DataTableComponent
          fantastics={fantastics}
          setData={setData}
          setFantastics={setFantastics}
          token={token}
        />
      )}
    </View>
  );
}
