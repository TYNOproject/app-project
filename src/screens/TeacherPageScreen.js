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
    getTeacherCourses(teacherId).then((CoursesResponse) => {
      if (CoursesResponse === undefined)
        setCourses([]);
      else{
        const teacherCourses = CoursesResponse.data.map(item => { return item.courseName });
        setCourses(teacherCourses);
      }
    }
    ).catch((error) => console.log(error));
    getTeacherReviews(teacherId).then((reviewsResponse) => {
      reviewsResponse !== undefined ? setReviews(reviewsResponse.data) : setReviews([]);
    }).catch((error) => console.log(error));
  }, [teacherId])



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
        {reviews.length === 0 && (
                    <Text style={{textAlign: 'center', fontFamily: 'Heebo-Regular'}}>אין ביקורות זמינות כרגע</Text>
                )}
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
          width: "90%",
          height: "7%",
          bottom: "10%",
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
    top: "100%",
    textAlign: "center",
  },
  topPart: {
    position: "absolute",
    left: "10%",
    width: "80%",
    direction: "rtl",
    paddingTop: "15%",
  },
  dropdown: {
    flexDirection: "row",
    top: "45%",
    justifyContent: "space-between",
    alignItems: "center"
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

});