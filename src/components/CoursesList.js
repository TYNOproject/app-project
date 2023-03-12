import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CourseCard from "./CourseCard";

const HalfScreenCourses = ({ courses, navigation, callback }) => {
  const coursesLeft = courses.slice(0, Math.ceil(courses.length / 2));
  const coursesRight = courses.slice(Math.ceil(courses.length / 2));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.column}>
        {coursesLeft.map((course, index) => (
          <CourseCard
            course={course}
            key={index}
            navigation={navigation}
            callback={callback}
          />
        ))}
      </View>
      <View style={styles.column}>
        {coursesRight.map((course, index) => (
          <CourseCard
            course={course}
            key={index}
            navigation={navigation}
            callback={callback}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  column: {
    flex: 1,
    padding: 10,
  },
});

export default HalfScreenCourses;
