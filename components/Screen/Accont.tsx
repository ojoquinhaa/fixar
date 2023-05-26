import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, useWindowDimensions, Platform } from "react-native";
import UserAPI, { User } from "../../API/User";
import { RouteProp, useRoute, useTheme } from "@react-navigation/native";
import { Button } from "react-native-paper";
import Book from "../../API/Book";
import SecuryStore from "expo-secure-store";

export default function Accont() {
  const [user, setUser] = useState<User>();

  const route = useRoute<
    RouteProp<{
      Accont: {
        token: string;
        book: Book;
        setToken: Dispatch<SetStateAction<string>>;
        setLogged: Dispatch<SetStateAction<boolean>>;
      };
    }>
  >();

  const { token, setLogged, setToken } = route.params;

  const theme = useTheme();
  const { width } = useWindowDimensions();

  useEffect(() => {
    const api = new UserAPI("", "", token);
    api.confirmLogin().then(setUser);
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{ width: width * 0.5 + 200, backgroundColor: theme.colors.card }}
      >
        <Text style={{ color: theme.colors.primary }}>{user?.username}</Text>
        <Button
          mode="text"
          style={{ backgroundColor: theme.colors.notification }}
          onPress={async () => {
            setLogged(false);
            setToken("");
            if (Platform.OS !== "web") {
              await SecuryStore.deleteItemAsync("token");
            }
          }}
        >
          Sair
        </Button>
      </View>
    </View>
  );
}
