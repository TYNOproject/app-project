import React, { Component,useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar,Card } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import { width } from "@mui/system";



export default function homePageScreen({ navigation })
{
  const [search, setSearch] = useState("");
  // const name = navigation.getParam("name");

  const name = "משה";

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

return (<View style={styles.whole}>
          <View style={styles.topPart}>
        <Text style={styles.header}>
          היי {name}, {"\n"}
          מה נלמד הפעם? {"\n"}
        </Text>
      </View>
    <View style={
      styles.searchBar
    }>
    <SearchBar
      placeholder="חיפוש לפי קורס\מורה..."
      lightTheme
      round
      onChangeText={setSearch}
      value={search}
      autoCorrect={false}
    />
      </View>
      <View style={styles.dropdown}>
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="פקולטה" buttonStyle= {styles.dropdownButtonStyle} />
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="מחלקה" buttonStyle= {styles.dropdownButtonStyle} />
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="תואר" buttonStyle= {styles.dropdownButtonStyle} />
      </View>
      </View>);
}
  

const styles = StyleSheet.create({
  whole: {
    flexDirection: "row",
    alignItems: "center"
  },
  searchBar: {
      position: "absolute",
      direction: "rtl",
      top: 200,
      left: 60,
      height: 60,
      width: 300
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    top: 0,
    textAlign: "center",
  },
  topPart: {
    position: "absolute",
    left: "10%",
    top: 0,
    width: 320,
    direction: "rtl",
    paddingTop: 50,
  },
  dropdown: {
    flexDirection:"row",
    position: "relative",
    top: 290,
    left : 60,
    justifyContent: "space-between",
  },
  dropdownButtonStyle: {
    flexDirection:"row",
    justifyContent : "center",
    width:100,
  },
});