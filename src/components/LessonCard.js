import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

const LessonCard = ({ lesson }) => {
  return (
    <Card containerStyle={styles.LessonContainer}>
      <Card.Title style={styles.name}>{lesson.name}</Card.Title>
      <Card.Divider />
      <View style = {styles.row}>
      <Text style={styles.date}>
        {lesson.date}
      </Text>
      <Text style={styles.studentName}>
        {lesson.studentName}
      </Text>
      </View>
      <View style = {styles.row}>
      <Text style={styles.time}>
        {lesson.time}
      </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  LessonContainer: {
    borderRadius: 20,
    marginBottom: 1,
    height: 100,
    width: 160,
  },
  name: {
    fontSize: 12,
    bottom: 5,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row"
  },
  studentName: {
    fontSize: 10,
    flex: 1,
    textAlign: "right"
  },
  date: {
    fontSize: 10,
    flex: 1,
    textAlign: "left"
  },
  time: {
    fontSize: 10,
    flex: 1,
    textAlign: "left"
  }
  
});

export default LessonCard;
