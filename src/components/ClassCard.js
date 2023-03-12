
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

const ClassCard = ({ width, classDetails }) => {
  return (
    <Card containerStyle={{borderRadius: 10, marginBottom: 10, width: width}}>
      <Card.Title style={styles.courseName}>{classDetails.course.courseName}</Card.Title>
      <Card.Divider />
      <Text style={styles.date} numberOfLines={3}>
        {"תאריך: " + new Date(classDetails.date).toDateString()} {"\n"}
        {"שעת התחלה: " + classDetails.startTime} {"\n"}
        {"שעת סיום: " + classDetails.endTime}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    width: "80%",
    borderColor: "#7521f3", // added purple border color
    borderWidth: 2, // increased border width for visibility
    alignContent: 'center',
  },
  courseName: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: 'Heebo-Bold',
    writingDirection: 'rtl',
  },
  row: {
    flexDirection: "row"
  },
  date: {
    textAlign: 'right',
    writingDirection: 'rtl',
    fontFamily: 'Heebo-Regular',
    fontSize: 12,
    color: 'black',
  }
});

export default ClassCard;
