import React, { Component, useState } from "react";
import { Button } from "@react-native-material/core";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar, Card } from "react-native-elements";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import TeacherCoursesList from "../components/TeacherCoursesList";
import StudentContext from "../contexts/StudentContext";
import ClassesList from "../components/ClassesList";
import AviableTimesList from "../components/AviableTimesList";



export default function TeacherProfileScreen({ navigation }) {
  const { items } = useContext(StudentContext);
  const { getVal } = useContext(StudentContext);
  const name = getVal(items, "name");
  const lastName = getVal(items, "lastname");

  //need to take from the DB
  const classes = [
    {
      courseName: "קומפליציה",
      name: "עמרי חן",
      date: "01-01-2024, 08:00",
    },
    {
      courseName: "מודלים חישוביים",
      name:"יובל ים",
      date: "01-01-2024 08:00",
    },
    {
      courseName: "לוגיקה",
      name: "נועם שטיין",
      date: "01-01-2024 08:00",
    },
    {
      courseName: "קומפליציה",
      name: "עמרי חן",
      date: "01-01-2024 08:00",
    },
    {
      courseName: "מודלים חישוביים",
      name:"יובל ים",
      date: "01-01-2024 08:00",
    },
    {
      courseName: "לוגיקה",
      name: "נועם שטיין",
      date: "01-01-2024 08:00",
    },
  ];
  const courses = [
    {
      name: "קומפליציה",
    },
    {
      name: "לוגיקה",
    },
    {
      name: "אלגברה 2",
    },
    {
      name: "מודלים חיישובים"
    }
  ];
  const times = [
    {
      time: "01-01-2024\n 08:00-10:00",
    },
    {
      time: "02-01-2024\n 08:00-10:00",
    },
    {
      time: "03-01-2024\n 08:00-10:00"
    },
    {
      time: "04-01-2024\n 08:00-10:00"
    }
  ];
  const price = "120";


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

  const handleLessonsConfermation = () => {
    navigation.navigate("ConfirmLessons");
  };

  const handleEditTeacher = () => {
    navigation.navigate("TeacherRegister");
  };

  return (
    <View style={styles.container}>
        <Text style={styles.header}>
          היי {name}
        </Text>
        <Text style= {styles.feutareLessons}>
        שיעורים קרובים
        </Text>
        <View style={styles.scrollView}>
        <ClassesList classes = {classes} horizantal = {true} style = {"row"} width = {160} />
        </View>
        <Text style= {styles.waitingLessons}>
        שיעורים שמחכים לאישור
        </Text>
        <View style={styles.scrollView}>
        <ClassesList classes = {classes} horizantal = {true} style = {"row"} width = {160}/>
        </View>
        <Button style = {styles.ConfirmLessonsButton}
        leading={() => <AntDesign name="left" size={24} />}
        title="לאישור/דחיית שיעורים"
        variant="outlined"
        color="black"
        onPress={handleLessonsConfermation}/>
        <View style = {styles.row}>
        <Button style = {styles.editButton}
        title="עריכת פרטים אישיים"
        variant="outlined"
        color="black"
        onPress={handleEditTeacher}/>
        <Text style= {styles.teacherCourses}>
        קורסים שאני מלמד
        </Text>
        </View>
        <View style={styles.scrollView}>
        <TeacherCoursesList courses = {courses} />
        </View>
        <Text style= {styles.aviableTimes}>
        הזמנים הפנויים שלי
        </Text>
        <View style={styles.scrollView}>
        <AviableTimesList availableTimes={times}/>
        </View>
        <Text style= {styles.teacherPrice}>
        המחיר שלי לשיעור: {price} ש"ח
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    verticalAlign: "top",
  },
  header: {
    top: 50,
    marginBottom: 50,
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  feutareLessons: {
    fontSize: 20,
    fontFamily: "Heebo-Bold",
    right: 10,
    alignSelf: "flex-end",
    marginBottom: -15
  },
  scrollView: {
    alignSelf: "flex-end",
    width: "100%",
    marginBottom: -15
  },
  waitingLessons: {
    fontSize: 20,
    fontFamily: "Heebo-Bold",
    right: 10,
    alignSelf: "flex-end",
    marginBottom: -15
  },
  ConfirmLessonsButton: {
    position: "relative",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    marginBottom: -15
  },
  editButton: {
    position: "relative",
    alignSelf: "flex-start",
    left: 10,
  },
  teacherCourses: {
    fontSize: 20,
    fontFamily: "Heebo-Bold",
    flex: 1,
    textAlign: "right",
    right: 10,
  },
  aviableTimes: {
      fontSize: 16,
      fontFamily: "Heebo-Bold",
      right: 10,
      alignSelf: "flex-end",
      marginBottom: -15
    },
  teacherPrice: {
    fontSize: 20,
    fontFamily: "Heebo-Bold",
    flex: 1,
    textAlign: "right",
    right: 10
  },
  
});
