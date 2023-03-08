import React, { Component,useState ,useContext} from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar, Card } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import TeacherCard from "../components/TeacherCard";
import TeachersList from "../components/TeachersList";
import StudentContext from "../contexts/StudentContext";

export default function CoursePageScreen({ navigation }) {
  const [search, setSearch] = useState("");
  // const course = navigation.getParam("course");

  const {items} = useContext(StudentContext);
  const {getVal} = useContext(StudentContext)
  const course = getVal(items,'courseName');

  const teachers = [
    {
      name: "אבי",
      year: "שנה ד'",
      rate: "4",
      description:
        "This course covers the fundamentals of computer programming and software development. Students will learn programming concepts such as data types, control structures, functions, and object-oriented programming.",
    },
    {
      name: "יוסי",
      year: "שנה ד'",
      rate: "4.5",
      description:
        "This course covers the basics of calculus, including limits, derivatives, and integrals. Topics include differentiation and integration of functions, optimization problems, and applications of calculus to physics and engineering.",
    },
    {
      name: "מוטי",
      year: "שנה ד'",
      rate: "4",
      description:
        "This course focuses on developing writing skills through critical reading and analysis of texts. Students will learn how to write effective essays, research papers, and other types of academic writing.",
    },
    {
      name: "מנש",
      year: "שנה ד'",
      rate: "3",
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
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Text style={styles.header}>מורים בקורס {course}</Text>
      </View>
      <View style={styles.dropdown}>
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="מיון"
          buttonStyle={styles.dropdownButtonStyle}
        />
        <SelectOption
          options={["Op1", "Op2", "Op3"]}
          defaultText="סינון"
          buttonStyle={styles.dropdownButtonStyle}
        />
      </View>
      <View style={styles.spacer} />
        <View style={styles.bottomHalf}>
            <TeachersList teachers={teachers} navigation={navigation} />
        </View>
      </View>); 
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
    top: 120,
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
    flex: 4,
  },
});
