import React, { Component, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar, Card } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";

export default function HomePageScreen({ navigation }) {
  const [search, setSearch] = useState("");
  // const name = navigation.getParam("name");
  const name = "משה";
  const courses = [
    {
      name: "Introduction to Computer Science",
      description:
        "This course covers the fundamentals of computer programming and software development. Students will learn programming concepts such as data types, control structures, functions, and object-oriented programming.",
    },
    {
      name: "Calculus I",
      description:
        "This course covers the basics of calculus, including limits, derivatives, and integrals. Topics include differentiation and integration of functions, optimization problems, and applications of calculus to physics and engineering.",
    },
    {
      name: "English Composition",
      description:
        "This course focuses on developing writing skills through critical reading and analysis of texts. Students will learn how to write effective essays, research papers, and other types of academic writing.",
    },
    {
      name: "History of Western Civilization",
      description:
        "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
    },
    {
      name: "History of Western Civilization",
      description:
        "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
    },
    {
      name: "History of Western Civilization",
      description:
        "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
    },
    {
      name: "History of Western Civilization",
      description:
        "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
    },
  ];
  //need to take from the DB
  let [fontsLoaded] = useFonts({
    "Heebo-Bold": require("../../assets/fonts/Heebo-Bold.ttf"),
    "Heebo-Regular": require("../../assets/fonts/Heebo-Regular.ttf"),
  });

  if (!fontsLoaded)
    return (
      <View>
        <Text>loading</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Text style={styles.header}>
          היי {name}, {"\n"}
          מה נלמד הפעם? {"\n"}
        </Text>
      </View>
      <View style={styles.searchBar}>
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
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="פקולטה"
          buttonStyle={styles.dropdownButtonStyle}
        />
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="מחלקה"
          buttonStyle={styles.dropdownButtonStyle}
        />
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="תואר"
          buttonStyle={styles.dropdownButtonStyle}
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.bottomHalf}>
        <CoursesList courses={courses} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
  searchBar: {
    position: "absolute",
    direction: "rtl",
    top: 150,
    left: 60,
    height: 60,
    width: 300,
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
    flexDirection: "row",
    top: 250,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonStyle: {
    flexDirection: "row",
    justifyContent: "center",
    width: 110,
  },

  spacer: {
    flex: 1,
  },
  bottomHalf: {
    alignSelf: "flex-end",
    width: "100%",
    flex: 2,
  },
});
