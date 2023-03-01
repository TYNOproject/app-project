import React, { Component,useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar,Card,Avatar } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";



export default function TeacherPageScreen({ navigation })
{
  const [search, setSearch] = useState("");
  // const name = navigation.getParam("username");
  // const year = navigation.getParam("year");

  const name = "משה בן חמו";
  const year = "שנה ד'";

  //need to take from the DB
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


  const avatarImage = require('../../assets/pics/avatarPic.png' );


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
          <Avatar
          size={"large"}
    rounded
    source={avatarImage}
    containerStyle={styles.avatarContainer}
    />
        <Text style={styles.header}>
           {name} {"\n"}
          {year}
        </Text>
      </View>
    <View style={
      styles.searchBar
    }>
      </View>
      <View style={styles.dropdown}>
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="פקולטה" buttonStyle= {styles.dropdownButtonStyle} />
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="מחלקה" buttonStyle= {styles.dropdownButtonStyle} />
        <SelectOption options={["Op1", "Op2", "Op3"]} defaultText="תואר" buttonStyle= {styles.dropdownButtonStyle} />
      </View>
      <View style={styles.spacer} />
        <View style={styles.bottomHalf}>
            <CoursesList courses={courses} />
        </View>
      </View>); 
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems:"center",
    flexDirection: "column",
    flex: 1,
  },
  avatarContainer: {
    position: 'absolute',
    top: 20,
    left:100,
    transform: [{ translateX: -25 }],
    zIndex: 1,
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 20,
    top: 70,
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
    top: 250,
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdownButtonStyle: {
    flexDirection:"row",
    justifyContent : "center",
    width:110,
  },

  spacer: {
    flex: 1,
  },
  bottomHalf: {
    alignSelf: "flex-end",
    width: '100%',
    flex: 2,
  },
});