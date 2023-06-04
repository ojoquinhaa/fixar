import { ScaledSize, StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export function getLoginStyleSheet(window: ScaledSize, theme: MD3Theme) {
  const { width } = window;
  return StyleSheet.create({
    login: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: theme.colors.background,
    },
    logo: {
      width: width * 0.1 + 100,
      height: width * 0.1 + 100,
      marginBottom: 20,
    },
    form: {
      width: width * 0.25 + 250,
      height: "auto",
      padding: 30,
    },
    input: {
      marginTop: 20,
    },
  });
}

export function getBooksStyleSheet(window: ScaledSize, theme: MD3Theme) {
  const { width } = window;
  const { colors } = theme;

  return StyleSheet.create({
    books: {
      flex: 1,
      alignItems: "center",
    },
    book: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: width * 0.25 + 250,
      height: "100%",
      maxHeight: 200,
      backgroundColor: colors.primary,
      color: "#ffffff",
      marginTop: 20,
    },
    addBook: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: width * 0.25 + 250,
      height: "100%",
      maxHeight: 150,
      minHeight: 150,
      backgroundColor: colors.primary,
      color: "#ffffff",
      marginTop: 20,
    },
    newBook: {
      width: width * 0.25 + 250,
      height: "100%",
      maxHeight: 300,
      color: "#ffffff",
      marginTop: 20,
      padding: 20,
    },
    input: {
      width: "100%",
    },
    button: {
      backgroundColor: theme.colors.tertiaryContainer,
    },
  });
}

export function getFantasticStyleSheet(window: ScaledSize, theme: MD3Theme) {
  const { width } = window;
  const { colors } = theme;

  return StyleSheet.create({
    fantastic: {
      flex: 1,
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    book: {
      textAlign: "center",
      height: 100,
      width: "100%",
      marginBottom: 20,
    },
    funcDiv: {
      width: width * 0.2 + 200,
      maxHeight: 200,
      marginBottom: 20,
    },
    newButton: {
      backgroundColor: colors.tertiary,
      width: "100%",
      marginBottom: 20,
    },
    newDiv: {
      width: width * 0.25 + 250,
      height: "100%",
      maxHeight: 440,
      color: "#ffffff",
      padding: 20,
      backgroundColor: theme.colors.backdrop,
    },
    data: {
      width: width,
      height: "100%",
      title: {
        book: {
          maxWidth: "25%",
        },
        pags: {
          maxWidth: "10%",
        },
        tags: {
          maxWidth: "20%",
        },
        util: {
          maxWidth: "20%",
        },
      },
    },
  });
}
