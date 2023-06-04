import { Searchbar } from "react-native-paper";
import { Fantastic } from "../../API/Fantastic";
import { Dispatch, SetStateAction, useState } from "react";
type props = {
  data: Fantastic[];
  setFantastics: Dispatch<SetStateAction<Fantastic[]>>;
};
export default function FantasticSearchBar({ setFantastics, data }: props) {
  const [searchBarText, setSearchBarText] = useState<string>("");
  return (
    <Searchbar
      placeholder="Search"
      value={searchBarText}
      onChangeText={(text) => {
        if (!data) return;
        setFantastics(
          data.filter((f: Fantastic) => f.fantastic?.search(text) !== -1)
        );
        if (text === "") {
          setFantastics(data);
        }
        if (text.startsWith("#")) {
          setFantastics(
            data.filter(
              (f: Fantastic) => f.tag?.search(text.substring(1)) !== -1
            )
          );
        }
        setSearchBarText(text);
      }}
      mode="view"
      style={{ width: "100%" }}
    />
  );
}
