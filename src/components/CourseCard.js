import React, { useState, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import StudentContext from "../contexts/StudentContext";

const CourseCard = ({ course, navigation }) => {
  const { addToStudent } = useContext(StudentContext);

  const handlePress = () => {
    alert(course.courseName);
    addToStudent("courseName", course.courseName);
    addToStudent("courseId", course.id);
    navigation.navigate("CoursePage");
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
