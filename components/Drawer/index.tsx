import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, Theme } from "@react-navigation/native";
import DrawerList from "./DrawerList";
import Books from "../Screen/Books";
import General from "../Screen/General";
import { Dispatch, SetStateAction } from "react";
import Accont from "../Screen/Accont";

const DrawerElement = createDrawerNavigator<DrawerList>();

type props = {
  theme: Theme;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  setLogged: Dispatch<SetStateAction<boolean>>;
};

export type params = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  setLogged: Dispatch<SetStateAction<boolean>>;
};

export default function Drawer({ theme, token, setLogged, setToken }: props) {
  return (
    <NavigationContainer theme={theme} key="Index">
      <DrawerElement.Navigator initialRouteName="Books">
        <DrawerElement.Screen
          name="Books"
          component={Books}
          initialParams={{ token }}
        />
        <DrawerElement.Screen
          name="Fantastics"
          component={General}
          initialParams={{ token }}
        />
        <DrawerElement.Screen
          name="Accont"
          component={General}
          initialParams={{ token, setLogged, setToken }}
        />
        <DrawerElement.Screen
          name="Fantastic"
          component={Accont}
          initialParams={{ token }}
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
      </DrawerElement.Navigator>
    </NavigationContainer>
  );
}
