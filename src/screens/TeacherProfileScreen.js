import React, {Component, useState } from "react";
import { Button } from "@react-native-material/core";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar, Card } from "react-native-elements";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { useContext } from "react";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import LessonsList from "../components/LessonsList";
import TeacherCoursesList from "../components/TeacherCoursesList";
import StudentContext from "../contexts/StudentContext";



export default function TeacherProfileScreen({ navigation }) {
  const { items } = useContext(StudentContext);
  const { getVal } = useContext(StudentContext);
  const name = getVal(items, "name");
  const lastName = getVal(items, "lastname");

  //need to take from the DB
  const lessons = [
    {
      name: "קומפליציה",
      studentName: "עמרי חן",
      date: "1/1/22",
      time: "17:30-19:00"
    },
    {
      name: "מודלים חישוביים",
      studentName:"יובל ים",
      date: "1/1/22",
      time: "17:30-19:00"
    },
    {
      name: "לוגיקה",
      studentName: "נועם שטיין",
      date: "1/1/22",
      time: "17:30-19:00"
    },
    {
      name: "קומפליציה",
      studentName: "עמרי חן",
      date: "1/1/22",
      time: "17:30-19:00"
    },
    {
      name: "מודלים חישוביים",
      studentName:"יובל ים",
      date: "1/1/22",
      time: "17:30-19:00"
    },
    {
      name: "לוגיקה",
      studentName: "נועם שטיין",
      date: "1/1/22",
      time: "17:30-19:00"
    },
  ];
  const courses = [
    {
      name: "קומפליציה"
    },
    {
      name: "לוגיקה"
    },
    {
      name: "אלגברה 2"
    },
    {
      name: "מודלים חיישובים"
    }
  ]
  const price = "120"
  const aviableClasses = [
    {
      name: "",
      date: "1/1/22\n 17:00-19:00"
    },
    {
      name: "",
      date: "1/1/22\n 17:00-19:00"
    },
    {
      name: "",
      date: "1/1/22\n 17:00-19:00"
    },
    {
      name: "",
      date: "1/1/22\n 17:00-19:00"
    }
  ]

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
        <LessonsList lessons = {lessons} />
        </View>
        <Text style= {styles.waitingLessons}>
        שיעורים שמחכים לאישור
        </Text>
        <View style={styles.scrollView}>
        <LessonsList lessons = {lessons} />
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
        <TeacherCoursesList courses = {courses} />
        </View>
        <Text style= {styles.teacherPrice}>
        המחיר שלי לשיעור
        </Text>
        <Card containerStyle={styles.CardContainer}>
          <Text style={styles.price}>{price} ש"ח</Text>
        </Card>
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
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  feutareLessons: {
    fontSize: 16,
    fontFamily: "Heebo-Bold",
    right: 10,
    alignSelf: "flex-end",
    marginBottom: -10
  },
  scrollView: {
    alignSelf: "flex-end",
    width: "100%",
    marginBottom: -10
  },
  waitingLessons: {
    fontSize: 16,
    fontFamily: "Heebo-Bold",
    right: 10,
    alignSelf: "flex-end",
    marginBottom: -10
  },
  ConfirmLessonsButton: {
    position: "relative",
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    marginBottom: -10
  },
  editButton: {
    position: "relative",
    alignSelf: "flex-start",
    left: 10,
    },
  teacherCourses: {
    fontSize: 16,
    fontFamily: "Heebo-Bold",
    flex: 1,
    textAlign: "right",
    right: 10
    },
  aviableTimes: {
      fontSize: 16,
      fontFamily: "Heebo-Bold",
      right: 10,
      alignSelf: "flex-end",
      marginBottom: -10
    },
  teacherPrice: {
    fontSize: 16,
    fontFamily: "Heebo-Bold",
    right: 10,
    alignSelf: "flex-end",
    marginBottom:-5,
    top: -5
  },
  CardContainer: {
    borderRadius: 10,
    width: "30%",
    height: "7%",
    alignSelf: "flex-end",
    marginBottom: 10
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },

  
});
