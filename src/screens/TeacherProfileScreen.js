import React, { Component, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar, Card } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import LessonsList from "../components/LessonsList";

export default function TeacherProfileScreen({ navigation }) {
  const name = navigation.getParam("name");

  //need to take from the DB
  const lessons = [
    {
      name: "קורס קומפליציה",
      studentName: "עמרי חן",
      date: "1/1/22",
      type: "שיעור דיגיטלי",
      time: "17:30-19:00"
    },
    {
      name: "קורס מודלים חישוביים",
      studentName:"יובל ים",
      date: "1/1/22",
      type: "שיעור פרונטלי",
      time: "17:30-19:00"
    },
    {
      name: "קורס לוגיקה",
      studentName: "נועם שטיין",
      date: "1/1/22",
      type: "שיעור דיגיטלי",
      time: "17:30-19:00"
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
        <Text style={styles.header}>
          היי {name}, {"\n"}
        </Text>
        <Text style= {styles.feutareClasses}>
        שיעורים קרובים
        </Text>
      <View style={styles.spacer} />
      <View style={styles.bottomHalf}>
        <LessonsList lessons = {lessons} />
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
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  feutareClasses: {
    flex:1,
    fontSize: 16,
    top: -30,
    fontFamily: "Heebo-Bold",
    right: 10,
    alignSelf: "flex-end"
  },
  searchBar: {
    position: "absolute",
    direction: "rtl",
    top: 150,
    left: 60,
    height: 60,
    width: 300,
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
