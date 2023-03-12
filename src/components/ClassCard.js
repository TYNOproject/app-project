
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

const ClassCard = ({ width, classDetails }) => {
  return (
    <Card containerStyle={{borderRadius: 10, marginBottom: 10, width: width}}>
      <Card.Title style={styles.courseName}>{classDetails.courseName}</Card.Title>
      <Card.Divider />
      <Text style={styles.name}>
        {classDetails.name}
      </Text>
      <Text style={styles.date} numberOfLines={2}>
        {classDetails.date}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    borderColor: "#7521f3", // added purple border color
    borderWidth: 2, // increased border width for visibility
  },
  courseName: {
    fontSize: 12,
    bottom: 5,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row"
  },
  name: {
    fontSize: 10,
    alignSelf: "center"
  },
  date: {
    fontSize: 10,
    alignSelf: "center"
  }
});

export default ClassCard;
