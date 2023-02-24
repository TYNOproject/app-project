import React from "react";
import { Button } from "@react-native-material/core";
import { AntDesign } from "@expo/vector-icons";

import { StyleSheet, View, Text } from "react-native";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

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

  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  return (
    <View style={styles.whole}>
      <View style={styles.topPart}>
        <Text style={styles.header}>
          היי נועם, {"\n"}
          נעים להכיר! {"\n"}
        </Text>
        <Text style={styles.subheader}>נשאר לך רק לספר לנו על התואר שלך</Text>
      </View>
      <View style={styles.dropdown}>
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="פקולטה" />
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="מחלקה" />
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="תואר" />
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="שנה" />
        <Button
          leading={() => <AntDesign name="left" size={24} color="white" />}
          title="זהו, סיימנו"
          style={{ position: "relative", top: 10 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  whole: {
    flexDirection: "column",
    alignItems: "center",
  },
  topPart: {
    position: "absolute",
    left: "10%",
    top: 20,
    width: 320,
    direction: "rtl",
    paddingTop: 50,
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  subheader: {
    fontFamily: "Heebo-Regular",
    fontWeight: "normal",
    textAlign: "center",
    fontSize: 20,
  },
  dropdown: {
    position: "relative",
    top: 290,
    height: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
