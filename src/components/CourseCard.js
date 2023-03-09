import React, { useState, useContext } from "react";
import { Text, View, StyleSheet,TouchableOpacity  } from "react-native";
import { Card } from "react-native-elements";
import StudentContext from "../contexts/StudentContext";
import ClassContext from "../contexts/ClassContext";


const CourseCard = ({course,callback, navigation }) => {
  const { addToClass} = useContext(ClassContext);

  const handlePress = () => {
    alert(course.courseName);
    addToClass("courseName", course.courseName);
    addToClass("courseId", course.id);
    callback();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
    <Card containerStyle={styles.cardContainer}>
      <Card.Title style={styles.name}>{course.courseName}</Card.Title>
      <Card.Divider />
      <Text style={styles.description} numberOfLines={3}>
        {course.year}"שנה:"
        {"\n"}
        {course.departmentId}"מחלקה:"
      </Text>
    </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginBottom: 10,
    height: 200,
    width: 150,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    fontSize: 10,
    flex: 0,
  },
});

export default CourseCard;
