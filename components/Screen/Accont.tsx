import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, useWindowDimensions, Platform } from "react-native";
import UserAPI, { User } from "../../API/User";
import { RouteProp, useRoute, useTheme } from "@react-navigation/native";
import { Button, Text, TextInput } from "react-native-paper";
import Book from "../../API/Book";
import * as SecureStory from "expo-secure-store";

type props = {
  setToken: Dispatch<SetStateAction<string>>;
  setLogged: Dispatch<SetStateAction<boolean>>;
};

export default function Accont({ setLogged, setToken }: props) {
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

  const { token } = route.params;

  const theme = useTheme();
  const { width } = useWindowDimensions();

  const [password, setPassword] = useState<string>();
  const [eye, setEye] = useState<string>("eye");
  const [see, setSee] = useState<boolean>(true);
  async function changePassword() {
    const api = new UserAPI("", "", token);
    if (password === undefined) {
      return alert("A senha inserida é inválida.");
    }
    api.changePassword(password).then((res) => {
      if (res.message) {
        setPassword("");
        return alert("Senha modificada com sucesso!");
      }
      alert("A senha inserida é inválida.");
    });
  }

  useEffect(() => {
    const api = new UserAPI("", "", token);
    api.confirmLogin().then(setUser);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ width: width * 0.2 + 200 }}>
        <Text
          variant="displayMedium"
          style={{
            color: theme.colors.primary,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {user?.username}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
          }}
        >
          <TextInput
            mode="flat"
            value={password}
            onChangeText={setPassword}
            label="Nova senha"
            style={{ width: "70%" }}
            secureTextEntry={see}
            right={
              <TextInput.Icon
                icon={eye}
                onPress={() => {
                  setSee(!see);
                  eye === "eye" ? setEye("eye-off") : setEye("eye");
                }}
              />
            }
          />
          <Button
            mode="contained"
            onPress={async () => await changePassword()}
            style={{ width: "30%", borderRadius: 0 }}
          >
            Mudar Senha
          </Button>
        </View>
        <Button
          mode="text"
          style={{ backgroundColor: "#c83473" }}
          onPress={async () => {
            setLogged(false);
            setToken("");
            if (Platform.OS !== "web") {
              await SecureStory.deleteItemAsync("token");
            }
          }}
        >
          Sair
        </Button>
      </View>
    </View>
  );
}
