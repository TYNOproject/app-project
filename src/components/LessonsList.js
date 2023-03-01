import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import LessonCard from "./LessonCard";

const LessonsList = ({ lessons }) => {
  const LessonsLeft = lessons.slice(0, Math.ceil(lessons.length / 2));
  const LessonsRight = lessons.slice(Math.ceil(lessons.length / 2));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.column}>
        {LessonsLeft.map((lesson) => (
          <LessonCard lesson={lesson} />
        ))}
      </View>
      <View style={styles.column}>
        {LessonsRight.map((lesson) => (
          <LessonCard lesson={lesson} />
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

export default LessonsList;
