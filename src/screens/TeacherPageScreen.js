import React, { Component,useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { ListItem, SearchBar,Card,Avatar,Icon, Button } from "react-native-elements";
import { useFonts } from "expo-font";
import SelectOption from "../components/SelectOption";
import CoursesList from "../components/CoursesList";
import TeacherCourseBar from "../components/TeacherCourseBar";
import ReviewBar from "../components/ReviewBar";
import { Chip } from '@rneui/themed';





export default function TeacherPageScreen({ navigation })
{
  const [search, setSearch] = useState("");
  // const name = navigation.getParam("username");
  // const year = navigation.getParam("year");
  // const rate = navigation.getParam("rate");
  // const money = navigation.getParam("money");


  const name = "משה בן חמו";
  const year = "שנה ד'";
  const rate = "4";
  const money = "120";

  //need to take from the DB
  const courses = [
    {
      name: "קומפילציה",
      description:
        "This course covers the fundamentals of computer programming and software development. Students will learn programming concepts such as data types, control structures, functions, and object-oriented programming.",
    },
    {
      name: "מבנה נתונים",
      description:
        "This course covers the basics of calculus, including limits, derivatives, and integrals. Topics include differentiation and integration of functions, optimization problems, and applications of calculus to physics and engineering.",
    },
    {
      name: "תולדות היופי",
      description:
        "This course focuses on developing writing skills through critical reading and analysis of texts. Students will learn how to write effective essays, research papers, and other types of academic writing.",
    },
  ];

  const reviews = [
    {
      reat: "2",
      name: "ישראל ישראלי",
      description:
    "מורה בןזונה"},
    {
      reat: "4",
      name: "אני נוסבאום",
      description:
        " מורה נהדר לקורס נהדר!",
    },
    {
      reat: "4",
      name: "מנש אליהו",
      description:
        "יותם מרצה מעולה הגעתי לשיעור הראשון איתו לחוצה מאד מהחומר ויותם הרגיע אותי הוא מעביר את החומר בצורה נעימה וברורה....",
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
    containerStyle={styles.avatarContainer}/>
        <Text style={styles.header}>
           {name} {"\n"}
          {year}
        </Text>
      </View>
      <View style={styles.dropdown}>
        <TeacherCourseBar teacherCourses = {courses} style={styles.dropdown}></TeacherCourseBar>
      </View>
      <View style={styles.reatingLocatioin}>
      <Icon
              name="star"
              type="font-awesome"
              color="#FFD700"
              containerStyle={styles.starContainer}/>
      <Text style={styles.starRatingText}>{rate}/5</Text>
      </View>
      <View style={styles.moneyLocatioin}>
      <Text style={styles.starRatingText}>{money} ש"ח לשעה</Text>
      </View>
      <View style={styles.spacer} />
        <View style={styles.bottomHalf}>
            <ReviewBar reviews={reviews} />
        </View>
        <Button title= {<Text style={styles.starRatingText}> לקביעת שיעור עם {name}</Text>} onPress={() => alert("move to nexxt page")} style = {styles.button}/>
      </View>); 
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems:"center",
    flexDirection: "column",
    flex: 1,
  },
  starContainer: {
    position: 'relative',
    },
    starRatingText: {
      position: 'relative',
      fontSize: 16,
    },
    reatingLocatioin: {
      position: 'relative',
      left:150,
      top:250,
    },
    moneyLocatioin: {
      position: 'relative',
      left:-100,
      top:220,
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
    top: 200,
    justifyContent: "space-between",
    alignItems: "center"
  },
  reviewBar: {
    position: "absolute",
    top:100
  },
  spacer: {
    flex: 1,
  },
  bottomHalf: {
    flex: 1.5,
  },
  ReviewBar: {
    alignSelf: "flex-end",
    flex: 2.5,
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
  },
  
});