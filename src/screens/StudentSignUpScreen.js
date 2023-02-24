import React from "react";
import { Button } from "@react-native-material/core";
import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function StudentSignUpScreen() {
  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Light": require("../../assets/fonts/Heebo-Light.ttf"),
    "Heebo-Medium": require("../../assets/fonts/Heebo-Medium.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
    "Heebo-SemiBold": require("../../assets/fonts/Heebo-SemiBold.ttf"),
    "Heebo-Thin": require("../../assets/fonts/Heebo-Thin.ttf"),
    "Heebo-Black": require("../../assets/fonts/Heebo-Black.ttf"),
    "Heebo-ExtraBold": require("../../assets/fonts/Heebo-ExtraBold.ttf"),
    "Heebo-ExtraLight": require("../../assets/fonts/Heebo-ExtraLight.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View>
      <Button title="Click Me" onPress={() => alert("StudentSignUpScreen")} />
      <Text style={styles.header}>
        היי נועם, {"\n"}
        נעים להכיר!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    left: 115,
    top: 155,
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
    direction: "rtl",
  },
});
