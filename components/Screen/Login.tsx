import { View, useWindowDimensions, Image, Pressable } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { getLoginStyleSheet } from "../../styles";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserAPI from "../../API/User";
import SecuryStory from "expo-secure-store";
import { Platform } from "react-native";

type props = {
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string>>;
};

export default function Login(props: props): JSX.Element {
  const window = useWindowDimensions();
  const theme = useTheme();
  const styles = getLoginStyleSheet(window, theme);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (Platform.OS !== "web") {
      SecuryStory.getItemAsync("token").then((token) => {
        if (token) {
          props.setToken(token);
          props.setLogged(true);
        }
      });
    }
  });

  async function loginHandler(): Promise<void> {
    if (user === "" || password === "") {
      alert("Credenciáis inválidas.");
      return;
    }

    const api = new UserAPI(user, password);
    const data = await api.login();

    if (data.token) {
      alert("Logado com successo!");
      if (Platform.OS !== "web") {
        await SecuryStory.setItemAsync("token", data.token);
      }
      props.setLogged(true);
      props.setToken(data.token);
      return;
    }

    alert("Credenciáis inválidas.");
  }

  return (
    <View style={styles.login} key="Login">
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <View style={styles.form}>
        <TextInput
          label="Usuário"
          mode="flat"
          style={styles.input}
          onChangeText={(text) => setUser(text)}
          value={user}
        />
        <TextInput
          label="Senha"
          mode="flat"
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Pressable style={styles.input}>
          <Button
            mode="contained"
            style={styles.button}
            dark={true}
            onPress={loginHandler}
          >
            Enviar
          </Button>
        </Pressable>
      </View>
    </View>
  );
}
