import { ScaledSize, View, Text } from "react-native";
import FantasticSearchBar from "./FantasticSearchBar";
import { Button, MD3Theme } from "react-native-paper";
import { Dispatch, SetStateAction } from "react";
import { Fantastic } from "../../API/Fantastic";
import { getFantasticStyleSheet } from "../../styles";
type props = {
  window: ScaledSize;
  theme: MD3Theme;
  setFantastics: Dispatch<SetStateAction<Fantastic[]>>;
  add?: boolean;
  setVisible?: Dispatch<SetStateAction<boolean>>;
  data: Fantastic[];
};
export default function FuncView({
  window,
  theme,
  setFantastics,
  setVisible,
  add,
  data,
}: props) {
  const styles = getFantasticStyleSheet(window, theme);
  return (
    <View style={styles.funcDiv}>
      {add ? (
        <Button
          mode="outlined"
          style={styles.newButton}
          onPress={(e) => setVisible!(true)}
        >
          <Text style={{ color: theme.colors.background, fontSize: 20 }}>
            +
          </Text>
        </Button>
      ) : null}
      <FantasticSearchBar setFantastics={setFantastics} data={data} />
    </View>
  );
}
