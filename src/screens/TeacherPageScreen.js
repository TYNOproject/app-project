import React, { Component, useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar, Card, Avatar, Icon } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import TeacherCourseBar from "../components/TeacherCourseBar";
import ReviewBar from "../components/ReviewBar";
import { getTeacherCourses, getTeacherReviews } from "../api/serviceCalls.js";
import ClassContext from "../contexts/ClassContext";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@react-native-material/core";





export default function TeacherPageScreen({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { itemsClass, getValClass } = useContext(ClassContext);

  const name = getValClass(itemsClass, 'teacherName');
  const teacherId = getValClass(itemsClass, 'teacherId');

  const year = getValClass(itemsClass, 'teacherYear');
  const rate = getValClass(itemsClass, 'teacherReat');
  const money = getValClass(itemsClass, 'teacherPrice');


  useEffect(() => {
    console.log(teacherId);
    getTeacherCourses(teacherId).then((CoursesResponse) => {
      console.log(CoursesResponse.data);
      const teacherCourses = CoursesResponse.data.map(item => { return item.courseName });
      console.log(teacherCourses);
      setCourses(teacherCourses);
    }
    ).catch((error) => console.log(error));
    getTeacherReviews(teacherId).then((reviewsResponse) => {
      setReviews(reviewsResponse.data);
    }).catch((error) => console.log(error));
  }, [])



  const avatarImage = require('../../assets/pics/avatarPic.png');


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
        <Avatar
          size={100}
          rounded
          source={avatarImage}
          containerStyle={styles.avatarContainer} />
        <Text style={styles.header}>
          {name} {"\n"}
          {year}
        </Text>
      </View>
      <View style={styles.dropdown}>
        <TeacherCourseBar teacherCourses={courses} style={styles.dropdown}></TeacherCourseBar>
      </View>
      <View style={styles.reatingLocatioin}>
        <Icon
          name="star"
          type="font-awesome"
          color="#FFD700"
          containerStyle={styles.starContainer} />
        <Text style={styles.starRatingText}>{rate}5/5</Text>
      </View>
      <View style={styles.moneyLocatioin}>
        <Text style={styles.moneyText}>{money} ש"ח לשעה</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.bottomHalf}>
        <ReviewBar reviews={reviews} />
      </View>
      <Button
        title={`לקביעת שיעור עם ${name}`}
        titleStyle={{
          fontSize: 18,
          textAlign: "center",
          fontFamily: "Heebo-Bold",
        }} // Add this line to center the title
        leading={() => <AntDesign name="left" size={24} color="white" />}
        style={{
          width: 400,
          height: 60,
          top: -40,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("Schedule")}
      />
    </View>);
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
  starContainer: {
    position: 'relative',
    transform: [{ scale: 2 }],
  },
  starRatingText: {
    position: 'relative',
    fontSize: 22,
    left: "-15%",
    top: "-50%"
  },
  moneyText:{
    position: 'relative',
    fontSize: 22,
  },
  reatingLocatioin: {
    position: 'relative',
    left: "10%",
    top: "35%",
  },
  moneyLocatioin: {
    position: 'relative',
    right: "0%",
    top: "22%",
  },
  avatarContainer: {
    position: 'absolute',
    top: "20%",
    marginLeft: "22%",
    transform: [{ translateX: -25 }],
    zIndex: 1,
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 26,
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
    flexDirection: "row",
    top: 190,
    justifyContent: "space-between",
    alignItems: "center"
  },
  reviewBar: {
    position: "absolute",
    top: 50
  },
  spacer: {
    flex: 1,
  },
  bottomHalf: {
    flex: 1.3,
  },
  ReviewBar: {
    alignSelf: "flex-end",
    flex: 1,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    top: -30
  },

});