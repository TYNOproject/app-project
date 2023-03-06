import React from "react";
import {Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Card } from "react-native-elements";

const TeacherCoursesList = ({ courses }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}>
      <View style={styles.column}>
        {courses.map((course) => (
          <Card containerStyle={styles.CardContainer}>
          <Text style={styles.CourseName}>{course.name}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flex: 1,
    // padding: 5,
    flexDirection: "row",
  },
  CardContainer: {
    borderRadius: 10,
    width: "30%",
    height: "80%"
  },
  CourseName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
});

export default TeacherCoursesList;
