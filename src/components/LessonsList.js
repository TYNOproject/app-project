import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import LessonCard from "./LessonCard";

const LessonsList = ({ lessons }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}>
      <View style={styles.column}>
        {lessons.map((lesson) => (
          <LessonCard lesson={lesson} />
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
});

export default LessonsList;
