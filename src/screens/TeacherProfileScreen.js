import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import CourseCard from "../components/CourseCard";
import { height, style } from "@mui/system";
import CoursesList from "../components/CoursesList";

const courses = [
  {
    name: "Introduction to Computer Science",
    description:
      "This course covers the fundamentals of computer programming and software development. Students will learn programming concepts such as data types, control structures, functions, and object-oriented programming.",
  },
  {
    name: "Calculus I",
    description:
      "This course covers the basics of calculus, including limits, derivatives, and integrals. Topics include differentiation and integration of functions, optimization problems, and applications of calculus to physics and engineering.",
  },
  {
    name: "English Composition",
    description:
      "This course focuses on developing writing skills through critical reading and analysis of texts. Students will learn how to write effective essays, research papers, and other types of academic writing.",
  },
  {
    name: "History of Western Civilization",
    description:
      "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
  },
  {
    name: "History of Western Civilization",
    description:
      "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
  },
  {
    name: "History of Western Civilization",
    description:
      "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
  },
  {
    name: "History of Western Civilization",
    description:
      "This course covers the major events and ideas of Western civilization from ancient Greece to the present. Topics include the rise of democracy, the Renaissance, the Enlightenment, and the World Wars.",
  },
];

const TeacherProfileScreen = () => (
  <View style={styles.container}>
    <View style={styles.spacer} />
    <View style={styles.bottomHalf}>
      <CoursesList courses={courses} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  spacer: {
    flex: 1,
  },
  bottomHalf: {
    flex: 2,
  },
});

export default TeacherProfileScreen;