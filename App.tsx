import {
  Provider,
  MD3DarkTheme,
  adaptNavigationTheme,
} from "react-native-paper";
import { DefaultTheme } from "@react-navigation/native";
import Drawer from "./components/Drawer";
import Login from "./components/Screen/Login";
import { useState } from "react";
import UserAPI from "./API/User";

const { DarkTheme } = adaptNavigationTheme({
  reactNavigationDark: DefaultTheme,
});

export default function App() {
  const [token, setToken] = useState("");
  const [logged, setLogged] = useState(false);

  if (logged) {
    return (
      <Provider theme={MD3DarkTheme} key="App">
        <Drawer
          theme={DarkTheme}
          token={token}
          setToken={setToken}
          setLogged={setLogged}
        />
      </Provider>
    );
  }

  return (
    <Provider theme={MD3DarkTheme} key="App">
      <Login logged={logged} setLogged={setLogged} setToken={setToken} />
    </Provider>
  );
}
