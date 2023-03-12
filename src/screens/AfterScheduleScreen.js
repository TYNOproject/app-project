import React, { Component, useState,useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem, SearchBar, Card, Icon } from "react-native-elements";
import StudentContext from "../contexts/StudentContext";
import ClassContext from "../contexts/ClassContext";

export default function AfterScheduleScreen({ navigation })
{
  const {items,getVal} = useContext(StudentContext);
  const {itemsClass,getValClass} = useContext(ClassContext);
  
  const name = getVal(items, "studentDetails").name;
  const teacherName = getValClass(itemsClass,'teacherName');
  const date = getValClass(itemsClass,'classDate');
  const fromTime = getValClass(itemsClass,'startTime');
  const toTime = addHourToTime(fromTime);

  function addHourToTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':'); // split the time string into hours, minutes, and seconds
    let hour = parseInt(hours); // convert hours to a number
    let minute = parseInt(minutrubikes); // convert minutes to a number
    let second = parseInt(seconds); // convert seconds to a number
    hour = (hour + 1) % 24; // add an hour and wrap around to the next day if needed
    const newTimeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`; // format the new time as a string
    return newTimeString;
  }
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <Text style={styles.header}>בהצלחה {name}!</Text>
        <View>
          <Text style={styles.subHeaderText}>קבעת שיעור עם {teacherName}</Text>
        </View>
      </View>
      <View style={styles.mainPart}>
        <Text style={styles.mainText}>בתאריך: {date}</Text>
        <Icon name="calendar" type="font-awesome" />
        <Text style={styles.mainText}>משעה: {fromTime}</Text>
        <Icon name="timer" style={{ right: 0 }} />
        <Text style={styles.mainText}>עד שעה: {toTime}</Text>
        <Icon name="timer" style={{ right: 0 }} />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate("HomePage")}>
        <Text style={styles.textstyle}>סגור</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
  },
  topPart: {
    position: "absolute",
    left: "10%",
    top: 0,
    width: 320,
    direction: "rtl",
    paddingTop: 40,
  },
  mainPart: {
    position: "absolute",
    left: 20,
    top: 150,
    width: 320,
    direction: "rtl",
    paddingTop: 50,
    alignItems: "flex-start",
  },
  header: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 30,
    top: 0,
    textAlign: "center",
  },
  subHeaderText: {
    fontFamily: "Heebo-Bold",
    fontWeight: "bold",
    fontSize: 25,
    top: 40,
    textAlign: "center",
  },
  mainText: {
    fontFamily: "Heebo-Bold",
    fontSize: 20,
    top: 20,
    textAlign: "center",
    left: 40,
  },
  iconStyle: {
    position: "abs",
    right: 60,
  },
  submitButton: {
    height: 53,
    width: 326,
    left: 0,
    top: 600,
    borderRadius: 5,
    padding: 16,
    backgroundColor: "#006699",
    justifyContent: "center",
    alignItems: "center",
  },
  textstyle: {
    fontFamily: "Heebo-Bold",
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
