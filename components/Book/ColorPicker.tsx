import { Dispatch, SetStateAction, useState } from "react";
import { useTheme } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";

type ColorState = {
  value: string;
  list: { _id: string; value: string }[];
  selectedList: any[];
  error: string;
};

type props = {
  colorState: [ColorState, Dispatch<SetStateAction<ColorState>>];
  colorsHex: string[];
  returnColor: Dispatch<SetStateAction<string>>;
};

export default function ColorPicker({
  colorState,
  colorsHex,
  returnColor,
}: props) {
  const [color, setColor] = colorState;

  const theme = useTheme();

  return (
    <PaperSelect
      label="Cor"
      value={color.value}
      onSelection={(selectedColor) => {
        setColor({
          ...color,
          value: selectedColor.text,
          error: "",
        });
        color.list.map((obj, index) => {
          if (obj.value === selectedColor.text) {
            const color: string = colorsHex[index];
            returnColor(color);
          }
        });
      }}
      arrayList={[...color.list]}
      selectedArrayList={[...color.selectedList]}
      multiEnable={false}
      containerStyle={{
        width: "100%",
      }}
      textInputStyle={{
        backgroundColor: theme.colors.background,
        color: "#FFFFFF",
      }}
      dialogStyle={{ backgroundColor: theme.colors.background }}
      searchStyle={{ backgroundColor: theme.colors.backdrop }}
      checkboxProps={{ checkboxLabelStyle: { color: "#FFFFFF" } }}
    />
  );
}
